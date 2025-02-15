import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
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
} from "@sfs/db";
import { createUserValidator } from "../validators/createUserValidator";
import { zValidator } from "@hono/zod-validator";
import { CredentialsSignin } from "@auth/core/errors";
import { eq } from "drizzle-orm";
import { tryPromise } from "@sfs/utils";
import { comparePassword } from "../handlers/comparePassword";
import { ApiResponse } from "@sfs/types/core";
import { hashPassword } from "../handlers/hashPassword";
import { SelectUser } from "@sfs/db/users";

const authRouter = new Hono<{ Bindings: CloudflareBindings }>()
  .use(
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
        Google({
          clientId: c.env.GOOGLE_ID,
          clientSecret: c.env.GOOGLE_SECRET,
        }),
        Credentials({
          credentials: {
            email: {},
            password: {},
          },
          async authorize(credentials, request) {
            if (!credentials?.email || !credentials?.password) {
              throw new CredentialsSignin("Email and Password are required");
            }

            const db = drizzle(c.env.DB);
            const [foundUsers, error] = await tryPromise(
              db
                .select()
                .from(users)
                .where(eq(users.email, credentials.email as string))
                .limit(1)
            );

            if (error) {
              throw new CredentialsSignin(error?.message);
            }

            if (foundUsers.length === 0) {
              throw new CredentialsSignin("User not found");
            }

            const user = foundUsers[0];

            if (!user.password) {
              throw new CredentialsSignin(
                `You have Signed Up with a Different authentication method try using that method`
              );
            }

            if (user.emailVerified === null) {
              throw new CredentialsSignin(
                "Please verify your account before login"
              );
            }

            const [passwordMatch, passwordMatchError] = await tryPromise(
              comparePassword(c, credentials.password as string, user.password)
            );

            if (passwordMatchError) {
              throw new CredentialsSignin(passwordMatchError?.message);
            }

            if (!passwordMatch) {
              throw new CredentialsSignin("Incorrect Password");
            }

            return user;
          },
        }),
      ],
      session: {
        strategy: "jwt",
      },
      callbacks: {
        async jwt({ token, trigger }) {
          if (trigger === "signUp") {
            // New User can be done something
          }
          return token;
        },
        async session({ session }) {
          return session;
        },
      },
    }))
  )
  .use("/api/auth/*", authHandler())
  .use("/api/auth/*", verifyAuth())
  .get("/api/auth/protected", (c) => {
    const auth = c.get("authUser");
    return c.json(auth);
  })
  .post(
    "/api/auth/user",
    zValidator("json", createUserValidator),
    async (c) => {
      const { name, email, password } = c.req.valid("json");
      const db = drizzle(c.env.DB);
      const [searchUser, searchUserError] = await tryPromise(
        db.select().from(users).where(eq(users.email, email)).limit(1)
      );

      if (searchUser?.length !== 0) {
        return c.json(
          {
            success: false,
            message: "User already exists",
            data: null,
          } satisfies ApiResponse,
          400
        );
      }

      // User doesn't exists
      // Start Registration and for start hash their password
      const [hashedPassword, hashedPasswordError] = await tryPromise(
        hashPassword(c, password)
      );

      if (hashedPasswordError) {
        return c.json(
          {
            success: false,
            message: hashedPasswordError?.message,
            data: null,
          } satisfies ApiResponse,
          500
        );
      }

      // Everything is alright make the user

      const [user, userError] = await tryPromise(
        db
          .insert(users)
          .values({
            name,
            email,
            password: hashedPassword,
          })
          .returning()
      );

      if (userError) {
        return c.json(
          {
            success: false,
            message: userError?.message,
            data: null,
          } satisfies ApiResponse,
          500
        );
      }

      return c.json(
        {
          success: true,
          message: "User created Successfully",
          data: {
            id: user[0].id,
            email: user[0].email,
          },
        } satisfies ApiResponse<Pick<SelectUser, "id" | "email">>,
        200
      );
    }
  );

export default authRouter;
