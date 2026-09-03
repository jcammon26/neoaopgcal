"use client";
import Link from "next/link";
import UpdateModal from "./components/UpdateModal";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex flex-col gap-8 items-center p-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Citrus&apos;s Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Precision damage calculations for Roblox anime games
          </p>
        </div>

        <div className="flex gap-8 flex-wrap justify-center">
          {/* AOPG Calculator Card */}
          <Link href="/aopg">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-500 dark:hover:to-blue-700 transition-all duration-300 rounded-2xl p-8 w-80 h-64 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transform">
              <h2 className="text-4xl font-bold text-white mb-4">AOPG</h2>
              <p className="text-blue-50 text-center text-lg font-medium">
                A One Piece Game
              </p>
              <p className="text-blue-100 text-center text-sm mt-2">
                Damage Calculator
              </p>
              <div className="mt-6 text-sm text-blue-50 opacity-75">
                Click to enter →
              </div>
            </div>
          </Link>

          {/* Pirate Calculator Card */}
          <Link href="/pirate">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 dark:from-purple-600 dark:to-purple-800 dark:hover:from-purple-500 dark:hover:to-purple-700 transition-all duration-300 rounded-2xl p-8 w-80 h-64 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transform">
              <h2 className="text-4xl font-bold text-white mb-4">Pirate</h2>
              <p className="text-purple-50 text-center text-lg font-medium">
                Pirate Piece
              </p>
              <p className="text-purple-100 text-center text-sm mt-2">
                Damage Calculator
              </p>
              <div className="mt-6 text-sm text-purple-50 opacity-75">
                Click to enter →
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-gray-300 dark:border-gray-700 pt-8 w-full">
          <span className="text-sm text-gray-600 dark:text-gray-400 mb-4 block">
            Last updated: April 30, 2026
          </span>
          <UpdateModal
            updates={[
              {
                version: "v1.3.2.0 | AOPG",
                date: "April 30, 2026",
                changes: ["Add pirate piece calculator"],
              },
              {
                version: "v1.3.1.0 | AOPG",
                date: "April 19, 2026",
                changes: [
                  "Add vector damage",
                  "Add vector buff and accessories",
                ],
              },
              {
                version: "v1.3.0.0 | AOPG",
                date: "April 19, 2026",
                changes: [
                  "Add final dark/quake damage",
                  "Add final dark/quake buff and accessories",
                ],
              },
              {
                version: "v1.2.9.0 | AOPG",
                date: "April 13, 2026",
                changes: [
                  "Add ultimate slime damage",
                  "Add ultimate slime race, title and buff",
                ],
              },
              {
                version: "v1.2.8.0 | AOPG",
                date: "April 5, 2026",
                changes: [
                  "New design for the calculator",
                  "Add the DPS calculator for some styles",
                  "Add the gambler damage",
                  "Add the gambler accessories and buff",
                ],
              },
              {
                version: "v1.2.7.0 | Verse Piece",
                date: "March 29, 2026",
                changes: [
                  "Temporarily remove the damage calculator for Verse Piece",
                ],
              },
              {
                version: "v1.2.6.0 | AOPG",
                date: "March 29, 2026",
                changes: [
                  "Add heroic demon damage",
                  "Add heroic demon accessories and buff",
                ],
              },
              {
                version: "v1.2.5.0 | AOPG",
                date: "March 15, 2026",
                changes: [
                  "Add gravity v3 damage",
                  "Add gravity accessories and buff",
                ],
              },
              {
                version: "v1.2.4.0 | AOPG",
                date: "March 8, 2026",
                changes: [
                  "Add heian demon damage",
                  "Add heian accessories and buff",
                ],
              },
              {
                version: "v1.2.3.0 | Verse Piece",
                date: "March 1, 2026",
                changes: [
                  "Add scaling for damage calculator",
                  "Added few swords in moves",
                ],
              },
              {
                version: "v1.2.2.0 | AOPG",
                date: "March 1, 2026",
                changes: [
                  "Added new move called Ancient Elf + Elven Blood",
                  "Added new accessory, title, and buff.",
                ],
              },
              {
                version: "v1.2.1.0 | Verse Piece",
                date: "February 27, 2026",
                changes: ["Added Multiple Enchance Buff for damage"],
              },
              {
                version: "v1.2.0.0 | AOPG",
                date: "February 27, 2026",
                changes: [
                  "Added Love Fruit",
                  "Added Love Goddess",
                  "Added Yandere",
                ],
              },
              {
                version: "v1.1.9.0 | Verse Piece",
                date: "February 22, 2026",
                changes: [
                  "Enable the moves damage and table",
                  "Currently got the damage for Combat and Yuji",
                  "Will add the other moves damage soon",
                ],
              },
              {
                version: "v1.1.8.0 | Verse Piece",
                date: "February 17, 2026",
                changes: ["Added Yuta Update"],
              },
              {
                version: "v1.1.7.0 | Verse Piece",
                date: "February 8, 2026",
                changes: ["Added Chainsaw Update", "Added Black Clover"],
              },
              {
                version: "v1.1.6.0 | Verse Piece",
                date: "January 28, 2026",
                changes: [
                  "Added Race",
                  "Added Trait",
                  "Added Title",
                  "Added Haki",
                ],
              },
              {
                version: "v1.1.5.0 | Verse Piece",
                date: "January 27, 2026",
                changes: [
                  "Initial release",
                  "Added base stats calculator with 80,000 total cap",
                  "Added accessory selector with enhancement system",
                  "Added 78 accessories with increment values",
                ],
              },
              {
                version: "v1.1.4.0 | AOPG",
                date: "February 22, 2026",
                changes: [
                  "Updated the Suits Buff",
                  "Updated the Support Styles Buff",
                ],
              },
              {
                version: "v1.1.3.0 | AOPG",
                date: "February 17, 2026",
                changes: ["Added Yuta Update"],
              },
              {
                version: "v1.1.2.0 | AOPG",
                date: "February 8, 2026",
                changes: ["Added Shanks Update", "Added Imu's Update"],
              },
              {
                version: "v1.1.1.0 | AOPG",
                date: "January 27, 2026",
                changes: [
                  "Added Final Soul Damage",
                  "Added Final Soul Buff",
                  "Added new suit called Mother's Kimono",
                ],
              },
            ]}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Need help? DM me on Discord:{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              kingcode99
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
