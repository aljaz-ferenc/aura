"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import InterfaceAnswerOptions from "@/app/_components/InterfaceAnswerOptions";
import InterfaceNavigation from "@/app/_components/InterfaceNavigation";
import InterfaceScore from "@/app/_components/InterfaceScore";
import LoadingPage from "@/app/_components/LoadingPage";
import InterfaceLayout from "@/app/_components/layouts/InterfaceLayout";
import { NotationRenderer } from "@/app/_components/NotationRenderer";
import type { ExerciseCategory, ExerciseType } from "@/app/types";
import { Scale } from "@/lib/engine/Scale";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

const headerText: Record<ExerciseCategory, any> = {
  intervals: {
    title: "Identify the INTERVAL",
    instructions:
      "Listen to the interval and select the correct type from the options.",
  },
  chords: {
    title: "Identify the CHORD",
    instructions:
      "Listen to the chord and select the correct type from the options.",
  },
  scales: {
    title: "Identify the SCALE",
    instructions:
      "Listen to the scale and select the correct type from the options.",
  },
  rhythm: {
    title: "Identify the RHYTHM",
    instructions:
      "Listen to the rhythm and select the correct type from the options.",
  },
};

export default function ListeningInterface() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const exercise = searchParams.get("exercise");
  const { guessedCorrectly, currentElement, initStore, status, resetStore } =
    useExerciseStore(useShallow((state) => state));

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
          element={currentElement.element}
          show={guessedCorrectly !== null}
          className={cn(["bg-white rounded-md"])}
        />
      )}
      <InterfaceAnswerOptions />
    </InterfaceLayout>
  );
}
