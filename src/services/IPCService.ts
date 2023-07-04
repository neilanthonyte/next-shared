import { inject, injectable } from "inversify";
import { RedisClient } from "redis";

import { IRedisService } from "./RedisService";
import { EventEmitter } from "../util/EventEmitter";
import { ExternalEventEmitter } from "../util/ExternalEventEmitter";

const broadcastChannelName = "ipc_broadcast";

export interface IIPCService {
  broadcast: EventEmitter;
  init(): Promise<void>;
}

@injectable()
export class IPCService implements IIPCService {
  public broadcast: EventEmitter;

  private hasInited: boolean = false;
  private pubConnection: RedisClient;
  private subConnection: RedisClient;

  constructor(@inject("RedisService") private _redisService: IRedisService) {}

  public async init(): Promise<void> {
    if (this.hasInited) {
      throw new Error("Already init'ed");
    }
    this.hasInited = true;

    this.pubConnection = this._redisService.redisClient;
    this.subConnection = this._redisService.redisClient.duplicate();

    this.subConnection.on("message", (channel, redisMessage) => {
      if (channel !== broadcastChannelName) {
        return;
      }

      // handle message from redis
      const message = JSON.parse(redisMessage);

      (this.broadcast as ExternalEventEmitter).emitToOwnListeners(
        message.eventName,
        ...message.args,
      );
    });

    this.broadcast = new ExternalEventEmitter(
      (eventName: string, ...args: any[]) => {
        // client is emitting event to all processes, send via redis
        const redisMessage = JSON.stringify({ eventName, args });
        this.pubConnection.publish(broadcastChannelName, redisMessage);
      },
    );

    // setInterval(() => {
    //     const numWatchers = this.broadcast.numListeners();
    //     console.log('Watchers: ', numWatchers);
    // }, 1000);

    return new Promise<void>((resolve) =>
      this.subConnection.subscribe(broadcastChannelName, () => resolve()),
    );
  }
}
