import Button from "@/app/components/common/Button";
import SectionTitle from "@/app/components/dashboard/SectionTitle";

export default function ProfileCard({ user, details = [], actionHref }) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        title="Profile Summary"
        description="Account details from your workspace profile."
      />
      <div className="mt-6 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-600/20">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-slate-950">{user.name}</p>
          <p className="truncate text-sm text-slate-500">{user.email}</p>
        </div>
      </div>
      <dl className="mt-6 grid gap-3">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3"
          >
            <dt className="text-sm font-medium text-slate-500">{detail.label}</dt>
            <dd className="text-right text-sm font-semibold text-slate-950">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>
      {actionHref ? (
        <Button href={actionHref} variant="secondary" className="mt-6 w-full">
          Edit Profile
        </Button>
      ) : null}
    </section>
  );
}
