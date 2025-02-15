import { useSession } from "@hono/auth-js/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { CustomLink } from "./CustomLink";
import { Input } from "./ui/input";
import { SessionData } from "./SessionData";

const UpdateForm = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");

  if (!session?.user) return null;
  return (
    <>
      <h2 className="text-xl font-bold">Updating the session</h2>
      <form
        onSubmit={async () => {
          if (session) {
            const newSession = await update({
              ...session,
              user: { ...session.user, name },
            });
            console.log({ newSession });
          }
        }}
        className="flex items-center w-full max-w-sm space-x-2"
      >
        <Input
          type="text"
          placeholder={session.user.name ?? ""}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button type="submit">Update</Button>
      </form>
    </>
  );
};

export function ClientExample() {
  const { data: session, status } = useSession();
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Client Side Rendering Usage</h1>
      <p>
        This page fetches session data client side using the{" "}
        <CustomLink href="https://authjs.dev/reference/nextjs#usesession">
          <code>useSession</code>
        </CustomLink>{" "}
        React Hook.
      </p>
      <CustomLink
        className="font-bold"
        rel="noreferrer"
        target="_blank"
        href="/api/protected"
      >
        Protected Route
      </CustomLink>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
      <UpdateForm />
    </div>
  );
}
