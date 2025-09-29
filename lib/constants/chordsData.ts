import type { ChordData } from "@/app/types";

export const chordLibrary: ChordData[] = [
  // ===== TRIADS =====
  {
    symbol: "Maj",
    fullName: "Major",
    category: "triads",
    type: "triad",
    schema: ["M3", "m3"],
    intervalsFromRoot: ["P1", "M3", "P5"],
    degrees: [1, 3, 5],
  },
  {
    symbol: "min",
    fullName: "Minor",
    category: "triads",
    type: "triad",
    schema: ["m3", "M3"],
    intervalsFromRoot: ["P1", "m3", "P5"],
    degrees: [1, 3, 5],
  },
  {
    symbol: "dim",
    fullName: "Diminished",
    category: "triads",
    type: "triad",
    schema: ["m3", "m3"],
    intervalsFromRoot: ["P1", "m3", "d5"],
    degrees: [1, 3, 5],
  },
  {
    symbol: "aug",
    fullName: "Augmented",
    category: "triads",
    type: "triad",
    schema: ["M3", "M3"],
    intervalsFromRoot: ["P1", "M3", "A5"],
    degrees: [1, 3, 5],
  },
  {
    symbol: "sus2",
    fullName: "Suspended Second",
    category: "triads",
    type: "triad",
    schema: ["M2", "P4"],
    intervalsFromRoot: ["P1", "M2", "P5"],
    degrees: [1, 2, 5],
  },
  {
    symbol: "sus4",
    fullName: "Suspended Fourth",
    category: "triads",
    type: "triad",
    schema: ["P4", "M2"],
    intervalsFromRoot: ["P1", "P4", "P5"],
    degrees: [1, 4, 5],
  },

  // ===== SEVENTHS =====
  {
    symbol: "maj7",
    fullName: "Major Seventh",
    category: "sevenths",
    type: "seventh",
    schema: ["M3", "m3", "M3"],
    intervalsFromRoot: ["P1", "M3", "P5", "M7"],
    degrees: [1, 3, 5, 7],
  },
  {
    symbol: "7",
    fullName: "Dominant Seventh",
    category: "sevenths",
    type: "seventh",
    schema: ["M3", "m3", "m3"],
    intervalsFromRoot: ["P1", "M3", "P5", "m7"],
    degrees: [1, 3, 5, 7],
  },
  {
    symbol: "m7",
    fullName: "Minor Seventh",
    category: "sevenths",
    type: "seventh",
    schema: ["m3", "M3", "m3"],
    intervalsFromRoot: ["P1", "m3", "P5", "m7"],
    degrees: [1, 3, 5, 7],
  },
  {
    symbol: "min7b5",
    fullName: "Half-Diminished Seventh",
    category: "sevenths",
    type: "seventh",
    schema: ["m3", "m3", "M3"],
    intervalsFromRoot: ["P1", "m3", "d5", "m7"],
    degrees: [1, 3, 5, 7],
  },
  {
    symbol: "dim7",
    fullName: "Diminished Seventh",
    category: "sevenths",
    type: "seventh",
    schema: ["m3", "m3", "m3"],
    intervalsFromRoot: ["P1", "m3", "d5", "d7"],
    degrees: [1, 3, 5, 7],
  },

  // ===== NINTHS =====
  {
    symbol: "9",
    fullName: "Dominant Ninth",
    category: "ninths",
    type: "ninth",
    schema: ["M3", "m3", "m3", "M3"],
    intervalsFromRoot: ["P1", "M3", "P5", "m7", "M9"],
    degrees: [1, 3, 5, 7, 9],
  },
  {
    symbol: "maj9",
    fullName: "Major Ninth",
    category: "ninths",
    type: "ninth",
    schema: ["M3", "m3", "M3", "m3"],
    intervalsFromRoot: ["P1", "M3", "P5", "M7", "M9"],
    degrees: [1, 3, 5, 7, 9],
  },
  {
    symbol: "m9",
    fullName: "Minor Ninth",
    category: "ninths",
    type: "ninth",
    schema: ["m3", "M3", "m3", "M3"],
    intervalsFromRoot: ["P1", "m3", "P5", "m7", "M9"],
    degrees: [1, 3, 5, 7, 9],
  },
] as const;

export type ChordSymbol =
  // Triads
  | ""
  | "m"
  | "dim"
  | "aug"
  | "sus2"
  | "sus4"
  // Sevenths
  | "maj7"
  | "7"
  | "m7"
  | "min7b5"
  | "dim7"
  // Ninths
  | "9"
  | "maj9"
  | "m9";
