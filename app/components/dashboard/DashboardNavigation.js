"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "AI Chat", href: "/dashboard/chat", countKey: "chats" },
  { label: "Prompt Library", href: "/dashboard/prompts", countKey: "prompts" },
  { label: "Activity", href: "/dashboard/activity" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardNavigation({ mobile = false, counts = {} }) {
  const pathname = usePathname();

  return (
    <nav className={mobile ? "flex gap-2 overflow-x-auto pb-1" : "space-y-2"}>
      {navItems.map((item) => {
        const isActive = item.href === pathname;
        const count =
          item.countKey && Number.isFinite(counts[item.countKey])
            ? counts[item.countKey]
            : null;
        const classes = `flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-violet-50 text-violet-700"
            : "text-slate-600 hover:bg-violet-50 hover:text-violet-700"
        } ${mobile ? "shrink-0" : ""}`;

        return (
          <Link key={item.label} href={item.href} className={classes}>
            {item.label}
            {count !== null && !mobile ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                {count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
