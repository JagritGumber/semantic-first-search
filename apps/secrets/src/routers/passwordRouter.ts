import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { cors } from "hono/cors";
import type {
  HashRequestPayload,
  HashResponsePayload,
  CompareRequestPayload,
  CompareResponsePayload,
} from "@sfs/types/secrets";
import type { ApiResponse } from "@sfs/types/core";
import { zValidator } from "@hono/zod-validator";
import {
  passwordHashRequestValidator,
  passwordCompareRequestValidator,
} from "../validators";

const passwordRouter = new Hono<{ Bindings: CloudflareBindings }>()
  .use("*", async (c, next) => {
    const corsMiddleware = cors({
      origin: c.env.ALLOWED_ORIGIN,
      allowHeaders: ["Origin", "Content-Type", "Authorization"],
      allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
      credentials: true,
    });
    return corsMiddleware(c, next);
  })
  .post(
    "/hash",
    zValidator("json", passwordHashRequestValidator),
    async (c) => {
      const data = c.req.valid("json") satisfies HashRequestPayload;
      // 12 will take about 600ms to complete
      // however 14 will take 1.5 seconds.
      const hash = await bcrypt.hash(data.password, 13);

      return c.json(
        {
          success: true,
          data: { hash },
        } satisfies ApiResponse<HashResponsePayload>,
        200
      );
    }
  )
  .post(
    "/compare",
    zValidator("json", passwordCompareRequestValidator),
    async (c) => {
      const data = c.req.valid("json") satisfies CompareRequestPayload;

      const is_same = await bcrypt.compare(data.password, data.hash);

      return c.json(
        {
          success: true,
          data: { match: is_same },
        } satisfies ApiResponse<CompareResponsePayload>,
        200
      );
    }
  );

export type PasswordRouter = typeof passwordRouter;
export default passwordRouter;
