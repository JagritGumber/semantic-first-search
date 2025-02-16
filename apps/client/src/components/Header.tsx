import { Link } from "wouter";
import { Button } from "./ui/button";
import { signOut, useSession } from "@hono/auth-js/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-end p-2">
      <div className="flex gap-2">
        {!session ? (
          <>
            <Link href="auth/login" asChild>
              <Button>Sign In</Button>
            </Link>
            <Link href="auth/signup" asChild>
              <Button>Get Started</Button>
            </Link>
          </>
        ) : (
          <Button onClick={() => signOut()}>Logout</Button>
        )}
      </div>
    </header>
  );
}
