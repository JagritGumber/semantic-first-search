import { LoginForm } from "@/components/LoginForm";
import { useSession } from "@hono/auth-js/react";
import { Redirect } from "wouter";

export function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return <Redirect replace to={"/chat"} />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
