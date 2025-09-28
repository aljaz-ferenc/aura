import type {ChordData} from "@/app/types";

export const CHORDS_DATA: ChordData[] = [
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

    // ===== SEVENTH CHORDS =====
    {
        symbol: "maj7",
        fullName: "Major Seventh",
        category: "major",
        type: "seventh",
        schema: ["M3", "m3", "M3"],
    },
    {
        symbol: "min7",
        fullName: "Minor Seventh",
        category: "minor",
        type: "seventh",
        schema: ["m3", "M3", "m3"],
    },
    {
        symbol: "7",
        fullName: "Dominant Seventh",
        category: "dominant",
        type: "seventh",
        schema: ["M3", "m3", "m3"],
    },
    {
        symbol: "min7b5",
        fullName: "Minor Seventh Flat Five",
        category: "diminished",
        type: "seventh",
        schema: ["m3", "m3", "M3"],
    },
    {
        symbol: "dim7",
        fullName: "Diminished Seventh",
        category: "diminished",
        type: "seventh",
        schema: ["m3", "m3", "m3"],
    },
    {
        symbol: "maj7#5",
        fullName: "Major Seventh Sharp Five",
        category: "augmented",
        type: "seventh",
        schema: ["M3", "M3", "m2"],
    },
    {
        symbol: "minmaj7",
        fullName: "Minor Major Seventh",
        category: "minor",
        type: "seventh",
        schema: ["m3", "M3", "M3"],
    },

    // ===== EXTENDED CHORDS =====
    {
        symbol: "maj9",
        fullName: "Major Ninth",
        category: "major",
        type: "extended",
        schema: ["M3", "m3", "M3", "m3"],
    },
    {
        symbol: "min9",
        fullName: "Minor Ninth",
        category: "minor",
        type: "extended",
        schema: ["m3", "M3", "m3", "M3"],
    },
    {
        symbol: "9",
        fullName: "Dominant Ninth",
        category: "dominant",
        type: "extended",
        schema: ["M3", "m3", "m3", "M3"],
    },
    {
        symbol: "maj13",
        fullName: "Major Thirteenth",
        category: "major",
        type: "extended",
        schema: ["M3", "m3", "M3", "m3", "M3", "m3"],
    },

    // ===== SUSPENDED CHORDS =====
    {
        symbol: "sus2",
        fullName: "Suspended Second",
        category: "suspended",
        type: "suspended",
        schema: ["M2", "P4"],
    },
    {
        symbol: "sus4",
        fullName: "Suspended Fourth",
        category: "suspended",
        type: "suspended",
        schema: ["P4", "M2"],
    },
    {
        symbol: "7sus4",
        fullName: "Dominant Seventh Suspended Fourth",
        category: "suspended",
        type: "seventh",
        schema: ["P4", "M2", "m3"],
    },

    // ===== ADDED TONE CHORDS =====
    {
        symbol: "add9",
        fullName: "Add Ninth",
        category: "major",
        type: "added",
        schema: ["M3", "m3", "M7"],
    },
    {
        symbol: "6",
        fullName: "Major Sixth",
        category: "major",
        type: "added",
        schema: ["M3", "m3", "M2"],
    },
    {
        symbol: "6/9",
        fullName: "Six Nine",
        category: "major",
        type: "added",
        schema: ["M3", "m3", "M2", "P4"],
    },

    // ===== ALTERED DOMINANT CHORDS =====
    {
        symbol: "7b9",
        fullName: "Dominant Seventh Flat Nine",
        category: "altered",
        type: "altered",
        schema: ["M3", "m3", "m3", "m3"],
    },
    {
        symbol: "7#9",
        fullName: "Dominant Seventh Sharp Nine",
        category: "altered",
        type: "altered",
        schema: ["M3", "m3", "m3", "A2"],
    },
    {
        symbol: "7#11",
        fullName: "Dominant Seventh Sharp Eleven",
        category: "altered",
        type: "altered",
        schema: ["M3", "m3", "m3", "M3", "A4"],
    },

    // ===== JAZZ & MODERN CHORDS =====
    {
        symbol: "maj7#11",
        fullName: "Major Seventh Sharp Eleven",
        category: "major",
        type: "jazz",
        schema: ["M3", "m3", "M3", "M3", "A4"],
    },
    {
        symbol: "7alt",
        fullName: "Altered Dominant",
        category: "altered",
        type: "altered",
        schema: ["M3", "m3", "m3", "m3", "A4"],
    }
] as const

export type ChordSymbol =
// ===== BASIC TRIADS =====
    | 'maj'
    | 'min'
    | 'dim'
    | 'aug'

    // ===== SEVENTH CHORDS =====
    | 'maj7'
    | 'min7'
    | '7'
    | 'min7b5'
    | 'dim7'
    | 'maj7#5'
    | '7#5'
    | '7b5'
    | 'minmaj7'

    // ===== EXTENDED CHORDS =====
    | 'maj9'
    | 'min9'
    | '9'
    | 'maj11'
    | 'min11'
    | '11'
    | 'maj13'
    | 'min13'
    | '13'

    // ===== SUSPENDED CHORDS =====
    | 'sus2'
    | 'sus4'
    | '7sus4'
    | '9sus4'

    // ===== ADDED TONE CHORDS =====
    | 'add9'
    | 'madd9'
    | 'add11'
    | '6'
    | 'min6'
    | '6/9'

    // ===== ALTERED DOMINANT CHORDS =====
    | '7b9'
    | '7#9'
    | '7b13'
    | '7#11'
    | '13#11'
    | '9#11'

    // ===== JAZZ & MODERN CHORDS =====
    | 'maj7#11'
    | 'maj9#11'
    | 'min11b5'
    | '7alt'
    | '7b9b13'
    | '7#9b13'

    // ===== QUARTAL & CLUSTER CHORDS =====
    | 'quartal'
    | 'so what'
    | 'cluster maj'
    | 'cluster min'

    // ===== POLYCHORDS =====
    | 'maj over maj'
    | 'maj over min'
    | 'min over maj';