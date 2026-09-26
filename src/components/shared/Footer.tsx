import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:text-left">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm tracking-widest text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;