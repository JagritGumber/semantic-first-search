import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@hono/auth-js/react";
import { Redirect } from "wouter";

export const ChatPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      Chat Here in future
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};
