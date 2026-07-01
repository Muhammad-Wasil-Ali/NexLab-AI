import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexLab AI",
  description: "Secure authentication module for NexLab AI.",
};

function ThemeScript() {
  const code = `
    (function () {
      try {
        var theme = localStorage.getItem("nexlab-theme") || "system";
        var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        var useDark = theme === "dark" || (theme === "system" && systemDark);
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle("dark", useDark);
      } catch (error) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-slate-50 text-slate-950">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
