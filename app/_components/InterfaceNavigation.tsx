"use client";

import { Repeat, SkipForward } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import type { ExerciseCategory } from "@/app/types";
import { Button } from "@/components/ui/button";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

const buttonsText: Record<ExerciseCategory, any> = {
  intervals: {
    next: "Next Interval",
    repeat: "Repeat Interval",
  },
  chords: {
    next: "Next Chord",
    repeat: "Repeat Chord",
  },
  scales: {
    next: "Next Scale",
    repeat: "Repeat Scale",
  },
  rhythm: {
    next: "Next Rhythm",
    repeat: "Repeat Rhythm",
  },
};

export default function InterfaceNavigation() {
  const {
    onNextRound,
    guessedCorrectly,
    onRepeat,
    status,
    start,
    currentElement,
    category,
  } = useExerciseStore(useShallow((state) => state));

  return (
    <div className="flex flex-col justify-center gap-3 items-center">
      {(status === "ready" || status === "loading") && (
        <Button
          className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 mt-10 hover:bg-green-500/80 mx-0 bg-green-500"
          onClick={start}
          disabled={status === "loading"}
        >
          Start <SkipForward />
        </Button>
      )}
      {status === "playing" && (
        <div className="w-full text-center relative flex items-center justify-center mt-10">
          <Button
            className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 mx-0"
            onClick={onNextRound}
            disabled={guessedCorrectly === null}
          >
            {buttonsText[category as ExerciseCategory]?.next || ""}{" "}
            <SkipForward />
          </Button>
          {category && ["intervals", "chords"].includes(category) && (
            <Button
              onClick={() => currentElement?.element.play("melodic")}
              variant="outline"
              className="absolute rounded-full text-xs border-none bg-white cursor-pointer hover:bg-white hover:opacity-100 hover:text-primary opacity-80 top-1/2 -translate-y-1/2 right-0 text-primary"
            >
              Play sequentially
            </Button>
          )}
        </div>
      )}

      <Button
        className={cn([
          "text-primary rounded-full border-none outline-none shadow-sm bg-white hover:!bg-primary cursor-pointer hover:text-white",
        ])}
        variant="outline"
        onClick={onRepeat}
        disabled={status !== "playing"}
      >
        <Repeat />
        {buttonsText[category as ExerciseCategory]?.repeat || ""}
      </Button>
    </div>
  );
}
