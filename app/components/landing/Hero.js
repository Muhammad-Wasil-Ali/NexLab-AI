import Button from "@/app/components/common/Button";
import Container from "@/app/components/common/Container";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#ede9fe,transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#f5f3ff_100%)] py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
              Modern AI workspace for focused teams
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Build faster with a secure SaaS foundation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              NexLab AI gives teams a polished starting point for dashboards,
              workflows, and protected product experiences.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/sign-up" className="h-12 px-6">
                Start free
              </Button>
              <Button href="#features" variant="secondary" className="h-12 px-6">
                Explore features
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-violet-200/50 blur-3xl" />
            <div className="relative rounded-2xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-violet-950/15 backdrop-blur">
              <div className="rounded-xl bg-slate-950 p-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {["Users", "Tasks", "Growth"].map((item, index) => (
                    <div key={item} className="rounded-lg bg-white/10 p-4">
                      <p className="text-xs text-violet-200">{item}</p>
                      <p className="mt-3 text-2xl font-bold">
                        {["12k", "84%", "3.8x"][index]}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-white p-4 text-slate-950">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">AI workflow health</p>
                      <p className="text-xs text-slate-500">Live performance</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[82, 68, 91].map((value) => (
                      <div key={value} className="h-3 rounded-full bg-slate-100">
                        <div
                          className="h-3 rounded-full bg-violet-600"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
