import Link from "next/link";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

const NotFound = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-display text-7xl tracking-wide text-accent md:text-8xl">
        404
      </p>

      <h1 className="mt-4 font-display text-2xl tracking-wide text-white uppercase md:text-3xl">
        This lift isn&apos;t in the library
      </h1>

      <p className="mt-3 max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist. Head back and
        pick a workout instead.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-display text-sm tracking-widest text-ink uppercase transition-transform hover:scale-[1.03]"
      >
        Go to workouts
        <LuArrowRight size={16} />
      </Link>
    </div>
  );
};

export default NotFound;