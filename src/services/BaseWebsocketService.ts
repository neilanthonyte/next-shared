import { Server } from "http";
import socketIo from "socket.io";
import { Container, injectable } from "inversify";

import { Session } from "../models/Session";
import { IIPCService } from "./IPCService";

/**
 * web socket service interface
 */
export interface IBaseWebsocketService {
  io: socketIo.Server;
  init(httpServer: Server, container: Container): void;
  emitEvent(eventScope: string, event: string, data?: any): void;
}

const ipcWebsocketServiceEvent = "WebsocketServiceEvent";

@injectable()
export abstract class BaseWebsocketService implements IBaseWebsocketService {
  // override these in sub class
  protected ConnectedWebsocketClientCls: new (
    socket: socketIo.Socket,
    container: Container,
  ) => BaseConnectedWebsocketClient;

  public io: socketIo.Server;
  protected connectedClients: BaseConnectedWebsocketClient[] = [];

  // HACK why isn't this a protected constructor? Because for it to work with inversify (6.0.1), it needs to be "injectable",
  // even though it's a base class and shouldn't be instantiated. And if it needs to be injectable, then the constructor
  // needs to be "newable"... So they've made it that protected constructor for injectable will have a type error
  public constructor(protected _ipcService: IIPCService) {}

  public init(httpServer: Server, container: Container): void {
    // create socket server
    this.io = socketIo(httpServer);

    // handle new connections
    this.io.on("connection", (socket) =>
      this._handleNewConnection(socket, container),
    );

    this._ipcService.broadcast.on(
      ipcWebsocketServiceEvent,
      (eventScope: string, event: string, data?: any) =>
        this.emitEventToLocallyConnectedClients(eventScope, event, data),
    );
  }

  protected _handleNewConnection(
    socket: socketIo.Socket,
    container: Container,
  ): void {
    // create a new connected web socket client
    const connectedClient = new this.ConnectedWebsocketClientCls(
      socket,
      container,
    );

    // add to the list
    this.connectedClients.push(connectedClient);

    // remove connected client on disconnect
    socket.on("disconnect", () => {
      // remove client
      this.connectedClients = this.connectedClients.filter(
        (x) => x !== connectedClient,
      );
    });
  }

  public emitEventToLocallyConnectedClients(
    eventScope: string,
    event: string,
    data?: any,
  ): void {
    this.connectedClients
      .filter((client) => client.isSubscribedToEventScope(eventScope))
      .forEach((client) => client.emitEvent(eventScope, event, data));
  }

  public emitEvent(eventScope: string, event: string, data?: any): void {
    this._ipcService.broadcast.emit(
      ipcWebsocketServiceEvent,
      eventScope,
      event,
      data,
    );
  }
}

/**
 * connect web socket client class
 */
export abstract class BaseConnectedWebsocketClient {
  // client socket
  private socket: socketIo.Socket;
  // container
  public container: Container;
  // event scopes to listen to
  public eventScopes: Set<string> = new Set<string>();

  /**
   * constructor
   *
   * @param {SocketIO.Socket} socket
   * @param {Container} container
   */
  protected constructor(socket: socketIo.Socket, container: Container) {
    // set socket
    this.socket = socket;
    // set container
    this.container = container;
    // register socket events
    this._registerSocketEvents();
  }

  /**
   * register socket events
   */
  private _registerSocketEvents() {
    // subscribe to valid event scopes
    this.socket.on(
      "subscribe",
      (
        sessionId: string,
        newEventScopes: string[],
        cb?: (success: boolean) => void,
      ) => {
        (async () => {
          // get associated session
          const requestedSession = await this.retrieveSession(sessionId);

          // make sure new event scopes can be subscribed to
          const validEventScopes = [];
          for (let i = newEventScopes.length - 1; i >= 0; i--) {
            if (
              await this.canSubscribeToEventScope(
                requestedSession,
                newEventScopes[i],
              )
            ) {
              validEventScopes.push(newEventScopes[i]);
            }
          }

          // set the valid event scopes
          this.eventScopes = new Set(validEventScopes);

          // return
          return true;
        })()
          .then((success) => {
            if (cb) {
              cb(success);
            }
          })
          .catch((e) => {
            // error
            if (cb) {
              cb(false);
            }
            console.error(e);
          });
      },
    );

    // unset event scopes to listen to
    this.socket.on("unsubscribe", () => {
      this.eventScopes = new Set([]);
    });
  }

  protected async retrieveSession(sessionId: string): Promise<Session | null> {
    // not implemented here, override in sub class
    console.warn("BaseWebsocketService retrieveSession unimplemented");
    return null;
  }

  /**
   * check whether an event scope has been subscribed to
   *
   * @param {string} scope
   * @returns {boolean}
   */
  public isSubscribedToEventScope(scope: string): boolean {
    return this.eventScopes.has(scope);
  }

  /**
   * emit an event to an event scope with the given data
   *
   * @param {string} eventScope
   * @param {string} event
   * @param data
   */
  public emitEvent(eventScope: string, event: string, data?: any): void {
    this.socket.emit(`${eventScope}|${event}`, data);
  }

  /**
   * check whether event scope can be subscribed to
   * this is to be overridden with your own event scopes
   *
   * @param {Session} session
   * @param {string} eventScope
   * @returns {Promise<boolean>}
   */
  protected async canSubscribeToEventScope(
    session: Session,
    eventScope: string,
  ): Promise<boolean> {
    return true;
  }
}
