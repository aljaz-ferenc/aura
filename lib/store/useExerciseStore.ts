import { create } from "zustand";
import type {
  AnswerOption,
  ExerciseCategory,
  ExerciseType,
  MusicElement,
  SessionStatus,
} from "@/app/types";
import {
  CHORD_OPTIONS,
  INTERVAL_OPTIONS,
  SCALE_OPTIONS,
} from "@/lib/constants/asnwersOptions";
import { Chord } from "@/lib/engine/Chord";
import { Interval } from "@/lib/engine/Interval";
import { Scale } from "@/lib/engine/Scale";

interface HistoryItem {
  elementLabel: string;
  wasGuessCorrect: boolean;
  guessedLabel: string;
}

interface ExerciseState {
  category: ExerciseCategory | null;
  exercise: ExerciseType | null;
  currentElement: { element: MusicElement; label: string } | null;
  guessedCorrectly: boolean | null;
  history: HistoryItem[];
  endSessionDialogIsOpen: boolean;

  answerOptions: AnswerOption[];
  selectedLabels: string[];
  ElementClass: any;
  status: SessionStatus;

  initStore: (category: ExerciseCategory, exercise: ExerciseType) => void;
  initElement: () => void;
  onNextRound: () => void;
  onRepeat: () => void;
  onGuess: (guessedLabel: string) => void;
  setEndSessionDialogIsOpen: (open: boolean) => void;
  start: () => void;
  resetStore: () => void;
}

function getElementClass(category: ExerciseCategory) {
  switch (category) {
    case "intervals":
      return Interval;
    case "chords":
      return Chord;
    case "scales":
      return Scale;
    default:
      throw new Error(`Could not get ElementClass, got category: ${category}`);
  }
}

function getElementOptions(category: ExerciseCategory) {
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

export const useExerciseStore = create<ExerciseState>((set, get) => ({
  category: null,
  exercise: null,
  currentElement: null,
  guessedCorrectly: null,
  history: [],
  endSessionDialogIsOpen: false,
  answerOptions: [],
  selectedLabels: [],
  ElementClass: undefined,
  status: "loading",
  initStore: (category, exercise) => {
    const answerOptions = getElementOptions(category);
    const ElementClass = getElementClass(category);

    set({
      category,
      exercise,
      answerOptions,
      ElementClass,
      selectedLabels: answerOptions.map((option) => option.symbol),
      currentElement: null,
      guessedCorrectly: null,
      history: [],
    });

    get().initElement();
  },

  initElement: () => {
    const state = get();
    if (
      !state.category ||
      !state.ElementClass ||
      state.selectedLabels.length === 0
    ) {
      return;
    }

    try {
      const currentElement = state.ElementClass.random(state.selectedLabels);
      set({
        currentElement,
        guessedCorrectly: null,
        status: get().status === "loading" ? "ready" : get().status,
      });
    } catch (error) {
      set({ status: "error" });
      console.log("Error during initElement: ", error);
    }
  },

  onNextRound: () => {
    get().initElement();
    get().onRepeat();
  },

  onRepeat: () => {
    const state = get();
    if (state.currentElement?.element) {
      state.currentElement.element.play();
    }
  },

  onGuess: (guessedLabel) => {
    const state = get();

    if (!state.currentElement) {
      return;
    }

    const wasGuessCorrect = guessedLabel === state.currentElement.label;

    set({
      guessedCorrectly: wasGuessCorrect,
      history: [
        ...state.history,
        {
          elementLabel: state.currentElement.label,
          wasGuessCorrect,
          guessedLabel,
        },
      ],
    });
  },

  setEndSessionDialogIsOpen: (endSessionDialogIsOpen) =>
    set({ endSessionDialogIsOpen }),
  start: () => {
    set({ status: "playing" });
    get().onRepeat();
  },
  resetStore: () =>
    set({
      category: null,
      exercise: null,
      currentElement: null,
      guessedCorrectly: null,
      history: [],
      endSessionDialogIsOpen: false,
      answerOptions: [],
      selectedLabels: [],
      ElementClass: undefined,
      status: "loading",
    }),
}));
