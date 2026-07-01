import AuthShell from "@/app/components/common/AuthShell";
import SignUpForm from "@/app/components/sign-up/SignUpForm";

export const metadata = {
  title: "Sign Up | NexLab AI",
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Create access"
      title="Launch a secure account in a clean SaaS experience."
      subtitle="The authentication stack validates, hashes, stores, and protects credentials with a modular server architecture."
    >
      <SignUpForm />
    </AuthShell>
  );
}
