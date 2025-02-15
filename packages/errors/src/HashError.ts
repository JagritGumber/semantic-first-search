import ServerError from "./ServerError";

export default class HashError<
  T extends Record<string, string | number | boolean>
> extends ServerError<T> {
  /**
   * Creates a new HashError instance.
   *
   * @param {string} [message="Password hashing failed"] The error message.
   * @param {T} [details] Additional error details.
   */
  constructor(message: string = "Password hashing failed", details?: T) {
    super(message, 500, details);
  }
}
