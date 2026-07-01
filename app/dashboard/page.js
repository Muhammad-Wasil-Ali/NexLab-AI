import { cookies } from "next/headers";
import Link from "next/link";

import Button from "@/app/components/common/Button";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import ProfileCard from "@/app/components/dashboard/ProfileCard";
import QuickActions from "@/app/components/dashboard/QuickActions";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import SectionTitle from "@/app/components/dashboard/SectionTitle";
import StatsCard from "@/app/components/dashboard/StatsCard";
import { getDashboardSummary } from "@/services/dashboardService";
import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

const quickActions = [
  { label: "Open AI Chat", href: "/dashboard/chat", variant: "primary" },
  { label: "Prompt Library", href: "/dashboard/prompts" },
  { label: "View Activity", href: "/dashboard/activity" },
  { label: "Update Profile", href: "/dashboard/profile" },
];

function formatConversationDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

function formatActivityDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = verifyToken(token);
  const summary = await getDashboardSummary(session.userId);

  const user = {
    name: session.name,
    email: session.email,
  };

  const profileDetails = [
    { label: "Total Chats", value: summary.stats.totalChats.toString() },
    { label: "Saved Prompts", value: summary.stats.savedPrompts.toString() },
    { label: "Favorite Prompts", value: summary.stats.favoritePrompts.toString() },
  ];

  const stats = [
    {
      label: "Total Chats",
      value: summary.stats.totalChats.toString(),
      description: "Conversations saved to your AI workspace.",
      icon: "AI",
      tone: "violet",
    },
    {
      label: "Total Messages",
      value: summary.stats.totalMessages.toString(),
      description: "User and AI messages stored across your chats.",
      icon: "RC",
      tone: "emerald",
    },
    {
      label: "Saved Prompts",
      value: summary.stats.savedPrompts.toString(),
      description: "Reusable prompts saved to your library.",
      icon: "SP",
      tone: "amber",
    },
    {
      label: "Favorite Prompts",
      value: summary.stats.favoritePrompts.toString(),
      description: "Prompts marked for quick access.",
      icon: "FP",
      tone: "slate",
    },
  ];

  const activities = summary.recentActivity.map((activity) => ({
    ...activity,
    timestamp: formatActivityDate(activity.createdAt),
  }));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHeader
        eyebrow="Dashboard"
        title={`Welcome back, ${user.name}`}
        description="Here is a quick overview of your protected AI workspace and recent conversations."
        action={<Button href="/dashboard/chat">Continue Chat</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <SectionTitle
            title="Recent Conversations"
            description="Pick up where you left off in your latest chats."
            action={
              <Button href="/dashboard/chat" variant="secondary">
                Continue Chat
              </Button>
            }
          />
          <div className="mt-6">
            {summary.recentChats.length ? (
              <div className="space-y-3">
                {summary.recentChats.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/dashboard/chat?conversation=${conversation.id}`}
                    className="flex flex-col gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 transition hover:border-violet-200 hover:bg-violet-50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950">
                        {conversation.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Updated {formatConversationDate(conversation.updatedAt)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-violet-700">
                      Continue
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <h3 className="text-base font-bold text-slate-950">
                  No conversations yet
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Start your first AI chat and it will appear here.
                </p>
                <div className="mt-5">
                  <Button href="/dashboard/chat">Start Chat</Button>
                </div>
              </div>
            )}
          </div>
        </section>
        <div className="space-y-6">
          <RecentActivity
            title="Recent Activity"
            description="Latest prompt and chat events."
            activities={activities}
          />
          <QuickActions actions={quickActions} />
          <ProfileCard
            user={user}
            details={profileDetails}
            actionHref="/dashboard/profile"
          />
        </div>
      </div>
    </div>
  );
}
