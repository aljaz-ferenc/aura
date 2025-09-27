import type { AnswerOption } from "@/app/types";

export const INTERVAL_OPTIONS: AnswerOption[] = [
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

export const CHORD_OPTIONS: AnswerOption[] = [
  // ===== BASIC TRIADS =====
  {
    symbol: "maj",
    fullName: "Major Triad",
    category: "major",
    type: "triad",
    schema: ["M3", "m3"],
  },
  {
    symbol: "min",
    fullName: "Minor Triad",
    category: "minor",
    type: "triad",
    schema: ["m3", "M3"],
  },
  {
    symbol: "dim",
    fullName: "Diminished Triad",
    category: "diminished",
    type: "triad",
    schema: ["m3", "m3"],
  },
  {
    symbol: "aug",
    fullName: "Augmented Triad",
    category: "augmented",
    type: "triad",
    schema: ["M3", "M3"],
  },

  // ===== SUSPENDED CHORDS =====
  {
    symbol: "sus2",
    fullName: "Suspended 2nd",
    category: "suspended",
    type: "triad",
    schema: ["M2", "P4"],
  },
  {
    symbol: "sus4",
    fullName: "Suspended 4th",
    category: "suspended",
    type: "triad",
    schema: ["P4", "M2"],
  },

  // ===== POWER CHORD =====
  // {
  //   symbol: "5",
  //   fullName: "Power Chord",
  //   category: "power",
  //   type: "dyad",
  //   schema: ["P5"],
  // },

  // ===== ADD CHORDS (TRIAD-BASED) =====
  {
    symbol: "add9",
    fullName: "Add Ninth",
    category: "major",
    type: "triad",
    schema: ["M3", "m3", "P5"], // Major triad + 9th (from root)
  },
  {
    symbol: "madd9",
    fullName: "Minor Add Ninth",
    category: "minor",
    type: "triad",
    schema: ["m3", "M3", "P5"], // Minor triad + 9th
  },

  // ===== SIXTH CHORDS (TRIAD + 6TH) =====
  {
    symbol: "6",
    fullName: "Major Sixth",
    category: "major",
    type: "triad",
    schema: ["M3", "m3", "M6"], // Major triad + 6th
  },
  {
    symbol: "min6",
    fullName: "Minor Sixth",
    category: "minor",
    type: "triad",
    schema: ["m3", "M3", "M6"], // Minor triad + 6th
  },
] as const;

export const SCALE_OPTIONS: AnswerOption[] = [
  // ===== MAJOR SCALES & MODES =====
  {
    symbol: "major",
    fullName: "Major Scale (Ionian)",
    category: "major",
    type: "diatonic",
  },
  {
    symbol: "ionian",
    fullName: "Ionian Mode",
    category: "major",
    type: "mode",
  },
  {
    symbol: "dorian",
    fullName: "Dorian Mode",
    category: "minor",
    type: "mode",
  },
  {
    symbol: "phrygian",
    fullName: "Phrygian Mode",
    category: "minor",
    type: "mode",
  },
  {
    symbol: "lydian",
    fullName: "Lydian Mode",
    category: "major",
    type: "mode",
  },
  {
    symbol: "mixolydian",
    fullName: "Mixolydian Mode",
    category: "major",
    type: "mode",
  },
  {
    symbol: "aeolian",
    fullName: "Aeolian Mode (Natural Minor)",
    category: "minor",
    type: "mode",
  },
  {
    symbol: "locrian",
    fullName: "Locrian Mode",
    category: "diminished",
    type: "mode",
  },

  // // ===== MINOR SCALES =====
  // { symbol: "natural minor", fullName: "Natural Minor Scale", category: "minor", type: "diatonic" },
  // { symbol: "harmonic minor", fullName: "Harmonic Minor Scale", category: "minor", type: "harmonic" },
  // { symbol: "melodic minor", fullName: "Melodic Minor Scale", category: "minor", type: "melodic" },
  //
  // // ===== PENTATONIC SCALES =====
  // { symbol: "major pentatonic", fullName: "Major Pentatonic Scale", category: "major", type: "pentatonic" },
  // { symbol: "minor pentatonic", fullName: "Minor Pentatonic Scale", category: "minor", type: "pentatonic" },
  // { symbol: "blues", fullName: "Blues Scale", category: "minor", type: "pentatonic" },
  //
  // // ===== SYMMETRIC SCALES =====
  // { symbol: "whole tone", fullName: "Whole Tone Scale", category: "symmetric", type: "symmetric" },
  // { symbol: "chromatic", fullName: "Chromatic Scale", category: "symmetric", type: "symmetric" },
  // { symbol: "octatonic", fullName: "Octatonic Scale", category: "symmetric", type: "symmetric" },
  //
  // // ===== JAZZ/MODAL SCALES =====
  // { symbol: "bebop major", fullName: "Bebop Major Scale", category: "major", type: "jazz" },
  // { symbol: "bebop dominant", fullName: "Bebop Dominant Scale", category: "dominant", type: "jazz" },
  // { symbol: "bebop minor", fullName: "Bebop Minor Scale", category: "minor", type: "jazz" },
  //
  // // ===== WORLD MUSIC SCALES =====
  // { symbol: "hungarian minor", fullName: "Hungarian Minor Scale", category: "minor", type: "world" },
  // { symbol: "harmonic major", fullName: "Harmonic Major Scale", category: "major", type: "world" },
  // { symbol: "double harmonic", fullName: "Double Harmonic Scale", category: "major", type: "world" },
  // { symbol: "hirajoshi", fullName: "Hirajoshi Scale", category: "minor", type: "world" },
  // { symbol: "in sen", fullName: "In Sen Scale", category: "minor", type: "world" },
  // { symbol: "yo", fullName: "Yo Scale", category: "major", type: "world" },
  // { symbol: "arabic", fullName: "Arabic Scale", category: "major", type: "world" },
  //
  // // ===== NEAPOLITAN SCALES =====
  // { symbol: "neapolitan major", fullName: "Neapolitan Major Scale", category: "major", type: "neapolitan" },
  // { symbol: "neapolitan minor", fullName: "Neapolitan Minor Scale", category: "minor", type: "neapolitan" },
  //
  // // ===== ENIGMATIC/EXOTIC SCALES =====
  // { symbol: "enigmatic", fullName: "Enigmatic Scale", category: "major", type: "exotic" },
  // { symbol: "prometheus", fullName: "Prometheus Scale", category: "major", type: "exotic" },
  // { symbol: "tritone", fullName: "Tritone Scale", category: "symmetric", type: "exotic" },
  //
  // // ===== RAGAS (INDIAN CLASSICAL) =====
  // { symbol: "raga bhairavi", fullName: "Raga Bhairavi", category: "minor", type: "raga" },
  // { symbol: "raga todi", fullName: "Raga Todi", category: "minor", type: "raga" },
  // { symbol: "raga yaman", fullName: "Raga Yaman", category: "major", type: "raga" },
  //
  // // ===== PERSIAN/MIDDLE EASTERN =====
  // { symbol: "persian", fullName: "Persian Scale", category: "major", type: "world" },
  // { symbol: "phrygian dominant", fullName: "Phrygian Dominant Scale", category: "major", type: "world" },
] as const;
