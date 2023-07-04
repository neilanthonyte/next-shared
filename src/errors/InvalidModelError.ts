export class InvalidModelError extends Error {
  constructor(m?: string) {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidModelError.prototype);
  }
}
