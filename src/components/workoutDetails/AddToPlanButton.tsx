"use client";

import { PLAN_CAP, PlanContext } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";
import React, { useContext } from "react";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";

const AddToPlanButton = ({ workout }: { workout: IWorkout }) => {
  const { todaysPlan, addToPlan } = useContext(PlanContext);

  const isFull = todaysPlan.length >= PLAN_CAP;
  const isAdded = todaysPlan.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      toast.success(`Added "${workout.name}" to today's plan`);
    } else if (isFull) {
      toast.error("Today's plan is full — remove a lift to add another.");
    }
  };

  return (
    <button
      onClick={handleAddToPlan}
      disabled={isFull || isAdded}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm tracking-widest text-ink uppercase transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
    >
      <LuPlus size={16} />
      {isAdded ? "In Today's Plan" : "Add to today's plan"}
    </button>
  );
};

export default AddToPlanButton;