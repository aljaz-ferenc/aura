"use client";

import { Check, Repeat, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IntervalRenderer } from "@/app/practice/intervals/_components/IntervalRenderer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Interval } from "@/lib/engine/Interval";
import { cn } from "@/lib/utils";

const INTERVAL_OPTIONS = [
  // Simple Intervals (Up to Octave)
  { symbol: "P1", fullName: "Perfect Unison", category: "perfect" },
  { symbol: "m2", fullName: "Minor Second", category: "minor" },
  { symbol: "M2", fullName: "Major Second", category: "major" },
  { symbol: "m3", fullName: "Minor Third", category: "minor" },
  { symbol: "M3", fullName: "Major Third", category: "major" },
  { symbol: "P4", fullName: "Perfect Fourth", category: "perfect" },
  { symbol: "A4", fullName: "Augmented Fourth", category: "augmented" },
  { symbol: "P5", fullName: "Perfect Fifth", category: "perfect" },
  { symbol: "m6", fullName: "Minor Sixth", category: "minor" },
  { symbol: "M6", fullName: "Major Sixth", category: "major" },
  { symbol: "m7", fullName: "Minor Seventh", category: "minor" },
  { symbol: "M7", fullName: "Major Seventh", category: "major" },
  { symbol: "P8", fullName: "Perfect Octave", category: "perfect" },

  // Compound Intervals (9th to 15th)
  // { symbol: "m9", fullName: "Minor Ninth", category: "minor" },
  // { symbol: "M9", fullName: "Major Ninth", category: "major" },
  // { symbol: "m10", fullName: "Minor Tenth", category: "minor" },
  // { symbol: "M10", fullName: "Major Tenth", category: "major" },
  // { symbol: "P11", fullName: "Perfect Eleventh", category: "perfect" },
  // { symbol: "A11", fullName: "Augmented Eleventh", category: "augmented" },
  // { symbol: "P12", fullName: "Perfect Twelfth", category: "perfect" },
  // { symbol: "m13", fullName: "Minor Thirteenth", category: "minor" },
  // { symbol: "M13", fullName: "Major Thirteenth", category: "major" },
  // { symbol: "m14", fullName: "Minor Fourteenth", category: "minor" },
  // { symbol: "M14", fullName: "Major Fourteenth", category: "major" },
  // { symbol: "P15", fullName: "Perfect Fifteenth", category: "perfect" },
] as const;

const selectedIntervalsLabels = INTERVAL_OPTIONS.map((option) => option.symbol);

export default function IntervalsPage() {
  const [currentInterval, setCurrentInterval] = useState<{
    interval: Interval;
    label: string;
  }>(Interval.random(selectedIntervalsLabels));
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [history, setHistory] = useState<
    { intervalLabel: string; wasGuessCorrect: boolean; guessedLabel: string }[]
  >([]);

  function onGuess(guessedLabel: string) {
    const wasGuessCorrect = guessedLabel === currentInterval.label;
    setGuessedCorrectly(wasGuessCorrect);
    setHistory((prev) => [
      ...prev,
      {
        intervalLabel: currentInterval.label,
        wasGuessCorrect: wasGuessCorrect,
        guessedLabel,
      },
    ]);
  }

  useEffect(() => {
    currentInterval.interval.play();
  }, [currentInterval]);

  function onNextRound() {
    setCurrentInterval(Interval.random(selectedIntervalsLabels));
    setGuessedCorrectly(null);
  }

  return (
    <main className="container mx-auto">
      {/*<div className="flex w-full border-b border-border mx-auto mb-16">*/}
      {/*  <div className="mx-auto">*/}
      {/*    {INTERVAL_MODES.map((m) => (*/}
      {/*      <Button*/}
      {/*        variant="ghost"*/}
      {/*        key={m.value}*/}
      {/*        className={cn([*/}
      {/*          "text-muted-foreground hover:text-primary border-b-2 rounded-none border-transparent cursor-pointer",*/}
      {/*          m.value === mode && "text-primary border-primary",*/}
      {/*        ])}*/}
      {/*        onClick={() => setMode(m.value)}*/}
      {/*      >*/}
      {/*        <div className="flex items-center gap-1">*/}
      {/*          <span>{m.icon}</span>*/}
      {/*          <span>{m.label}</span>*/}
      {/*        </div>*/}
      {/*      </Button>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="text-center">
        <h3 className="text-4xl font-bold">Identify the Interval</h3>
        <p className="text-muted-foreground mt-3">
          Listen to the interval and select the correct type from the options.
        </p>
      </div>
      {guessedCorrectly === null && (
        <Button
          className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 mx-auto my-10"
          onClick={() => currentInterval.interval.play()}
        >
          <Volume2 size={50} className="!h-20" />
          <span>Play Again</span>
        </Button>
      )}
      {guessedCorrectly !== null && (
        <div className="flex justify-center gap-3 items-center">
          <Button
            className="text-primary rounded-full border-none outline-none shadow-sm bg-white hover:!bg-primary cursor-pointer hover:text-white"
            variant="outline"
            onClick={() => currentInterval.interval.play()}
          >
            <Repeat />
            Repeat Interval
          </Button>
          <Button
            className="rounded-full !px-14 py-8 text-lg font-bold cursor-pointer flex gap-2 my-10 mx-0"
            onClick={onNextRound}
          >
            Next Interval <SkipForward />
          </Button>
          <Button
            className="text-green-500 rounded-full border-none outline-none shadow-sm bg-white hover:bg-green-500 cursor-pointer hover:text-white"
            variant="outline"
          >
            <Check />
            End Practice
          </Button>
        </div>
      )}
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
        <IntervalRenderer
          interval={currentInterval.interval}
          show={guessedCorrectly !== null}
          className={cn(["bg-white rounded-md"])}
        />
      </div>
      <div className="grid grid-cols-4 gap-3 place-items-stretch text-center mt-5">
        {INTERVAL_OPTIONS.map((option) => (
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
                option.symbol === history.at(-1)?.intervalLabel &&
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
                <span className="text-xs text-muted-foreground font-normal lowercase">
                  {option.fullName}
                </span>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </main>
  );
}
