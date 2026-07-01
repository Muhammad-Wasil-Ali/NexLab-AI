"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import Input from "@/app/components/common/Input";
import PasswordInput from "@/app/components/common/PasswordInput";
import SuccessMessage from "@/app/components/common/SuccessMessage";
import { resetPassword } from "@/utils/auth/authApi";

export default function ResetPasswordForm({ initialEmail = "" }) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await resetPassword({
        email,
        password,
        confirmPassword,
      });
      setSuccess(response.message);
      window.setTimeout(() => {
        router.replace("/sign-in");
      }, 900);
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
          Password reset
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Choose a new password
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use at least 8 characters with one letter and one number.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <Input
          id="reset-email"
          name="email"
          type="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="alex@example.com"
          autoComplete="email"
          required
        />
        <PasswordInput
          id="reset-password"
          label="New Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <PasswordInput
          id="reset-confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          required
        />
        <Button type="submit" isLoading={isLoading} className="w-full">
          Update Password
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Back to{" "}
        <Link href="/sign-in" className="font-semibold text-violet-700">
          sign in
        </Link>
      </p>
    </Card>
  );
}
