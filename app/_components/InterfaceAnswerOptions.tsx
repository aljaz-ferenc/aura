"use client";

import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "@/components/ui/card";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

export default function InterfaceAnswerOptions() {
  const {
    answerOptions,
    guessedCorrectly,
    category,
    history,
    onGuess,
    status,
  } = useExerciseStore(useShallow((state) => state));

  return (
    <div className="grid grid-cols-4 gap-3 place-items-stretch text-center mt-5">
      {answerOptions?.map((option) => (
        <button
          key={option.symbol}
          type="button"
          className="cursor-pointer group"
          onClick={() => onGuess(option.symbol)}
          disabled={guessedCorrectly !== null || status !== "playing"}
        >
          <Card
            className={cn([
              "transition-colors border-none",
              guessedCorrectly === null && "group-hover:bg-secondary ",
              option.symbol === history.at(-1)?.elementLabel &&
                guessedCorrectly !== null &&
                "bg-green-300",

              option.symbol === history.at(-1)?.guessedLabel &&
                !history.at(-1)?.wasGuessCorrect &&
                guessedCorrectly !== null &&
                "bg-red-300",

              status !== "playing" &&
                "group-hover:!bg-white text-muted-foreground cursor-auto",
            ])}
          >
            <CardContent className="font-semibold border-none flex flex-col">
              <span>{option.symbol}</span>
              {category !== "scales" && (
                <span className="text-xs text-muted-foreground font-normal lowercase">
                  {option.fullName}
                </span>
              )}
            </CardContent>
          </Card>
        </button>
      ))}
    </div>
  );
}
