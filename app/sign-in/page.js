import AuthShell from "@/app/components/common/AuthShell";
import SignInForm from "@/app/components/sign-in/SignInForm";

export const metadata = {
  title: "Sign In | NexLab AI",
};

export default function SignInPage() {
  return (
    <AuthShell
      eyebrow="Secure access"
      title="A focused dashboard for your AI workspace."
      subtitle="Sign in with your credentials to continue into a protected, production-ready authentication flow."
    >
      <SignInForm />
    </AuthShell>
  );
}
