import React from "react";
import LibraryGrid from "./LibraryGrid";

const getWorkouts = async () => {
  try {
    const response = await fetch("https://api.api-store.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching workouts data:", error);
    return [];
  }
};

const LibrarySection = async () => {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="container mx-auto scroll-mt-24 px-4 py-16">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl tracking-wide text-white uppercase md:text-4xl">
          The Library
        </h2>

        <p className="mt-2 text-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <LibraryGrid workouts={workouts} />
    </section>
  );
};

export default LibrarySection;