import Card from "@/app/components/common/Card";
import Container from "@/app/components/common/Container";
import SectionHeading from "@/app/components/common/SectionHeading";

const features = [
  ["AI", "Smart workflows", "Design guided automations that keep teams moving."],
  ["DB", "Secure data layer", "Keep product data organized with scalable patterns."],
  ["API", "Clean integrations", "Connect auth, dashboards, and product flows cleanly."],
  ["UX", "Polished interface", "Ship responsive pages with consistent interaction states."],
  ["OPS", "Production checks", "Structure features for linting, building, and growth."],
  ["JWT", "Protected access", "Support secure sessions and authenticated product areas."],
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything a modern SaaS starter needs"
          description="Reusable sections, clear architecture, and responsive patterns make the product feel ready from the first visit."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([icon, title, description]) => (
            <Card
              key={title}
              className="border-slate-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-950/10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-violet-50 text-sm font-bold text-violet-700">
                {icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
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
