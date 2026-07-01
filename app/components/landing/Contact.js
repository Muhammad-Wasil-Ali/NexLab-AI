"use client";

import { useState } from "react";

import Button from "@/app/components/common/Button";
import Card from "@/app/components/common/Card";
import Container from "@/app/components/common/Container";
import Input from "@/app/components/common/Input";
import SectionHeading from "@/app/components/common/SectionHeading";
import TextArea from "@/app/components/common/TextArea";

export default function Contact() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Thanks. Your message is ready for a future backend integration.");
  }

  return (
    <section id="contact" className="bg-slate-50 py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Ready to shape your next product flow?"
            description="Send a quick message and keep the landing page prepared for a backend contact route when you need one."
          />
          <Card className="border-slate-200 p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="contact-name" name="name" label="Name" required />
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Email"
                  required
                />
              </div>
              <TextArea
                id="contact-message"
                name="message"
                label="Message"
                required
              />
              {message ? (
                <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {message}
                </p>
              ) : null}
              <Button type="submit" className="w-full sm:w-auto">
                Submit message
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}
