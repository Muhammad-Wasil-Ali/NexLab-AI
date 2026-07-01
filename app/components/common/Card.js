export default function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-lg border border-white/70 bg-white/95 p-6 shadow-xl shadow-violet-950/10 backdrop-blur sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}
