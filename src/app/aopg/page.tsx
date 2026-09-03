"use client";
import Calculator from "./views/calculator";
import GenericTable from "./views/table";
import { useState } from "react";
import AccessorySelector from "./views/accselector";
import BuffSelector, { BuffCategory } from "./views/buffselector";
import MoveSelector, { MoveCategory } from "./views/moveselector";
import Navbar from "./views/navbar";
import {
  type Accessories,
  headAccData,
  topAccData,
  armAccData,
  backAccData,
  waistAccData,
  legsAccData,
} from "./data/accessories";
import { titleBuffsData, raceBuffsData } from "./data/buffs/passive";
import {
  armamentActiveBuffs,
  blacksmithActiveBuffs,
  conquerorsActiveBuffs,
  fightingActiveBuffs,
  fruitActiveBuffs,
  giantActiveBuffs,
  gunActiveBuffs,
  suitActiveBuffs,
  supportActiveBuffs,
  swordActiveBuffs,
} from "./data/buffs/active";
import {
  devilFruitMoveDamage,
  fightingStyleMoveDamage,
  gunStyleMoveDamage,
  hakiMoveDamage,
  supportStyleMoveDamage,
  swordStyleMoveDamage,
  getMoveTotal,
} from "./data/moves";

type Page = "build" | "accessory" | "buff" | "move";

const accessoryDataMap = {
  head: headAccData,
  top: topAccData,
  arm: armAccData,
  back: backAccData,
  waist: waistAccData,
  legs: legsAccData,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buffDataMap: Record<BuffCategory, any[]> = {
  title: titleBuffsData,
  race: raceBuffsData,
  fruit: fruitActiveBuffs,
  fighting: fightingActiveBuffs,
  gun: gunActiveBuffs,
  sword: swordActiveBuffs,
  armament: armamentActiveBuffs,
  conqueror: conquerorsActiveBuffs,
  blacksmith: blacksmithActiveBuffs,
  giant: giantActiveBuffs,
  suit: suitActiveBuffs,
  support: supportActiveBuffs,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moveDataMap: Record<MoveCategory, any[]> = {
  fighting: fightingStyleMoveDamage,
  sword: swordStyleMoveDamage,
  gun: gunStyleMoveDamage,
  support: supportStyleMoveDamage,
  fruit: devilFruitMoveDamage,
  haki: hakiMoveDamage,
};

export default function AopgCalculator() {
  const [currentPage, setCurrentPage] = useState<Page>("build");
  const [accessorySelected, setAccessorySelected] = useState<
    "head" | "top" | "arm" | "back" | "waist" | "legs"
  >("head");
  const [buffSelected, setBuffSelected] = useState<BuffCategory>("title");
  const [moveSelected, setMoveSelected] = useState<MoveCategory>("support");
  const getAccessoryData = () =>
    accessoryDataMap[accessorySelected]?.filter((buff) => buff.id !== 0) ?? [];
  const getBuffData = () =>
    buffDataMap[buffSelected]?.filter((buff) => buff.id !== 0) ?? [];
  const getMoveData = () =>
    (moveDataMap[moveSelected] ?? [])
      .filter(
        (move) =>
          !move.name?.toLowerCase().includes("title") &&
          !move.name?.toLowerCase().includes("copying the dishonored one") &&
          !move.name?.toLowerCase().includes("student of the strongest one"),
      )
      .map((move) => ({
        ...move,
        total: getMoveTotal(move),
      }))
      .sort((a, b) => b.total - a.total);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navbar */}
      <Navbar
        selected={currentPage}
        onSelect={(page) => setCurrentPage(page as Page)}
      />

      <main className="flex flex-col gap-8 items-center sm:items-start p-4 sm:p-8">
        {currentPage === "build" && <Calculator />}

        {currentPage === "accessory" && (
          <>
            <AccessorySelector
              selected={accessorySelected}
              onSelect={setAccessorySelected}
            />
            <GenericTable<Accessories> data={getAccessoryData()} />
          </>
        )}

        {currentPage === "buff" && (
          <>
            <BuffSelector selected={buffSelected} onSelect={setBuffSelected} />
            <GenericTable data={getBuffData()} />
          </>
        )}

        {currentPage === "move" && (
          <>
            <MoveSelector selected={moveSelected} onSelect={setMoveSelected} />
            <GenericTable data={getMoveData()} />
          </>
        )}

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
