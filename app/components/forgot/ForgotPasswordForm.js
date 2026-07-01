"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import Input from "@/app/components/common/Input";
import SuccessMessage from "@/app/components/common/SuccessMessage";
import { forgotPassword } from "@/utils/auth/authApi";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await forgotPassword({ email });
      setSuccess(response.message);
      const resetEmail = encodeURIComponent(response.email || email);
      router.push(`/reset-password?email=${resetEmail}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm font-semibold text-violet-700">
          Password recovery
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Check account email
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your account email to continue to password reset.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="alex@example.com"
          autoComplete="email"
        />
        <Button type="submit" isLoading={isLoading} className="w-full">
          Verify email
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Remembered your password?{" "}
        <Link href="/sign-in" className="font-semibold text-violet-700">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
