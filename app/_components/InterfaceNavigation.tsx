"use client";

import { Repeat, SkipForward } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

export default function InterfaceNavigation() {
  const { onNextRound, guessedCorrectly, onRepeat, status, start } =
    useExerciseStore(useShallow((state) => state));

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
        <Button
          className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 mt-10 mx-0"
          onClick={onNextRound}
          disabled={guessedCorrectly === null}
        >
          Next Interval <SkipForward />
        </Button>
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
        Repeat Interval
      </Button>
    </div>
  );
}
