"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useRef } from "react";
import { SignUpHandler } from "@/util/util";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { TriangleAlertIcon } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  async function SignUpRequest() {
    if (
      !firstNameRef.current ||
      !lastNameRef.current ||
      !emailRef.current ||
      !passwordRef.current
    ) {
      return;
    }
    const response = await SignUpHandler(
      firstNameRef.current.value,
      lastNameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
    );
    console.log(response);
    if (response === "Email already in use") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>Email already in use</span>
        </span>,
      );
      return;
    } else if (
      response ===
      "Password must include uppercase, lowercase, number, and special character (min 8 characters)."
    ) {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="size-10" />
          <span>
            Password must include uppercase, lowercase, number, and special
            character (min 8 characters).
          </span>
        </span>,
      );
      return;
    } else if (response === "Password must be at least 8 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>Server is down</span>
        </span>,
      );
      return;
    } else if (response === "Invalid email address") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>Invalid email address</span>
        </span>,
      );
      return;
    } else if (response === "Last name must be at least 2 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>Last name must be at least 2 characters</span>
        </span>,
      );
      return;
    } else if (response === "Last name must be less than 50 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>Last name must be less than 50 characters</span>
        </span>,
      );
      return;
    } else if (response === "First name must be at least 2 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>First name must be at least 2 characters</span>
        </span>,
      );
      return;
    } else if (response === "First name must be less than 50 characters") {
      toast(
        <span className="flex items-center gap-2">
          <TriangleAlertIcon className="w-5 h-5" />
          <span>First name must be less than 50 characters</span>
        </span>,
      );
      return;
    } else if (!response) {
      return;
    }
    router.push("/signin");
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-3">
        <div className="flex gap-3">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              ref={firstNameRef}
              id="firstName"
              type="text"
              placeholder="John"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              ref={lastNameRef}
              id="lastName"
              type="text"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="xyz@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input ref={passwordRef} id="password" type="password" required />
        </div>
        <Button onClick={SignUpRequest} type="button" className="w-full">
          Sign Up
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="underline underline-offset-4">
          Sign In
        </Link>
      </div>
    </form>
  );
}
