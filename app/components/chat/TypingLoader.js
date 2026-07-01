export default function TypingLoader() {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="h-2 w-2 animate-bounce rounded-full bg-violet-500"
          style={{ animationDelay: `${dot * 120}ms` }}
        />
      ))}
    </div>
  );
}
