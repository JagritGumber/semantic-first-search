export default class ServerError<
  T extends Record<string, string | number | boolean>
> extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: T
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
