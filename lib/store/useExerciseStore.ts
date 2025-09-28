import { create } from "zustand";
import type {
  ElementData,
  ExerciseCategory,
  ExerciseType,
  MusicElement,
  SessionStatus,
} from "@/app/types";
import { CHORDS_DATA } from "@/lib/constants/chordsData";
import { INTERVALS_DATA } from "@/lib/constants/intervalsData";
import { SCALES_DATA } from "@/lib/constants/scalesData";
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

  answerOptions: ElementData[];
  selectedLabels: string[];
  ElementClass: any;
  status: SessionStatus;

  initStore: (category: ExerciseCategory, exercise: ExerciseType) => void;
  initElement: () => void;
  onNextRound: () => void;
  onRepeat: () => void;
  onGuess: (guessedLabel: string) => void;
  onCheck: () => void;
  setEndSessionDialogIsOpen: (open: boolean) => void;
  start: () => void;
  resetStore: () => void;
  onChecked: (correct: boolean) => void;
  addGuessToHistory: (correct: boolean) => void;
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
      return INTERVALS_DATA;
    case "chords":
      return CHORDS_DATA;
    case "scales":
      return SCALES_DATA;
    default:
      return INTERVALS_DATA;
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
      const getNextStatus = () => {
        if (state.status === "loading") {
          return "ready";
        }
        return "playing";
      };
      set({
        currentElement,
        guessedCorrectly: null,
        status: getNextStatus(),
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
      switch (state.exercise) {
        case "listening":
          state.currentElement.element.play();
          break;
        case "singing":
          state.currentElement.element.notes[0].play();
      }
    }
  },

  onGuess: (guessedLabel) => {
    const state = get();

    if (!state.currentElement) {
      return;
    }

    const wasGuessCorrect = guessedLabel === state.currentElement.label;
    state.addGuessToHistory(wasGuessCorrect);
  },

  onCheck: () => {
    set({ status: "checking" });
    get().currentElement?.element.play("melodic");
  },

  onChecked(correct) {
    set({ status: "playing" });
    const state = get();

    if (!state.currentElement) {
      return;
    }

    state.addGuessToHistory(correct);
    state.onNextRound();
  },

  addGuessToHistory: (correct) => {
    const state = get();
    if (!state.currentElement?.label) return state;
    const guessedLabel = state.currentElement.label;
    set({
      guessedCorrectly: correct,
      history: [
        ...state.history,
        {
          elementLabel: state.currentElement.label,
          wasGuessCorrect: correct,
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
