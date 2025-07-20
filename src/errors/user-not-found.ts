export class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.name = "UserNotFoundError";

    // Set the prototype explicitly, needed for custom errors when targeting ES5 or below
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
