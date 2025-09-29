import type { ScaleData } from "@/app/types";

export const scaleLibrary: ScaleData[] = [
  // ===== MAJOR SCALES & MODES =====
  {
    symbol: "major",
    fullName: "Major (Ionian)",
    category: "modes",
    type: "diatonic",
    schema: ["M2", "M2", "m2", "M2", "M2", "M2", "m2"],
    intervalsFromRoot: ["P1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "dorian",
    fullName: "Dorian",
    category: "modes",
    type: "diatonic",
    schema: ["M2", "m2", "M2", "M2", "M2", "m2", "M2"],
    intervalsFromRoot: ["P1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "phrygian",
    fullName: "Phrygian",
    category: "modes",
    type: "diatonic",
    schema: ["m2", "M2", "M2", "M2", "m2", "M2", "M2"],
    intervalsFromRoot: ["P1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "lydian",
    fullName: "Lydian",
    category: "modes",
    type: "diatonic",
    schema: ["M2", "M2", "M2", "m2", "M2", "M2", "m2"],
    intervalsFromRoot: ["P1", "M2", "M3", "A4", "P5", "M6", "M7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "mixolydian",
    fullName: "Mixolydian",
    category: "modes",
    type: "diatonic",
    schema: ["M2", "M2", "m2", "M2", "M2", "m2", "M2"],
    intervalsFromRoot: ["P1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "aeolian",
    fullName: "Natural Minor (Aeolian)",
    category: "modes",
    type: "diatonic",
    schema: ["M2", "m2", "M2", "M2", "m2", "M2", "M2"],
    intervalsFromRoot: ["P1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "locrian",
    fullName: "Locrian",
    category: "modes",
    type: "diatonic",
    schema: ["m2", "M2", "M2", "m2", "M2", "M2", "M2"],
    intervalsFromRoot: ["P1", "m2", "m3", "P4", "d5", "m6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },

  // ===== MINOR SCALES =====
  {
    symbol: "harmonic minor",
    fullName: "Harmonic Minor",
    category: "minor",
    type: "harmonic",
    schema: ["M2", "m2", "M2", "M2", "m2", "A2", "m2"],
    intervalsFromRoot: ["P1", "M2", "m3", "P4", "P5", "m6", "M7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    symbol: "melodic minor",
    fullName: "Melodic Minor",
    category: "minor",
    type: "melodic",
    schema: ["M2", "m2", "M2", "M2", "M2", "M2", "m2"],
    intervalsFromRoot: ["P1", "M2", "m3", "P4", "P5", "M6", "M7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8],
  },

  // ===== SYMMETRIC SCALES =====
  {
    symbol: "whole tone",
    fullName: "Whole Tone",
    category: "symmetric",
    type: "symmetric",
    schema: ["M2", "M2", "M2", "M2", "M2", "M2"],
    intervalsFromRoot: ["P1", "M2", "M3", "A4", "A5", "A6", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 8],
  },
  {
    symbol: "diminished",
    fullName: "Diminished (Whole-Half)",
    category: "symmetric",
    type: "symmetric",
    schema: ["M2", "m2", "M2", "m2", "M2", "m2", "M2", "m2"],
    intervalsFromRoot: ["P1", "M2", "m3", "M3", "A4", "P5", "M6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    symbol: "dominant diminished",
    fullName: "Dominant Diminished (Half-Whole)",
    category: "symmetric",
    type: "symmetric",
    schema: ["m2", "M2", "m2", "M2", "m2", "M2", "m2", "M2"],
    intervalsFromRoot: ["P1", "m2", "m3", "M3", "P4", "A4", "M6", "m7", "P8"],
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    symbol: "augmented",
    fullName: "Augmented",
    category: "symmetric",
    type: "symmetric",
    schema: ["m3", "m2", "m3", "m2", "m3", "m2"],
    intervalsFromRoot: ["P1", "m3", "M3", "P5", "m6", "M7", "P8"],
    degrees: [1, 3, 3, 5, 6, 7, 8],
  },
  // ===== PENTATONIC SCALES =====
  {
    symbol: "major pentatonic",
    fullName: "Major Pentatonic",
    category: "pentatonic",
    type: "pentatonic",
    schema: ["M2", "M2", "m3", "M2", "m3"],
    intervalsFromRoot: ["P1", "M2", "M3", "P5", "M6", "P8"],
    degrees: [1, 2, 3, 5, 6, 8],
  },
  {
    symbol: "minor pentatonic",
    fullName: "Minor Pentatonic",
    category: "pentatonic",
    type: "pentatonic",
    schema: ["m3", "M2", "M2", "m3", "M2"],
    intervalsFromRoot: ["P1", "m3", "P4", "P5", "m7", "P8"],
    degrees: [1, 3, 4, 5, 7, 8],
  },
] as const;

export type ScaleSymbol =
  // Modes category
  | "major"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian"
  // Minor category
  | "harmonic minor"
  | "melodic minor"
  // Symmetric category
  | "whole tone"
  | "diminished"
  | "dominant diminished"
  | "augmented"
  // Pentatonic category
  | "major pentatonic"
  | "minor pentatonic";
