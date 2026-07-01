import AuthShell from "@/app/components/common/AuthShell";
import ResetPasswordForm from "@/app/components/forgot/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | NexLab AI",
};

export default async function ResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  const email = typeof params?.email === "string" ? params.email : "";

  return (
    <AuthShell
      eyebrow="Password reset"
      title="Create a new password."
      subtitle="After updating your password, you will be redirected to sign in."
    >
      <ResetPasswordForm initialEmail={email} />
    </AuthShell>
  );
}
