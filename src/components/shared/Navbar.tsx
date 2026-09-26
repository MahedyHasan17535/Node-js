"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import logo from "@/assets/logo.png";
import { PlanContext } from "@/context/PlanContext";

const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { todaysPlan, saved } = useContext(PlanContext);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={28} height={28} />
          <span className="font-display text-xl tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm tracking-widest uppercase transition-colors ${
                  isActive
                    ? "text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold tracking-wide text-ink"
          >
            Plan {todaysPlan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-line px-3 py-1.5 text-xs font-bold tracking-wide text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>

      {/* Mobile nav links */}
      <nav className="flex items-center justify-center gap-8 border-t border-line py-2 md:hidden">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-sm tracking-widest uppercase ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;