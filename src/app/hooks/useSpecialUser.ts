"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "calc-special-user";
const SECRET_CODE = "kingcode99IsTheBest";

export function useSpecialUser() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const tryUnlock = (code: string): boolean => {
    if (code.trim() === SECRET_CODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      setUnlocked(true);
      return true;
    }
    return false;
  };

  const lock = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUnlocked(false);
  };

  return { unlocked, tryUnlock, lock };
}
