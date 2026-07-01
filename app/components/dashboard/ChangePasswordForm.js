"use client";

import { useState } from "react";

import Button from "@/app/components/common/Button";
import ErrorMessage from "@/app/components/common/ErrorMessage";
import PasswordInput from "@/app/components/common/PasswordInput";
import SuccessMessage from "@/app/components/common/SuccessMessage";
import SectionTitle from "@/app/components/dashboard/SectionTitle";
import { updatePassword } from "@/utils/profile/profileApi";

const initialForm = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const response = await updatePassword(form);
      setSuccess(response.message || "Password updated successfully.");
      setForm(initialForm);
    } catch (saveError) {
      setError(saveError.message || "Unable to update password.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
      <SectionTitle
        title="Change Password"
        description="Update your password for the current signed-in account."
      />
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <PasswordInput
          id="settings-current-password"
          label="Current Password"
          value={form.currentPassword}
          onChange={(event) =>
            updateField("currentPassword", event.target.value)
          }
          autoComplete="current-password"
          required
        />
        <PasswordInput
          id="settings-new-password"
          label="New Password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          autoComplete="new-password"
          required
        />
        <PasswordInput
          id="settings-confirm-password"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={(event) =>
            updateField("confirmPassword", event.target.value)
          }
          autoComplete="new-password"
          required
        />
        <Button type="submit" isLoading={isSaving}>
          Update Password
        </Button>
      </form>
    </section>
  );
}
