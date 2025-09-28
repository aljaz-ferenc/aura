import { IntervalData} from "@/app/types";

export const INTERVALS_DATA: IntervalData[] = [
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
    { symbol: "m9", fullName: "Minor Ninth", category: "minor" },
    { symbol: "M9", fullName: "Major Ninth", category: "major" },
    { symbol: "m10", fullName: "Minor Tenth", category: "minor" },
    { symbol: "M10", fullName: "Major Tenth", category: "major" },
    { symbol: "P11", fullName: "Perfect Eleventh", category: "perfect" },
    { symbol: "A11", fullName: "Augmented Eleventh", category: "augmented" },
    { symbol: "P12", fullName: "Perfect Twelfth", category: "perfect" },
    { symbol: "m13", fullName: "Minor Thirteenth", category: "minor" },
    { symbol: "M13", fullName: "Major Thirteenth", category: "major" },
    { symbol: "m14", fullName: "Minor Fourteenth", category: "minor" },
    { symbol: "M14", fullName: "Major Fourteenth", category: "major" },
    { symbol: "P15", fullName: "Perfect Fifteenth", category: "perfect" },
] as const;