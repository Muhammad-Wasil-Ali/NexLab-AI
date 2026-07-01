export default function EmptyState({
  title = "Nothing here yet",
  description = "New items will appear here when data is available.",
  action,
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-lg bg-violet-50 text-lg font-bold text-violet-700">
        +
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
