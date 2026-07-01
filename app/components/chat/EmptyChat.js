import SuggestedPrompts from "@/app/components/chat/SuggestedPrompts";

export default function EmptyChat({ onPromptSelect }) {
  return (
    <div className="mx-auto flex min-h-[48vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-lg bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-600/25">
        AI
      </div>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        Start a conversation
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
        Ask for strategy, writing, code help, research synthesis, or a second
        brain for whatever you are building next.
      </p>
      <div className="mt-8 w-full">
        <SuggestedPrompts onSelect={onPromptSelect} />
      </div>
    </div>
  );
}
