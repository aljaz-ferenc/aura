"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { MusicElement } from "@/app/types";
import {
  CHORD_OPTIONS,
  INTERVAL_OPTIONS,
  SCALE_OPTIONS,
} from "@/lib/constants/asnwersOptions";
import { Chord } from "@/lib/engine/Chord";
import { Interval } from "@/lib/engine/Interval";
import { Scale } from "@/lib/engine/Scale";

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

export function useExercise() {
  const { category, exercise } = useParams();
  const [currentElement, setCurrentElement] = useState<{
    element: MusicElement;
    label: string;
  } | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean | null>(
    null,
  );
  const [history, setHistory] = useState<
    { elementLabel: string; wasGuessCorrect: boolean; guessedLabel: string }[]
  >([]);

  const [endSessionDialogIsOpen, setEndSessionDialogIsOpen] = useState(false);

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

  function onNextRound() {
    initElement();
    setGuessedCorrectly(null);
  }

  function onRepeat() {
    if (currentElement?.element) {
      currentElement.element.play();
    }
  }

  const onGuess = (guessedLabel: string) => {
    if (!currentElement) {
      return;
    }

    const wasGuessCorrect = guessedLabel === currentElement.label;

    setGuessedCorrectly(wasGuessCorrect);
    setHistory((prev) => [
      ...prev,
      {
        elementLabel: currentElement.label,
        wasGuessCorrect,
        guessedLabel,
      },
    ]);
  };

  useEffect(() => {
    if (!currentElement?.element) {
      initElement();
    } else {
      currentElement.element.play();
    }
  }, [currentElement?.element, initElement]);

  return {
    currentElement,
    guessedCorrectly,
    setGuessedCorrectly,
    history,
    setHistory,
    endSessionDialogIsOpen,
    setEndSessionDialogIsOpen,
    ElementClass,
    selectedLabels,
    onNextRound,
    onRepeat,
    answerOptions,
    category,
    initElement,
    onGuess,
  };
}
