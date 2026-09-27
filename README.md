FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts, drop them into today's plan or save them for later, and watch your exercises, minutes, and calories add up in real time.

Live Link: add your deployed URL here GitHub Repository Link: https://github.com/MahedyHasan17535/Node-js

Description

FitLog helps you plan and track your daily workouts without the clutter of a full fitness-tracking app. Browse a curated library of twelve exercises covering every major muscle group, view full instructions and stats for each lift, and build out a capped five-exercise plan for the day. Mark lifts as done as you complete them, save others for later, and everything persists across page reloads thanks to localStorage — no sign-up, no backend database, just a fast, focused workout companion.

Technologies Used
Next.js 16 (App Router) — routing, server components, and data fetching
React 19 — UI and client-side state
TypeScript — type safety across components, context, and API data
Tailwind CSS v4 — utility-first styling with a custom dark/neon design system
react-toastify — toast notifications for plan/save/done/remove actions
react-icons (Lucide set) — iconography throughout the UI
FitLog REST API — live workout data fetched at request time
Key Features
Full workout library — all twelve lifts from the FitLog API rendered as a responsive grid, each with a category tag, equipment line, and a duration / calories / rating stats row.
Live navbar badges — "Plan" and "Saved" pill counters in the navbar update instantly as workouts are added or removed, both linking to /my-plan.
Workout detail pages — a two-column layout with a full-bleed image, key-specs panel, and a numbered instructions list, plus "Add to today's plan" / "Save for later" actions with toast confirmations.
My Plan dashboard — live Exercises / Minutes / Calories summary cards, a Today's Plan vs. Saved tab view, and per-card "View Details", "Mark as Done", and remove actions.
Five-lift daily cap — "Add to today's plan" automatically disables once today's plan hits five workouts, preventing overload.
Sort and search — a "Sort By" dropdown (Duration / Calories / Rating) and a name-or-tag search box, both re-filtering the library grid live.
Persistent state — today's plan, saved list, and completed workouts are stored in localStorage, so your plan survives a page reload.
Polished edge cases — a custom 404 page, skeleton loading animations on the home and detail routes, and empty-state messaging when a list has nothing in it yet.
Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_FITLOG_API=https://api.api-store.workers.dev/api/fitlog
Project Structure
src/
  app/
    layout.tsx              # fonts, PlanProvider, Navbar/Footer, toasts
    page.tsx                # home: Banner + Library section
    loading.tsx              # home route skeleton
    not-found.tsx            # 404 page
    workouts/[id]/page.tsx   # workout detail page
    workouts/[id]/loading.tsx
    my-plan/page.tsx         # tabs, metrics, plan/saved lists
  components/
    shared/                  # Navbar, Footer, WorkoutCard, PlanWorkoutCard
    home/                    # Banner, LibrarySection, LibraryGrid, SortDropdown
    workoutDetails/          # AddToPlanButton, SaveButton
  context/PlanContext.tsx    # today's plan / saved state + localStorage sync
  types/workout.type.ts      # IWorkout interface
Getting Started
bash
git clone https://github.com/MahedyHasan17535/Node-js.git
cd Node-js
npm install
npm run dev

Open http://localhost:3000 to view the app.

API

Data comes from the FitLog API:

All workouts: https://api.api-store.workers.dev/api/fitlog
Single workout: https://api.api-store.workers.dev/api/fitlog/:id