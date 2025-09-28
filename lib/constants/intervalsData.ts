import type { IntervalData } from "@/app/types";

export const INTERVALS_DATA: IntervalData[] = [
  // ===== SIMPLE INTERVALS =====
  { symbol: "P1", fullName: "Perfect Unison", category: "simple" },

  { symbol: "m2", fullName: "Minor Second", category: "simple" },
  { symbol: "M2", fullName: "Major Second", category: "simple" },

  { symbol: "m3", fullName: "Minor Third", category: "simple" },
  { symbol: "M3", fullName: "Major Third", category: "simple" },

  { symbol: "P4", fullName: "Perfect Fourth", category: "simple" },
  { symbol: "A4", fullName: "Augmented Fourth", category: "simple" },

  { symbol: "P5", fullName: "Perfect Fifth", category: "simple" },
  { symbol: "d5", fullName: "Diminished Fifth", category: "simple" },

  { symbol: "m6", fullName: "Minor Sixth", category: "simple" },
  { symbol: "M6", fullName: "Major Sixth", category: "simple" },

  { symbol: "m7", fullName: "Minor Seventh", category: "simple" },
  { symbol: "M7", fullName: "Major Seventh", category: "simple" },

  { symbol: "P8", fullName: "Perfect Octave", category: "simple" },

  // ===== COMPOUND INTERVALS =====
  { symbol: "m9", fullName: "Minor Ninth", category: "compound" },
  { symbol: "M9", fullName: "Major Ninth", category: "compound" },
  { symbol: "m10", fullName: "Minor Tenth", category: "compound" },
  { symbol: "M10", fullName: "Major Tenth", category: "compound" },
  { symbol: "P11", fullName: "Perfect Eleventh", category: "compound" },
  { symbol: "A11", fullName: "Augmented Eleventh", category: "compound" },
  { symbol: "P12", fullName: "Perfect Twelfth", category: "compound" },
  { symbol: "m13", fullName: "Minor Thirteenth", category: "compound" },
  { symbol: "M13", fullName: "Major Thirteenth", category: "compound" },
  { symbol: "m14", fullName: "Minor Fourteenth", category: "compound" },
  { symbol: "M14", fullName: "Major Fourteenth", category: "compound" },
  { symbol: "P15", fullName: "Perfect Fifteenth", category: "compound" },
] as const;
