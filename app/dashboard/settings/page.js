import LogoutButton from "@/app/components/common/LogoutButton";
import ChangePasswordForm from "@/app/components/dashboard/ChangePasswordForm";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import SectionTitle from "@/app/components/dashboard/SectionTitle";
import ThemeSelector from "@/app/components/dashboard/ThemeSelector";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <DashboardHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Manage account security, theme, and session preferences."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <ChangePasswordForm />
      </div>

      <section className="rounded-lg border border-rose-100 bg-white p-6 shadow-sm">
        <SectionTitle
          title="Session"
          description="End the current protected dashboard session."
        />
        <div className="mt-6 max-w-xs">
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
