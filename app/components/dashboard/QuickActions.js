import Button from "@/app/components/common/Button";
import SectionTitle from "@/app/components/dashboard/SectionTitle";

export default function QuickActions({ actions = [] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        title="Quick Actions"
        description="Jump into the most common workspace tasks."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            href={action.href}
            variant={action.variant || "secondary"}
            className="justify-start"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </section>
  );
}
