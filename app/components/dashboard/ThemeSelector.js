"use client";

import { useEffect, useState } from "react";

import SectionTitle from "@/app/components/dashboard/SectionTitle";

const STORAGE_KEY = "nexlab-theme";
const themes = ["light", "system", "dark"];

function applyTheme(theme) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = theme === "dark" || (theme === "system" && systemDark);

  root.dataset.theme = theme;
  root.classList.toggle("dark", useDark);
}

export default function ThemeSelector() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme = themes.includes(savedTheme) ? savedTheme : "system";
    applyTheme(initialTheme);
    const timer = window.setTimeout(() => setTheme(initialTheme), 0);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentTheme = localStorage.getItem(STORAGE_KEY) || "system";
      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleSystemChange);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener("change", handleSystemChange);
    };
  }, []);

  function handleThemeChange(nextTheme) {
    setTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <SectionTitle
        title="Theme"
        description="Choose how NexLab AI appears on this browser."
      />
      <div className="mt-6 grid gap-3">
        {themes.map((item) => {
          const isActive = item === theme;
          const label = item[0].toUpperCase() + item.slice(1);

          return (
            <button
              key={item}
              type="button"
              onClick={() => handleThemeChange(item)}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "border-violet-300 bg-violet-50 text-violet-800 ring-4 ring-violet-100"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
