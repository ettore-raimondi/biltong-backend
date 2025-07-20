export class InvalidPasswordError extends Error {
  constructor(message = "Password is wrong") {
    super(message);
    this.name = "InvalidPasswordError";

    // Set the prototype explicitly, needed for custom errors when targeting ES5 or below
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
