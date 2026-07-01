import Link from "next/link";

export default function Logo({ href = "/sign-in", className = "" }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-3 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-violet-600 text-base font-black text-white shadow-lg shadow-violet-600/25">
        N
      </span>
      <span className="text-xl font-bold tracking-tight text-slate-950">
        NexLab AI
      </span>
    </Link>
  );
}
