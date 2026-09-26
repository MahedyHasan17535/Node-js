"use client";

import { PlanContext } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";
import React, { useContext } from "react";
import { LuBookmark } from "react-icons/lu";
import { toast } from "react-toastify";

const SaveButton = ({ workout }: { workout: IWorkout }) => {
  const { saved, addToSaved } = useContext(PlanContext);

  const isSaved = saved.some((item) => item.id === workout.id);

  const handleSave = () => {
    const wasAdded = addToSaved(workout);

    if (wasAdded) {
      toast.success(`Saved "${workout.name}" for later`);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaved}
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm tracking-widest text-white uppercase transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-white"
    >
      <LuBookmark size={16} />
      {isSaved ? "Saved" : "Save for later"}
    </button>
  );
};

export default SaveButton;