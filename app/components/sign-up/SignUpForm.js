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
import { signup } from "@/utils/auth/authApi";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await signup(form);
      setSuccess(response.message);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => router.push("/sign-in"), 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <div className="mb-6">
        <p className="text-sm font-semibold text-violet-700">Create account</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Start your workspace
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Use your name, email, and a strong password to create access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <Input
          id="name"
          name="name"
          label="Name"
          value={form.name}
          onChange={updateField}
          placeholder="Alex Morgan"
          autoComplete="name"
        />
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
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          value={form.confirmPassword}
          onChange={updateField}
          placeholder="Repeat your password"
          autoComplete="new-password"
        />
        <Button type="submit" isLoading={isLoading} className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-violet-700">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
