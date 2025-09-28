"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { ChordDisplay } from "@/app/_components/ChordDisplay";
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

  const groups = useMemo(() => {
    if (!answerOptions || answerOptions.length === 0) return [];
    return Object.groupBy(answerOptions, (option) => option.category);
  }, [answerOptions]);

  return (
    <div className="flex flex-col mt-5">
      {groups &&
        Object.entries(groups).map(([group, options]) => {
          return (
            <div key={group}>
              <hr className="my-5" />
              <h4 className="uppercase text-sm font-bold text-muted-foreground mb-2">
                {group}
              </h4>
              <div className="flex flex-wrap gap-3">
                {options?.map((option) => (
                  <button
                    key={option.symbol}
                    type="button"
                    className={cn([
                      "cursor-pointer group w-3xs",
                      category === "scales" && "capitalize",
                    ])}
                    onClick={() => onGuess(option.symbol)}
                    disabled={guessedCorrectly !== null || status !== "playing"}
                  >
                    <Card
                      className={cn([
                        "transition-colors border-none",
                        guessedCorrectly === null &&
                          "group-hover:bg-secondary ",
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
                      <CardContent className=" border-none flex flex-col">
                        <span>
                          {category === "chords" ? (
                            <ChordDisplay symbol={option.symbol} />
                          ) : (
                            option.symbol
                          )}
                        </span>
                        {category !== "scales" && category !== "chords" && (
                          <span className="text-xs text-muted-foreground font-normal lowercase">
                            {option.fullName}
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
}
