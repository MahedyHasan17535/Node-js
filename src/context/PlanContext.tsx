"use client";

import { IWorkout } from "@/types/workout.type";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export const PLAN_CAP = 5;

interface IPlanContext {
  todaysPlan: IWorkout[];
  saved: IWorkout[];
  doneIds: number[];
  isHydrated: boolean;
  addToPlan: (workout: IWorkout) => boolean;
  addToSaved: (workout: IWorkout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => void;
}

export const PlanContext = createContext<IPlanContext>({
  todaysPlan: [],
  saved: [],
  doneIds: [],
  isHydrated: false,
  addToPlan: () => false,
  addToSaved: () => false,
  removeFromPlan: () => {},
  removeFromSaved: () => {},
  toggleDone: () => {},
});

const PLAN_STORAGE_KEY = "fitlog:todaysPlan";
const SAVED_STORAGE_KEY = "fitlog:saved";
const DONE_STORAGE_KEY = "fitlog:doneIds";

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // load persisted plan/saved data on first mount. This has to stay a
  // browser-only effect (not a lazy useState initializer) so the client's
  // first render matches the server-rendered, storage-less markup and
  // avoids a hydration mismatch.
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);
      const storedDone = localStorage.getItem(DONE_STORAGE_KEY);

      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read from an external store (localStorage) on mount, not a derived-state loop
      if (storedPlan) setTodaysPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDoneIds(JSON.parse(storedDone));
    } catch (error) {
      console.error("Error reading FitLog data from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // persist on every change, once hydrated (so we never overwrite saved
  // data with the initial empty state before the load effect above runs)
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(todaysPlan));
  }, [todaysPlan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(DONE_STORAGE_KEY, JSON.stringify(doneIds));
  }, [doneIds, isHydrated]);

  const addToPlan = (workout: IWorkout) => {
    if (todaysPlan.length >= PLAN_CAP) return false;
    if (todaysPlan.some((item) => item.id === workout.id)) return false;

    setTodaysPlan((prevPlan) => [...prevPlan, workout]);
    return true;
  };

  const addToSaved = (workout: IWorkout) => {
    if (saved.some((item) => item.id === workout.id)) return false;

    setSaved((prevSaved) => [...prevSaved, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setTodaysPlan((prevPlan) => prevPlan.filter((item) => item.id !== id));
    setDoneIds((prevDone) => prevDone.filter((doneId) => doneId !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prevSaved) => prevSaved.filter((item) => item.id !== id));
  };

  const toggleDone = (id: number) => {
    setDoneIds((prevDone) =>
      prevDone.includes(id)
        ? prevDone.filter((doneId) => doneId !== id)
        : [...prevDone, id],
    );
  };

  const sharedData = {
    todaysPlan,
    saved,
    doneIds,
    isHydrated,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  };

  return (
    <PlanContext.Provider value={sharedData}>{children}</PlanContext.Provider>
  );
};

export default PlanProvider;