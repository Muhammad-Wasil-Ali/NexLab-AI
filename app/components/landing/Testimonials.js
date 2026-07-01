import Card from "@/app/components/common/Card";
import Container from "@/app/components/common/Container";
import SectionHeading from "@/app/components/common/SectionHeading";

const testimonials = [
  [
    "AM",
    "Ayesha Malik",
    "Product Lead",
    "NexLab helped us move from rough prototype to a polished customer-facing flow quickly.",
  ],
  [
    "HR",
    "Hamza Rauf",
    "Founder",
    "The structure is clean, responsive, and easy for our team to extend without friction.",
  ],
  [
    "SK",
    "Sara Khan",
    "Operations Manager",
    "It feels like a real SaaS product from the first screen, not a generic template.",
  ],
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Built for teams that care about polish"
          description="A modern interface gives your product credibility while the code stays readable."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map(([avatar, name, role, quote]) => (
            <Card
              key={name}
              className="border-slate-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                  {avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-950">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
              </div>
              <p className="mt-5 text-sm font-semibold text-amber-500">5.0 rating</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                &ldquo;{quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
