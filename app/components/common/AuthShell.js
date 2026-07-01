import Logo from "@/app/components/common/Logo";

export default function AuthShell({ children, eyebrow, title, subtitle }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#f8fafc_0%,#f5f3ff_52%,#eef2ff_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_440px]">
          <section className="hidden lg:block">
            <Logo href="/sign-in" />
            <div className="mt-14 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-700">
                {eyebrow}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-950">
                {title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {subtitle}
              </p>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {["Secure", "Modular", "Ready"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/70 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="mb-8 flex justify-center lg:hidden">
              <Logo href="/sign-in" />
            </div>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
