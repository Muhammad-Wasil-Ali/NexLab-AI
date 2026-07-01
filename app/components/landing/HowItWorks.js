import Card from "@/app/components/common/Card";
import Container from "@/app/components/common/Container";
import SectionHeading from "@/app/components/common/SectionHeading";

const steps = [
  ["01", "Create your account", "Start with a simple, secure signup flow."],
  ["02", "Set up your workspace", "Invite the right workflows into one dashboard."],
  ["03", "Launch automations", "Use guided product patterns to move faster."],
  ["04", "Measure and improve", "Track progress and refine what matters most."],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From idea to operating system in four steps"
          description="A clean path that helps teams move from signup to measurable product outcomes."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, description]) => (
            <Card
              key={number}
              className="border-slate-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-bold text-violet-600">{number}</span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
