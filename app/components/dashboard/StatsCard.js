export default function StatsCard({ label, value, description, icon, tone = "violet" }) {
  const tones = {
    violet: "bg-violet-50 text-violet-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-950/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        <span
          className={`grid h-11 w-11 place-items-center rounded-lg text-sm font-bold ${
            tones[tone] || tones.violet
          }`}
        >
          {icon}
        </span>
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-6 text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}
