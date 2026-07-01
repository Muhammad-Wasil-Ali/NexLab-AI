import { cookies } from "next/headers";

import Contact from "@/app/components/landing/Contact";
import FAQ from "@/app/components/landing/FAQ";
import Features from "@/app/components/landing/Features";
import Footer from "@/app/components/landing/Footer";
import Hero from "@/app/components/landing/Hero";
import HowItWorks from "@/app/components/landing/HowItWorks";
import Navbar from "@/app/components/landing/Navbar";
import Pricing from "@/app/components/landing/Pricing";
import Testimonials from "@/app/components/landing/Testimonials";
import verifyToken from "@/utils/jwt/verifyToken";

const COOKIE_NAME = "auth_token";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = token ? verifyToken(token) : null;

  return (
    <>
      <Navbar session={session} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
