import AuthShell from "@/app/components/common/AuthShell";
import ForgotPasswordForm from "@/app/components/forgot/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | NexLab AI",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account check"
      title="Reset your NexLab AI password."
      subtitle="Verify your account email, then choose a new password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
