import ServerError from "./ServerError";

export default class CompareError<
  T extends Record<string, string | number | boolean>
> extends ServerError<T> {
  constructor(message: string = "Password comparison failed", details?: T) {
    super(message, 400, details);
  }
}
