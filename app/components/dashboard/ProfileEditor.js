"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import Input from "@/app/components/common/Input";
import SuccessMessage from "@/app/components/common/SuccessMessage";
import SectionTitle from "@/app/components/dashboard/SectionTitle";
import { updateProfile } from "@/utils/profile/profileApi";

export default function ProfileEditor({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await updateProfile({ name });
      setName(data.user.name);
      setSuccess(data.message || "Profile updated.");
      router.refresh();
    } catch (saveError) {
      setError(saveError.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        title="User Information"
        description="Update your display name. Email remains read-only."
      />
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <Input
          id="profile-name"
          label="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={2}
          maxLength={80}
          required
        />
        <Input
          id="profile-email"
          label="Email"
          value={user.email}
          readOnly
          inputClassName="cursor-not-allowed bg-slate-50 text-slate-500"
        />
        <Button type="submit" isLoading={isSaving}>
          Save Changes
        </Button>
      </form>
    </section>
  );
}
