"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import Input from "@/app/components/common/Input";
import PasswordInput from "@/app/components/common/PasswordInput";
import { signin } from "@/utils/auth/authApi";

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signin(form);
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm font-semibold text-violet-700">Welcome back</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Sign in to NexLab
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Access your dashboard with your account credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={error} />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={updateField}
          placeholder="alex@example.com"
          autoComplete="email"
        />
        <PasswordInput
          id="password"
          name="password"
          label="Password"
          value={form.password}
          onChange={updateField}
          placeholder="Your password"
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link href="/forgot" className="text-sm font-semibold text-violet-700">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" isLoading={isLoading} className="w-full">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/sign-up" className="font-semibold text-violet-700">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
