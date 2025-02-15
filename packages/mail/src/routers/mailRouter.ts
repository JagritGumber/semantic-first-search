import sendMailRequestValidator from "@/validators/sendMailRequest";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const mailRouter = new Hono<{ Bindings: CloudflareBindings }>().post(
  "/send",
  zValidator("json", sendMailRequestValidator),
  async (c) => {
    const { to, subject, type, verifyToken, resetToken } = c.req.valid("json");
  }
);

export default mailRouter;
