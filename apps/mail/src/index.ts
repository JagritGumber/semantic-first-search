import { Hono } from "hono";

const mailer = new Hono<{ Bindings: CloudflareBindings }>().get("/", (c) => {
  return c.text("Hello Hono!");
});

export default mailer;
