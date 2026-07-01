import { cookies } from "next/headers";

import Button from "@/app/components/common/Button";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import ProfileCard from "@/app/components/dashboard/ProfileCard";
import ProfileEditor from "@/app/components/dashboard/ProfileEditor";
import { getUserProfile } from "@/services/userService";
import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

function formatJoinDate(date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = verifyToken(token);
  const result = await getUserProfile(session.userId);
  const user = result.user;

  const details = [
    { label: "Join Date", value: formatJoinDate(user.createdAt) },
    { label: "Total Chats", value: result.stats.totalChats.toString() },
    { label: "Saved Prompts", value: result.stats.savedPrompts.toString() },
    { label: "Favorite Prompts", value: result.stats.favoritePrompts.toString() },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <DashboardHeader
        eyebrow="Profile"
        title="Your account profile"
        description="Manage your account details and review workspace usage."
        action={<Button href="/dashboard/prompts" variant="secondary">View Prompts</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ProfileCard user={user} details={details} />
        <ProfileEditor user={user} />
      </div>
    </div>
  );
}
