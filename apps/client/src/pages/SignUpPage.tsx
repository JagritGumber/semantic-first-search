import { SignUpForm } from "@/components/forms/SignUpForm";
import { useSession } from "@hono/auth-js/react";
import { Redirect } from "wouter";

export const SignUpPage = () => {
  const { data: session } = useSession();

  if (session) {
    return <Redirect href="/chat" replace={true} />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
};
