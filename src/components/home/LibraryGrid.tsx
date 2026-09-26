"use client";

import { IWorkout } from "@/types/workout.type";
import React, { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import WorkoutCard from "@/components/shared/WorkoutCard";
import SortDropdown, { TSortOption } from "./SortDropdown";

interface ILibraryGridProps {
  workouts: IWorkout[];
}

const sortWorkouts = (workouts: IWorkout[], sortBy: TSortOption) => {
  const sorted = [...workouts];

  if (sortBy === "duration") {
    sorted.sort((a, b) => b.duration - a.duration);
  } else if (sortBy === "calories") {
    sorted.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  } else if (sortBy === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
};

const LibraryGrid = ({ workouts }: ILibraryGridProps) => {
  const [sortBy, setSortBy] = useState<TSortOption>("duration");
  const [search, setSearch] = useState("");

  const visibleWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = query
      ? workouts.filter(
          (workout) =>
            workout.name.toLowerCase().includes(query) ||
            workout.muscleGroups.some((tag) =>
              tag.toLowerCase().includes(query),
            ),
        )
      : workouts;

    return sortWorkouts(filtered, sortBy);
  }, [workouts, sortBy, search]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex items-center">
          <LuSearch className="pointer-events-none absolute left-3.5 text-muted" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or tag"
            className="w-full rounded-full border border-line bg-surface py-2 pr-4 pl-10 text-sm text-white placeholder:text-muted outline-none focus:border-accent sm:w-64"
          />
        </label>

        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Grid */}
      {visibleWorkouts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">
          No workouts match your search.
        </p>
      )}
    </div>
  );
};

export default LibraryGrid;