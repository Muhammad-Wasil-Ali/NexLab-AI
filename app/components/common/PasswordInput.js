"use client";

import { useState } from "react";

export default function PasswordInput({
  label,
  id,
  className = "",
  inputClassName = "",
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={id}
          type={isVisible ? "text" : "password"}
          className={`h-11 w-full rounded-lg border border-slate-200 bg-white px-3 pr-20 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100 ${inputClassName}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute inset-y-1 right-1 rounded-md px-3 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
