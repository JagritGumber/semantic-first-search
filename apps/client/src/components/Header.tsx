import { Link } from "wouter";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex justify-end p-4">
      <div className="flex gap-2">
        <Link href="auth/login" asChild>
          <Button>Sign In</Button>
        </Link>
        <Link href="auth/signup" asChild>
          <Button>Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
