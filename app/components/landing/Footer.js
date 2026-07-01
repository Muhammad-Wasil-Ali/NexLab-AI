import Container from "@/app/components/common/Container";
import Logo from "@/app/components/common/Logo";

const links = [
  ["Features", "#features"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

const socials = ["X", "in", "GH"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo href="/" />
          <nav className="flex flex-wrap gap-5">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-sm font-bold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Copyright 2026 NexLab AI. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
