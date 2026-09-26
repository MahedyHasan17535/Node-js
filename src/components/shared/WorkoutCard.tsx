import { IWorkout } from "@/types/workout.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuClock, LuFlame, LuStar } from "react-icons/lu";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/60"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-muted uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg leading-tight tracking-wide text-white uppercase">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-sm text-muted">{workout.equipment}</p>

        {/* Stats Row */}
        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3 text-sm text-muted">
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
    </Link>
  );
};

export default WorkoutCard;