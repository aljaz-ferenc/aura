"use client";

import { Repeat, SkipForward } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import EndSessionDialog from "@/app/_components/EndSessionDialog";
import { NotationRenderer } from "@/app/_components/NotationRenderer";
import type { ExerciseCategory, ExerciseType } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale } from "@/lib/engine/Scale";
import { useExerciseStore } from "@/lib/store/useExerciseStore";
import { cn } from "@/lib/utils/cn";

export default function ListeningExercisePage({
  category,
}: {
  category: ExerciseCategory;
  exercise: ExerciseType;
}) {
  const {
    currentElement,
    guessedCorrectly,
    history,
    onNextRound,
    onRepeat,
    answerOptions,
    setEndSessionDialogIsOpen,
    endSessionDialogIsOpen,
    onGuess,
  } = useExerciseStore(useShallow((state) => state));

  if (!currentElement) return;

  return (
    <main className="container mx-auto">
      <div className="text-center">
        <h3 className="text-4xl font-bold">Identify the {category}</h3>
        <p className="text-muted-foreground mt-3">
          Listen to the {category} and select the correct type from the options.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-3 items-center">
        <Button
          className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 mt-10 mx-0"
          onClick={onNextRound}
          disabled={guessedCorrectly === null}
        >
          Next Interval <SkipForward />
        </Button>

        <Button
          className="text-primary rounded-full border-none outline-none shadow-sm bg-white hover:!bg-primary cursor-pointer hover:text-white"
          variant="outline"
          onClick={onRepeat}
        >
          <Repeat />
          Repeat Interval
        </Button>
      </div>
      <div className="mb-2">
        <span className="text-muted-foreground">Score: </span>
        <span className="font-bold">
          {
            history
              .map((g) => g.wasGuessCorrect)
              .filter((wasCorrect) => Boolean(wasCorrect)).length
          }
          /{history.length}
        </span>
      </div>
      <div className={cn([""])}>
        <NotationRenderer
          mode={
            currentElement.element instanceof Scale ? "melodic" : "harmonic"
          }
          element={currentElement.element}
          show={guessedCorrectly !== null}
          className={cn(["bg-white rounded-md"])}
        />
      </div>
      <div className="grid grid-cols-4 gap-3 place-items-stretch text-center mt-5">
        {answerOptions.map((option) => (
          <button
            key={option.symbol}
            type="button"
            className="cursor-pointer group"
            onClick={() => onGuess(option.symbol)}
            disabled={guessedCorrectly !== null}
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
      <EndSessionDialog
        setEndSessionDialogIsOpen={setEndSessionDialogIsOpen}
        endSessionDialogIsOpen={endSessionDialogIsOpen}
      />
    </main>
  );
}
