"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import InterfaceNavigation from "@/app/_components/InterfaceNavigation";
import InterfaceScore from "@/app/_components/InterfaceScore";
import LoadingPage from "@/app/_components/LoadingPage";
import InterfaceLayout from "@/app/_components/layouts/InterfaceLayout";
import { NotationRenderer } from "@/app/_components/NotationRenderer";
import type { ExerciseCategory, ExerciseType } from "@/app/types";
import { Interval } from "@/lib/engine/Interval";
import { Scale } from "@/lib/engine/Scale";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

const headerText: Record<
  ExerciseCategory,
  { title: string; instructions: string }
> = {
  intervals: {
    title: "Sing the INTERVAL",
    instructions:
      "Listen to the first note and sing the correct interval. Click Check to hear the answer.",
  },
  chords: {
    title: "Sing the CHORD",
    instructions:
      "Listen to the first note and sing the correct chord. Click Check to hear the answer.",
  },
  scales: {
    title: "Sing the SCALE",
    instructions:
      "Listen to the first note and sing the correct scale. Click Check to hear the answer.",
  },
  rhythm: {
    title: "Sing the RHYTHM",
    instructions:
      "Listen to the first note and sing the correct rhythm. Click Check to hear the answer.",
  },
};

export default function SingingInterface() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const exercise = searchParams.get("exercise");
  const { currentElement, initStore, status, resetStore } = useExerciseStore(
    useShallow((state) => state),
  );

  useEffect(() => {
    if (!category || !exercise) return;
    initStore(category as ExerciseCategory, exercise as ExerciseType);

    return () => resetStore();
  }, [category, exercise, initStore, resetStore]);

  if (status === "loading") {
    return <LoadingPage />;
  }

  return (
    <InterfaceLayout
      instructions={
        headerText[category as ExerciseCategory]?.instructions || ""
      }
      title={headerText[category as ExerciseCategory]?.title || ""}
    >
      <InterfaceNavigation />
      <InterfaceScore />
      {currentElement && (
        <NotationRenderer
          mode={
            currentElement.element instanceof Scale ? "melodic" : "harmonic"
          }
          element={
            status === "playing"
              ? new Interval([currentElement.element.notes[0]])
              : currentElement.element
          }
          show={status !== "ready"}
          className={cn(["bg-white rounded-md"])}
        />
      )}
    </InterfaceLayout>
  );
}
