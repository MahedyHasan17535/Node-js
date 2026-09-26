"use client";

import PlanWorkoutCard from "@/components/shared/PlanWorkoutCard";
import { PLAN_CAP, PlanContext } from "@/context/PlanContext";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { LuArrowRight, LuDumbbell } from "react-icons/lu";
import { toast } from "react-toastify";

type TTab = "plan" | "saved";

const MyPlanPage = () => {
  const {
    todaysPlan,
    saved,
    doneIds,
    isHydrated,
    removeFromPlan,
    removeFromSaved,
    toggleDone,
  } = useContext(PlanContext);

  const [activeTab, setActiveTab] = useState<TTab>("plan");

  const totalMinutes = todaysPlan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = todaysPlan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0,
  );

  const handleToggleDone = (id: number) => {
    const workout = todaysPlan.find((item) => item.id === id);
    toggleDone(id);

    if (workout) {
      const wasDone = doneIds.includes(id);
      toast.success(
        wasDone
          ? `"${workout.name}" moved back to in-progress`
          : `"${workout.name}" marked as done`,
      );
    }
  };

  const handleRemove = (tab: TTab, id: number) => {
    const source = tab === "plan" ? todaysPlan : saved;
    const workout = source.find((item) => item.id === id);

    if (tab === "plan") {
      removeFromPlan(id);
    } else {
      removeFromSaved(id);
    }

    if (workout) {
      toast.info(`Removed "${workout.name}"`);
    }
  };

  const activeList = activeTab === "plan" ? todaysPlan : saved;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl tracking-wide text-white uppercase md:text-4xl">
          My Plan
        </h1>
        <p className="mt-2 text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <p className="font-display text-3xl text-accent">
            {todaysPlan.length}
          </p>
          <p className="mt-1 text-xs tracking-widest text-muted uppercase">
            Exercises
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <p className="font-display text-3xl text-accent">{totalMinutes}</p>
          <p className="mt-1 text-xs tracking-widest text-muted uppercase">
            Minutes
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 text-center">
          <p className="font-display text-3xl text-accent">{totalCalories}</p>
          <p className="mt-1 text-xs tracking-widest text-muted uppercase">
            Calories
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-line">
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-3 font-display text-sm tracking-widest uppercase transition-colors ${
            activeTab === "plan"
              ? "border-b-2 border-accent text-accent"
              : "text-muted hover:text-white"
          }`}
        >
          Today&apos;s Plan ({todaysPlan.length}/{PLAN_CAP})
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-3 font-display text-sm tracking-widest uppercase transition-colors ${
            activeTab === "saved"
              ? "border-b-2 border-accent text-accent"
              : "text-muted hover:text-white"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* List */}
      {!isHydrated ? (
        <p className="py-16 text-center text-muted">Loading workouts…</p>
      ) : activeList.length > 0 ? (
        <div className="space-y-4">
          {activeList.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              variant={activeTab}
              isDone={activeTab === "plan" ? doneIds.includes(workout.id) : undefined}
              onToggleDone={activeTab === "plan" ? handleToggleDone : undefined}
              onRemove={(id) => handleRemove(activeTab, id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface py-20 text-center">
          <LuDumbbell className="text-accent" size={32} />

          <h2 className="font-display text-xl tracking-wide text-white uppercase">
            Nothing here yet
          </h2>

          <p className="max-w-xs text-muted">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-display text-sm tracking-widest text-ink uppercase transition-transform hover:scale-[1.03]"
          >
            Go to workouts
            <LuArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPlanPage;