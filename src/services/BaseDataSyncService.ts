import { injectable } from "inversify";
import SocketIO from "socket.io";

import { ISyncMetadata } from "../types/ISyncMetadata";
import { serializeProp } from "../util/serializeProp";
import { ILoggingService } from "./LoggingService";
import { SocketPermissionDenied } from "../helpers/errorTypes";
import { IBaseWebsocketService } from "./BaseWebsocketService";
import { callSyncAction } from "../util/dataSync";
import { Session } from "../models/Session";
import { ILogger } from "./Logger";
import { ActiveSyncEndpointRecord } from "../models/ActiveSyncEndpointRecord";

export interface IBaseDataSyncService {
  init(): void;
}

export interface ISyncConnectErrorInfo {
  /** Type of error it is */
  type: string;
  message: string;
  /** The connection GUID if applicable */
  guid?: string;
}

@injectable()
export class BaseDataSyncService implements IBaseDataSyncService {
  private io: SocketIO.Namespace;

  public constructor(
    protected _websocketService: IBaseWebsocketService,
    protected _loggingService: ILoggingService,
    protected _logger?: ILogger | null,
  ) {}

  public init() {
    // get namespace
    this.io = this._websocketService.io.of("/data-sync");

    this.io.on("connection", (socket) => this.handleNewConnection(socket));
  }

  protected handleNewConnection(socket: SocketIO.Socket): void {
    let isConnected = true;
    let sessionId: null | string = null;

    const activeEndpoints = new ActiveSyncEndpointRecord();

    // functions
    const connect = (guid: string, syncMetadata: ISyncMetadata) => {
      // create an instance of the endpoint

      // call the function with this name

      // pass in onData function
      // returns onDisconnect function
      // store onDisconnect function

      // check if anything is already connected with this guid
      if (activeEndpoints.has(guid)) {
        this._logger?.warn(
          "connect called with a guid that was already in use",
          {
            class: BaseDataSyncService.name,
            function: "connect",
            guid,
          },
        );
        return;
      }

      const onData = (data: any) => {
        // make sure we haven't disconnected (endpoints should stop sending events after this)
        if (!isConnected || !activeEndpoints.has(guid)) {
          // this happens if the server takes a while to fulfil and request and during that time the
          // client no longer needs the socket (e.g. switching the patient). If this happens a lot
          // we should chase why the server took so long and/or the client closed the socket so quickly

          // temporarily disabling this to reduce load on the server.
          // this._logger.warn("onData called after client had disconnected", {
          //   class: BaseDataSyncService.name,
          //   function: "onData",
          //   guid,
          //   data,
          // });
          return;
        }

        // send data to client
        socket.emit("sync_data", guid, prepareDataForSending(data));
      };

      // store even before we have finished the connection
      // this is because the endpoint may immediately try and send data on first call, we want to allow this
      let hasImmediatelyUnsubscribed = false;
      activeEndpoints.add({
        guid,
        syncMetadata,
        unsubFunc: () => (hasImmediatelyUnsubscribed = true),
      });

      (async () => {
        // ensure routing rules are given the latest copy of the session
        const currentSession = sessionId
          ? await this.retrieveSession(sessionId)
          : null;

        callSyncAction(
          syncMetadata.endpoint,
          syncMetadata.action,
          onData,
          syncMetadata.parameters,
          currentSession,
        )
          .then((unsubFunc) => {
            if (hasImmediatelyUnsubscribed) {
              return;
            }

            activeEndpoints.add({ guid, syncMetadata, unsubFunc });
          })
          .catch((e) => {
            const errorMessage =
              e?.message ?? "callSyncAction generic exception";
            // log socket error to sentry
            this._loggingService.logError(e);

            // failed to connect
            // TODO - review and perhaps create new type of error to distinguish between actual permission denied or the session is just not ready.
            if (e instanceof SocketPermissionDenied) {
              // don't delete from activeEndpoints if we have a permission error
              // the session can change in the future and this error may go away
              this._logger.log("sync_connect_error - SocketPermissionDenied", {
                class: "BaseDataSyncService",
                function: "callSyncAction",
                message: errorMessage,
                guid,
                syncMetadata,
              });
              socket.emit("sync_connect_error", {
                type: "SocketPermissionDeniedError", // TODO - extend the error class to contain more information
                message: errorMessage,
                guid,
              } as ISyncConnectErrorInfo);
              return;
            }

            // generic sync error we haven't yet handled, log it
            this._logger.error(errorMessage, e);

            socket.emit("sync_connect_error", {
              type: "GenericError",
              message: "Internal server error",
              guid,
            } as ISyncConnectErrorInfo);
            activeEndpoints.delete(guid);
          });
      })();
    };

    socket.on("sync_authenticate", (newSessionId: string, cb: () => void) => {
      (async () => {
        // HACK we do this first to reduce the chance the auth takes longer than the first subscription
        sessionId = newSessionId;
        const newSession = await this.retrieveSession(newSessionId);
        socket.emit("sync_authenticate", newSession);

        // reconnect all active endpoints so they now have the newest session
        const toReconnect = activeEndpoints.clear();

        // reconnect all
        toReconnect.forEach((endpoint) =>
          connect(endpoint.guid, endpoint.syncMetadata),
        );

        if (typeof cb === "function") {
          cb();
        }
      })().catch((reason) => {
        this._logger.error("sync_authenticate error", {
          class: BaseDataSyncService.name,
          socketEvent: "sync_authenticate",
          reason,
        });
      });
    });

    socket.on("sync_connect", connect);

    socket.on("sync_disconnect", (guid: string) => {
      // call the disconnect function on endpoint with this guid
      const existed = activeEndpoints.delete(guid);

      if (!existed) {
        this._logger.error("Disconnect called an unknown endpoint", {
          class: "BaseDataSyncService",
          socketEvent: "sync_disconnect",
          guid,
        });
        return;
      }

      this._logger?.log("Sync disconnected", {
        deletedGuid: guid,
        sessionId,
        activeEndpointsSize: activeEndpoints.size,
      });
    });

    socket.on("disconnect", () => {
      // disconnect all endpoints in activeEndpoints
      activeEndpoints.clear();
      isConnected = false;
    });
  }

  protected async retrieveSession(sessionId: string): Promise<Session | null> {
    // not implemented here, override in sub class
    return null;
  }
}

function prepareDataForSending(data: any): any {
  // return strings as they are
  if (typeof data === "string") {
    return data;
  }

  // serialise any un-nested returned models
  data = serializeProp(data);

  // serialise any nested returned models
  Object.keys(data).forEach((key) => {
    data[key] = serializeProp(data[key]);
  });

  return data;
}
