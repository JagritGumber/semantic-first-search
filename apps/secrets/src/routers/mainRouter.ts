import { Hono } from "hono";
import passwordRouter from "./passwordRouter";

const secretsRouter = new Hono<{ Bindings: CloudflareBindings }>().route(
  "/password",
  passwordRouter
);

export type SecretsRouter = typeof secretsRouter;
export default secretsRouter;
