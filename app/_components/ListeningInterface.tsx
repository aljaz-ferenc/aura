"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import InterfaceAnswerOptions from "@/app/_components/InterfaceAnswerOptions";
import InterfaceNavigation from "@/app/_components/InterfaceNavigation";
import InterfaceScore from "@/app/_components/InterfaceScore";
import InterfaceLayout from "@/app/_components/layouts/InterfaceLayout";
import { NotationRenderer } from "@/app/_components/NotationRenderer";
import { Scale } from "@/lib/engine/Scale";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

export default function ListeningInterface() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const exercise = searchParams.get("exercise");
  const { guessedCorrectly, currentElement, initStore, status, resetStore } =
    useExerciseStore(useShallow((state) => state));

  useEffect(() => {
    if (!category || !exercise) return;
    initStore(category, exercise);

    return () => resetStore();
  }, [category, exercise, initStore, resetStore]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <InterfaceLayout
      instructions={`Listen to the ${category} and select the correct type from the options.`}
      title={`Identify the ${category}`}
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
