import EmptyState from "@/app/components/dashboard/EmptyState";
import SectionTitle from "@/app/components/dashboard/SectionTitle";

export default function RecentActivity({
  title = "Recent Activity",
  description,
  activities = [],
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle title={title} description={description} />
      <div className="mt-6">
        {activities.length ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-600" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-slate-950">
                      {activity.title}
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      {activity.timestamp}
                    </p>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No activity yet"
            description="Your chats, prompt saves, and account events will show here."
          />
        )}
      </div>
    </section>
  );
}
