import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "./schema";

const app = new Hono<{ Bindings: CloudflareBindings }>({
  strict: false,
}).basePath("/");

app.use(
  "*",
  initAuthConfig((c) => ({
    adapter: DrizzleAdapter(drizzle(c.env.DB), {
      usersTable: users,
      accountsTable: accounts,
      authenticatorsTable: authenticators,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    secret: c.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: c.env.GITHUB_ID,
        clientSecret: c.env.GITHUB_SECRET,
      }),
    ],
  }))
);

app.use("/api/auth/*", authHandler());

app.use("/api/*", verifyAuth());

app.get("/api/protected", (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
