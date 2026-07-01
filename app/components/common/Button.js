"use client";

import Link from "next/link";

import Loader from "@/app/components/common/Loader";

export default function Button({
  children,
  className = "",
  isLoading = false,
  disabled = false,
  href,
  type = "button",
  variant = "primary",
  ...props
}) {
  const variants = {
    primary:
      "bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 focus-visible:outline-violet-600",
    secondary:
      "border border-violet-200 bg-white text-violet-700 hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-violet-500",
    ghost:
      "text-slate-600 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-violet-500",
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
