"use client";

import { useEffect, useRef, useState } from "react";
import { FiSend, FiSquare } from "react-icons/fi";

export default function ChatInput({
  onSend,
  onStop,
  disabled = false,
  isSending = false,
  value,
  onChange,
}) {
  const [internalValue, setInternalValue] = useState("");
  const textareaRef = useRef(null);
  const currentValue = value ?? internalValue;
  const setCurrentValue = onChange ?? setInternalValue;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [currentValue]);

  function submit() {
    const message = currentValue.trim();

    if (!message || disabled || isSending) {
      return;
    }

    onSend(message);
    setCurrentValue("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-sm focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          placeholder="Message NexLab AI"
          className="max-h-44 min-h-11 flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={isSending ? onStop : submit}
          disabled={isSending ? false : disabled || !currentValue.trim()}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white transition disabled:cursor-not-allowed disabled:bg-slate-300 ${
            isSending
              ? "bg-rose-600 hover:bg-rose-700"
              : "bg-violet-600 hover:bg-violet-700"
          }`}
          aria-label={isSending ? "Stop generating" : "Send message"}
          title={isSending ? "Stop" : "Send"}
        >
          {isSending ? <FiSquare /> : <FiSend />}
        </button>
      </div>
    </div>
  );
}
