import Image from "next/image";
import React from "react";
import bannerImg from "@/assets/banner.png";
import { LuArrowRight } from "react-icons/lu";

const Banner = () => {
  return (
    <section className="border-b border-line px-4 py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 md:grid-cols-2">
        {/* Content */}
        <div className="space-y-6 text-center md:text-left">
          <span className="inline-block rounded-full border border-line px-4 py-1.5 text-xs font-semibold tracking-widest text-accent uppercase">
            Workout Library
          </span>

          <h1 className="font-display text-4xl leading-[1.05] tracking-wide text-white uppercase md:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mx-auto max-w-md text-base leading-7 text-muted md:mx-0 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="flex justify-center md:justify-start">
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-display text-sm tracking-widest text-ink uppercase transition-transform hover:scale-[1.03]"
            >
              Browse Workouts
              <LuArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center">
          <div className="absolute h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
            <Image
              src={bannerImg}
              alt="Athlete training on a gym machine"
              priority
              className="h-auto w-full max-w-sm object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;