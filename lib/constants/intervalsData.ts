import { IntervalData} from "@/app/types";

export const INTERVALS_DATA: IntervalData[] = [
    // ===== UNISONS =====
    { symbol: "P1", fullName: "Perfect Unison", category: "unisons" },

    // ===== SECONDS =====
    { symbol: "m2", fullName: "Minor Second", category: "seconds" },
    { symbol: "M2", fullName: "Major Second", category: "seconds" },

    // ===== THIRDS =====
    { symbol: "m3", fullName: "Minor Third", category: "thirds" },
    { symbol: "M3", fullName: "Major Third", category: "thirds" },

    // ===== FOURTHS =====
    { symbol: "P4", fullName: "Perfect Fourth", category: "fourths" },
    { symbol: "A4", fullName: "Augmented Fourth", category: "fourths" },

    // ===== FIFTHS =====
    { symbol: "P5", fullName: "Perfect Fifth", category: "fifths" },
    { symbol: "d5", fullName: "Diminished Fifth", category: "fifths" },

    // ===== SIXTHS =====
    { symbol: "m6", fullName: "Minor Sixth", category: "sixths" },
    { symbol: "M6", fullName: "Major Sixth", category: "sixths" },

    // ===== SEVENTHS =====
    { symbol: "m7", fullName: "Minor Seventh", category: "sevenths" },
    { symbol: "M7", fullName: "Major Seventh", category: "sevenths" },

    // ===== OCTAVES =====
    { symbol: "P8", fullName: "Perfect Octave", category: "octaves" },

    // ===== COMPOUND INTERVALS =====
    { symbol: "m9", fullName: "Minor Ninth", category: "ninths" },
    { symbol: "M9", fullName: "Major Ninth", category: "ninths" },
    { symbol: "m10", fullName: "Minor Tenth", category: "tenths" },
    { symbol: "M10", fullName: "Major Tenth", category: "tenths" },
    { symbol: "P11", fullName: "Perfect Eleventh", category: "elevenths" },
    { symbol: "A11", fullName: "Augmented Eleventh", category: "elevenths" },
    { symbol: "P12", fullName: "Perfect Twelfth", category: "twelfths" },
    { symbol: "m13", fullName: "Minor Thirteenth", category: "thirteenths" },
    { symbol: "M13", fullName: "Major Thirteenth", category: "thirteenths" },
    { symbol: "m14", fullName: "Minor Fourteenth", category: "fourteenths" },
    { symbol: "M14", fullName: "Major Fourteenth", category: "fourteenths" },
    { symbol: "P15", fullName: "Perfect Fifteenth", category: "fifteenths" },
] as const;