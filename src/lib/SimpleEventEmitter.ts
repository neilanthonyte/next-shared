import { injectable } from "inversify";
import "reflect-metadata";

export type eventHandler = (...args: any[]) => void;

// small super class for event emitters
@injectable()
export class SimpleEventEmitter {
  private listeners: { [key: string]: eventHandler[] } = {};

  constructor() {
    this.listeners = {};
  }

  public on(eventName: string, handler: eventHandler) {
    if (typeof this.listeners[eventName] === "undefined") {
      this.listeners[eventName] = [];
    }
    // don't add if this event + handler is already registered
    if (this.listeners[eventName].indexOf(handler) !== -1) {
      console.warn("handler already registered");
      return;
    }
    this.listeners[eventName].push(handler);
  }

  public off(eventName: string, handler: eventHandler) {
    if (typeof this.listeners[eventName] !== "undefined") {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (x) => x !== handler,
      );
    }
  }

  public emit(eventName: string, ...args: any[]) {
    if (typeof this.listeners[eventName] !== "undefined") {
      this.listeners[eventName].forEach((handler) => handler(...args));
    }
  }

  // for testing purposes
  public numListeners(eventName?: string) {
    if (eventName !== undefined) {
      const listenersArr = this.listeners[eventName] || [];
      return listenersArr.length;
    }

    const numListeners = Object.keys(this.listeners).reduce((acc, val) => {
      return acc + this.listeners[val].length;
    }, 0);

    return numListeners;
  }
}
