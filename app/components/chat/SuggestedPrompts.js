const prompts = [
  "Draft a product launch checklist for a SaaS app",
  "Explain this code architecture like I am onboarding today",
  "Turn my rough notes into a client-ready proposal",
  "Create a 7-day learning plan for full-stack AI apps",
];

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className="rounded-lg border border-violet-100 bg-white px-4 py-3 text-left text-sm font-medium leading-6 text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
