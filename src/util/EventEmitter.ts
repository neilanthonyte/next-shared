export type eventHandler = (...args: any[]) => void;

// small super class for event emitters
export class EventEmitter {
  private listeners: { [key: string]: eventHandler[] } = {};

  constructor() {
    this.listeners = {};
  }

  public on(eventName: string, handler: eventHandler) {
    if (typeof this.listeners[eventName] === "undefined") {
      this.listeners[eventName] = [];
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
      this.listeners[eventName].forEach((handler) => {
        // note: could make this faster
        // ensure this listener is still registered
        // listeners are allowed to .off() during previous event handlers
        if (this.listeners[eventName].some((x) => x === handler)) {
          // eslint-disable-next-line prefer-spread
          handler.apply(null, args);
        }
      });
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
