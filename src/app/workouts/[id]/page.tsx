import AddToPlanButton from "@/components/workoutDetails/AddToPlanButton";
import SaveButton from "@/components/workoutDetails/SaveButton";
import { IWorkout } from "@/types/workout.type";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { LuFlame, LuStar, LuTimer } from "react-icons/lu";

const getWorkouts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FITLOG_API}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching workouts data:", error);
    return [];
  }
};

interface IWorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const specRows = (workout: IWorkout) => [
  { label: "Equipment", value: workout.equipment },
  { label: "Difficulty", value: workout.difficulty },
  { label: "Sets", value: workout.sets },
  { label: "Reps", value: workout.reps },
  { label: "Duration", value: `${workout.duration} min` },
  { label: "Calories", value: `${workout.caloriesBurned} kcal` },
  { label: "Rating", value: workout.rating },
];

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const workouts = await getWorkouts();
  const workout = workouts.find((item: IWorkout) => String(item.id) === String(id));

  if (!workout) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-10 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
        {/* Visual */}
        <div className="relative h-72 bg-surface-2 lg:h-full lg:min-h-[560px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs font-semibold tracking-wide text-accent uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl leading-tight tracking-wide text-white uppercase md:text-4xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="leading-7 text-muted">{workout.description}</p>

          {/* Quick stats */}
          <div className="flex items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <LuTimer className="text-accent" size={16} />
              {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <LuFlame className="text-accent" size={16} />
              {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5">
              <LuStar className="text-accent" size={16} />
              {workout.rating} / 5.0
            </span>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface-2 p-5 sm:grid-cols-4">
            {specRows(workout).map((row) => (
              <div key={row.label}>
                <p className="text-xs tracking-wide text-muted uppercase">
                  {row.label}
                </p>
                <p className="mt-1 font-semibold text-white">{row.value}</p>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div>
            <h2 className="font-display text-lg tracking-wide text-white uppercase">
              Instructions
            </h2>

            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step: string, index: number) => (
                <li key={index} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
                    {index + 1}
                  </span>
                  <span className="leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <AddToPlanButton workout={workout} />
            <SaveButton workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;