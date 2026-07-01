"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/common/Button";
import Container from "@/app/components/common/Container";
import Logo from "@/app/components/common/Logo";
import { logout } from "@/utils/auth/authApi";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const initials = session?.name
    ? session.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      setIsUserOpen(false);
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo href="/" />

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-violet-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {session ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserOpen((current) => !current)}
                  className="flex items-center gap-3 rounded-lg border border-violet-100 bg-violet-50 px-2 py-2 text-sm font-semibold text-slate-800 transition hover:border-violet-200 hover:bg-violet-100"
                  aria-expanded={isUserOpen}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="max-w-32 truncate">{session.name}</span>
                  <span className="text-violet-700">⌄</span>
                </button>

                {isUserOpen ? (
                  <div className="absolute right-0 mt-3 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10">
                    <div className="border-b border-slate-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {session.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {session.email}
                      </p>
                    </div>
                    <a
                      href="/dashboard"
                      className="mt-2 block rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      Dashboard
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
                    >
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <Button href="/sign-in" variant="ghost">
                  Login
                </Button>
                <Button href="/sign-up">Sign Up</Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        {isOpen ? (
          <div className="border-t border-slate-100 py-4 lg:hidden">
            <nav className="grid gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {session ? (
              <div className="mt-4 rounded-lg border border-violet-100 bg-violet-50 p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-violet-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {session.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {session.email}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Button href="/dashboard" variant="secondary" className="w-full">
                    Dashboard
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleLogout}
                    isLoading={isLoggingOut}
                    className="w-full text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Button href="/sign-in" variant="secondary" className="w-full">
                  Login
                </Button>
                <Button href="/sign-up" className="w-full">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </Container>
    </header>
  );
}
