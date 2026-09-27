import { IWorkout } from "@/types/workout.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuCheck, LuClock, LuFlame, LuStar, LuX } from "react-icons/lu";

interface IPlanWorkoutCardProps {
  workout: IWorkout;
  variant: "plan" | "saved";
  isDone?: boolean;
  onToggleDone?: (id: number) => void;
  onRemove: (id: number) => void;
}

const PlanWorkoutCard = ({
  workout,
  variant,
  isDone,
  onToggleDone,
  onRemove,
}: IPlanWorkoutCardProps) => {
  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center ${
        isDone ? "opacity-50" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-surface-2 sm:h-20 sm:w-28">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-display text-base tracking-wide text-white uppercase">
          {workout.name}
        </h3>

        <p className="mt-0.5 text-sm text-muted">{workout.equipment}</p>

        <div className="mt-2 flex items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <LuClock className="text-accent" size={14} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <LuFlame className="text-accent" size={14} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <LuStar className="text-accent" size={14} />
            {workout.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold tracking-wide text-white hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {variant === "plan" && onToggleDone && (
          <button
            onClick={() => onToggleDone(workout.id)}
            aria-label="Mark as done"
            className={`flex items-center justify-center rounded-full border p-2 transition-colors ${
              isDone
                ? "border-accent bg-accent text-ink"
                : "border-line text-white hover:border-accent hover:text-accent"
            }`}
          >
            <LuCheck size={14} />
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id)}
          aria-label="Remove"
          className="flex items-center justify-center rounded-full border border-line p-2 text-white hover:border-red-500 hover:text-red-500"
        >
          <LuX size={14} />
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;