import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PlanProvider from "@/context/PlanContext";
import { ToastContainer } from "react-toastify";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col font-sans antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          <ToastContainer theme="dark" position="bottom-right" />
        </PlanProvider>
      </body>
    </html>
  );
}