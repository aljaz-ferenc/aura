"use client";

import { Repeat, SkipForward } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import EndSessionDialog from "@/app/_components/EndSessionDialog";
import { NotationRenderer } from "@/app/play/_components/NotationRenderer";
import type { MusicElement } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CHORD_OPTIONS,
  INTERVAL_OPTIONS,
  SCALE_OPTIONS,
} from "@/lib/constants/asnwersOptions";
import { Chord } from "@/lib/engine/Chord";
import { Interval } from "@/lib/engine/Interval";
import { Scale } from "@/lib/engine/Scale";
import { cn } from "@/lib/utils/cn";

function getElementClass(category: string) {
  switch (category) {
    case "intervals":
      return Interval;
    case "chords":
      return Chord;
    case "scales":
      return Scale;
    default:
      return Interval;
  }
}

function getElementOptions(category: string) {
  switch (category) {
    case "intervals":
      return INTERVAL_OPTIONS;
    case "chords":
      return CHORD_OPTIONS;
    case "scales":
      return SCALE_OPTIONS;
    default:
      return INTERVAL_OPTIONS;
  }
}

export default function ListeningExercisePage() {
  const { category } = useParams();

  const [currentElement, setCurrentElement] = useState<{
    element: MusicElement;
    label: string;
  } | null>(null);

  const [endSessionDialogIsOpen, setEndSessionDialogIsOpen] = useState(false);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [history, setHistory] = useState<
    { elementLabel: string; wasGuessCorrect: boolean; guessedLabel: string }[]
  >([]);

  const ElementClass = useMemo(
    () => getElementClass(category as string),
    [category],
  );
  const answerOptions = useMemo(
    () => getElementOptions(category as string),
    [category],
  );
  const selectedLabels = useMemo(
    () => answerOptions.map((option) => option.symbol),
    [answerOptions],
  );

  const initElement = useCallback(() => {
    if (ElementClass && selectedLabels.length > 0) {
      setCurrentElement(ElementClass.random(selectedLabels));
    }
  }, [selectedLabels, ElementClass]);

  function onGuess(guessedLabel: string) {
    if (!currentElement) return;
    const wasGuessCorrect = guessedLabel === currentElement.label;
    setGuessedCorrectly(wasGuessCorrect);
    setHistory((prev) => [
      ...prev,
      {
        elementLabel: currentElement.label,
        wasGuessCorrect: wasGuessCorrect,
        guessedLabel,
      },
    ]);
  }

  useEffect(() => {
    if (!currentElement?.element) {
      initElement();
    } else {
      currentElement.element.play();
    }
  }, [currentElement, initElement]);

  function onNextRound() {
    initElement();
    setGuessedCorrectly(null);
  }

  function onRepeat() {
    if (currentElement?.element) {
      currentElement.element.play();
    }
  }

  if (!currentElement) {
    return <div>Loading...</div>;
  }

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
