"use client";
import Calculator from "./views/calculator";
import Navbar from "./views/navbar";

export default function VerseCalculator() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col gap-8 items-center sm:items-start p-4 sm:p-8">
        <Calculator />

        <div className="fixed bottom-3 right-3 group cursor-help z-10">
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            💬 Need help?
          </div>
          <div className="absolute bottom-6 right-0 hidden group-hover:block bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-xs p-3 rounded-lg shadow-xl w-44 border border-gray-200 dark:border-gray-700">
            If there&apos;s a wrong value, DM me on Discord:
            <span className="font-semibold block mt-2 text-blue-600 dark:text-blue-400">
              kingcode99
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
