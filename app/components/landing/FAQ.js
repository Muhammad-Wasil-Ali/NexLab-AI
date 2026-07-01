"use client";

import { useState } from "react";

import Container from "@/app/components/common/Container";
import SectionHeading from "@/app/components/common/SectionHeading";

const faqs = [
  [
    "Does this landing page use any UI library?",
    "No. It uses JavaScript components and Tailwind CSS utility classes only.",
  ],
  [
    "Can users still sign in and sign up?",
    "Yes. The landing page links to the existing /sign-in and /sign-up routes.",
  ],
  [
    "Is the contact form connected to a backend?",
    "No. It is frontend-only for now and can be connected to an API route later.",
  ],
  [
    "Is the page responsive?",
    "Yes. Sections are built for mobile, tablet, and desktop breakpoints.",
  ],
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before you launch"
          description="Simple answers for the most common product and implementation details."
        />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {faqs.map(([question, answer], index) => {
            const isOpen = openIndex === index;

            return (
              <div key={question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-950 transition hover:bg-violet-50"
                  aria-expanded={isOpen}
                >
                  {question}
                  <span className="text-xl text-violet-600">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-slate-600">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
