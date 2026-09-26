import React from "react";

const WorkoutDetailsLoading = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-10 overflow-hidden rounded-3xl border border-line bg-surface lg:grid-cols-2">
        <div className="h-72 animate-pulse bg-surface-2 lg:h-full lg:min-h-[560px]" />

        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="h-5 w-32 animate-pulse rounded-full bg-surface-2" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-surface-2" />
          <div className="h-20 w-full animate-pulse rounded bg-surface-2" />
          <div className="h-28 w-full animate-pulse rounded-2xl bg-surface-2" />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsLoading;