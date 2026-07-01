import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import Container from "@/app/components/common/Container";
import SectionHeading from "@/app/components/common/SectionHeading";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For exploring the workspace.",
    features: ["Basic dashboard", "Core auth pages", "Community support"],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing product teams.",
    features: ["Advanced workflows", "Priority support", "Team analytics"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For larger organizations.",
    features: ["Custom onboarding", "Security reviews", "Dedicated success"],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with your team"
          description="Start lean, upgrade when your workflows need more power, and keep the same polished experience."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-slate-200 p-6 shadow-sm transition duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "!border-violet-500 !bg-violet-600 !text-white shadow-xl shadow-violet-600/20"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p
                    className={`mt-2 text-sm ${
                      plan.featured ? "text-violet-100" : "text-slate-600"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>
                {plan.featured ? (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-700">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-8 text-4xl font-bold">
                {plan.price}
                {plan.price.startsWith("$") ? (
                  <span className="text-base font-medium">/mo</span>
                ) : null}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`text-sm ${
                      plan.featured ? "text-violet-50" : "text-slate-600"
                    }`}
                  >
                    + {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/sign-up"
                variant={plan.featured ? "secondary" : "primary"}
                className="mt-8 w-full"
              >
                Get started
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
