"use client";

import { SignInHandler } from "@/util/util";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  async function SigninRequest() {
    if (!emailRef.current || !passwordRef.current) {
      return;
    }
    const response = await SignInHandler(
      emailRef.current.value,
      passwordRef.current.value,
    );

    if (response === "Invalid email address") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-5" />
          <span>Please enter a valid email address.</span>
        </span>,
      );
      return;
    } else if (response === "Password must be at least 8 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-5" />
          <span>Password must be at least 8 characters</span>
        </span>,
      );
      return;
    } else if (
      response ===
      "Password must include uppercase, lowercase, number, and special character (min 8 characters)"
    ) {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-8" />
          <span>
            Password must include uppercase, lowercase, number, and special
            character (min 8 characters)
          </span>
        </span>,
      );
      return;
    } else if (response === "sign up first") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-5" />
          <span>You need to Sign Up first.</span>
        </span>,
      );
      return;
    } else if (response === "invalid password") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-5" />
          <span>The password you entered is incorrect.</span>
        </span>,
      );
      return;
    } else if (!response) {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-5" />
          <span>Something went wrong. Try again in a moment.</span>
        </span>,
      );
      return;
    }
    router.push("/");

    return;
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input ref={passwordRef} id="password" type="password" required />
        </div>
        <Button onClick={SigninRequest} type="button" className="w-full">
          Sign In
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
