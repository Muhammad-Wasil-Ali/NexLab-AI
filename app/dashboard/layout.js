import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Logo from "@/app/components/common/Logo";
import LogoutButton from "@/app/components/common/LogoutButton";
import DashboardNavigation from "@/app/components/dashboard/DashboardNavigation";
import { getNavigationCounts } from "@/services/dashboardService";
import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

export const metadata = {
  title: "Dashboard | NexLab AI",
};

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = token ? verifyToken(token) : null;

  if (!session) {
    redirect("/sign-in");
  }

  const navigationCounts = await getNavigationCounts(session.userId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
          <Logo href="/dashboard" />
          <div className="mt-10">
            <DashboardNavigation counts={navigationCounts} />
          </div>
          <div className="mt-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">
              {session.name}
            </p>
            <p className="mt-1 break-all text-xs text-slate-500">
              {session.email}
            </p>
            <div className="mt-4">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <Logo href="/dashboard" />
            </div>
            <div className="mt-4">
              <DashboardNavigation mobile counts={navigationCounts} />
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
