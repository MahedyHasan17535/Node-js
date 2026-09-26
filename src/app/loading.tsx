import React from "react";

const HomeLoading = () => {
  return (
    <div>
      {/* Banner skeleton */}
      <section className="border-b border-line px-4 py-16 md:py-24">
        <div className="container mx-auto grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-6 w-40 animate-pulse rounded-full bg-surface-2" />
            <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-surface-2" />
            <div className="h-4 w-full max-w-sm animate-pulse rounded bg-surface-2" />
            <div className="h-11 w-48 animate-pulse rounded-full bg-surface-2" />
          </div>
          <div className="mx-auto h-64 w-full max-w-sm animate-pulse rounded-3xl bg-surface-2" />
        </div>
      </section>

      {/* Library grid skeleton */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto mb-10 h-8 w-56 animate-pulse rounded bg-surface-2" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-2xl border border-line bg-surface"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeLoading;