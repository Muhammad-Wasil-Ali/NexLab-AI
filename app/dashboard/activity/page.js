import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import EmptyState from "@/app/components/dashboard/EmptyState";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import { cookies } from "next/headers";

import { getUserActivities } from "@/services/activityService";
import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

function formatActivityDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export default async function ActivityPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = verifyToken(token);
  const result = await getUserActivities(session.userId);
  const activities = result.activities.map((activity) => ({
    ...activity,
    timestamp: formatActivityDate(activity.createdAt),
  }));

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <DashboardHeader
        eyebrow="Activity"
        title="Recent user activity"
        description="A database-backed timeline of your prompt and chat actions."
      />

      {activities.length ? (
          <RecentActivity
            title="Activity Timeline"
            description="Latest workspace events and account interactions."
          activities={activities}
        />
      ) : (
        <EmptyState
          title="No activity found"
          description="When activity data is available, it will appear in this timeline."
        />
      )}
    </div>
  );
}
