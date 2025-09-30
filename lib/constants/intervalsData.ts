import type { IntervalData } from "@/app/types";

export const IntervalLibrary: IntervalData[] = [
  // ===== SIMPLE INTERVALS =====
  {
    symbol: "P1",
    fullName: "Perfect Unison",
    category: "simple",
    degrees: [1],
    intervalsFromRoot: ["P1"],
  },

  {
    symbol: "m2",
    fullName: "Minor Second",
    category: "simple",
    degrees: [1, 2],
    intervalsFromRoot: ["P1", "m2"],
  },
  {
    symbol: "M2",
    fullName: "Major Second",
    category: "simple",
    degrees: [1, 2],
    intervalsFromRoot: ["P1", "M2"],
  },

  {
    symbol: "m3",
    fullName: "Minor Third",
    category: "simple",
    degrees: [1, 3],
    intervalsFromRoot: ["P1", "m3"],
  },
  {
    symbol: "M3",
    fullName: "Major Third",
    category: "simple",
    degrees: [1, 3],
    intervalsFromRoot: ["P1", "M3"],
  },

  {
    symbol: "P4",
    fullName: "Perfect Fourth",
    category: "simple",
    degrees: [1, 4],
    intervalsFromRoot: ["P1", "P4"],
  },
  {
    symbol: "A4",
    fullName: "Augmented Fourth",
    category: "simple",
    degrees: [1, 4],
    intervalsFromRoot: ["P1", "A4"],
  },

  {
    symbol: "P5",
    fullName: "Perfect Fifth",
    category: "simple",
    degrees: [1, 5],
    intervalsFromRoot: ["P1", "P5"],
  },
  {
    symbol: "d5",
    fullName: "Diminished Fifth",
    category: "simple",
    degrees: [1, 5],
    intervalsFromRoot: ["P1", "d5"],
  },

  {
    symbol: "m6",
    fullName: "Minor Sixth",
    category: "simple",
    degrees: [1, 6],
    intervalsFromRoot: ["P1", "m6"],
  },
  {
    symbol: "M6",
    fullName: "Major Sixth",
    category: "simple",
    degrees: [1, 6],
    intervalsFromRoot: ["P1", "M6"],
  },

  {
    symbol: "m7",
    fullName: "Minor Seventh",
    category: "simple",
    degrees: [1, 7],
    intervalsFromRoot: ["P1", "m7"],
  },
  {
    symbol: "M7",
    fullName: "Major Seventh",
    category: "simple",
    degrees: [1, 7],
    intervalsFromRoot: ["P1", "M7"],
  },

  {
    symbol: "P8",
    fullName: "Perfect Octave",
    category: "simple",
    degrees: [1, 8],
    intervalsFromRoot: ["P1", "P8"],
  },

  // ===== COMPOUND INTERVALS =====
  {
    symbol: "m9",
    fullName: "Minor Ninth",
    category: "compound",
    degrees: [1, 9],
    intervalsFromRoot: ["P1", "m9"],
  },
  {
    symbol: "M9",
    fullName: "Major Ninth",
    category: "compound",
    degrees: [1, 9],
    intervalsFromRoot: ["P1", "M9"],
  },
  {
    symbol: "m10",
    fullName: "Minor Tenth",
    category: "compound",
    degrees: [1, 10],
    intervalsFromRoot: ["P1", "m10"],
  },
  {
    symbol: "M10",
    fullName: "Major Tenth",
    category: "compound",
    degrees: [1, 10],
    intervalsFromRoot: ["P1", "M10"],
  },
  {
    symbol: "P11",
    fullName: "Perfect Eleventh",
    category: "compound",
    degrees: [1, 11],
    intervalsFromRoot: ["P1", "P11"],
  },
  {
    symbol: "A11",
    fullName: "Augmented Eleventh",
    category: "compound",
    degrees: [1, 11],
    intervalsFromRoot: ["P1", "A11"],
  },
  {
    symbol: "P12",
    fullName: "Perfect Twelfth",
    category: "compound",
    degrees: [1, 12],
    intervalsFromRoot: ["P1", "P12"],
  },
  {
    symbol: "m13",
    fullName: "Minor Thirteenth",
    category: "compound",
    degrees: [1, 13],
    intervalsFromRoot: ["P1", "m13"],
  },
  {
    symbol: "M13",
    fullName: "Major Thirteenth",
    category: "compound",
    degrees: [1, 13],
    intervalsFromRoot: ["P1", "M13"],
  },
  {
    symbol: "m14",
    fullName: "Minor Fourteenth",
    category: "compound",
    degrees: [1, 14],
    intervalsFromRoot: ["P1", "m14"],
  },
  {
    symbol: "M14",
    fullName: "Major Fourteenth",
    category: "compound",
    degrees: [1, 14],
    intervalsFromRoot: ["P1", "M14"],
  },
  {
    symbol: "P15",
    fullName: "Perfect Fifteenth",
    category: "compound",
    degrees: [1, 15],
    intervalsFromRoot: ["P1", "P15"],
  },
] as const;
