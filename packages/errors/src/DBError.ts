import ServerError from "./ServerError";

export default class DBError<
  T extends Record<string, string | number | boolean>
> extends ServerError<T> {
  constructor(message: string = "DB Query Failed", details?: T) {
    super(message, 400, details);
  }
}
