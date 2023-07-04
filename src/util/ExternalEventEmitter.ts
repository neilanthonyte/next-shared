import { EventEmitter } from "./EventEmitter";

// identical to EventEmitter, however .emit will not call .on listeners -
// .emit will send to an external service and .on will be called from an external service

export class ExternalEventEmitter extends EventEmitter {
  public emitToOwnListeners: (eventName: string, ...args: any[]) => void;

  constructor(onEmit: (eventName: string, ...args: any[]) => void) {
    super();

    this.emit = onEmit.bind(null);
    this.emitToOwnListeners = super.emit;
  }
}
