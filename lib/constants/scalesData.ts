import type { ScaleData} from "@/app/types";

export const SCALES_DATA: ScaleData[] = [
    // ===== MAJOR SCALES & MODES =====
    {
        symbol: "major",
        fullName: "Major Scale (Ionian)",
        category: "major",
        type: "diatonic",
        schema: ["M2", "M2", "m2", "M2", "M2", "M2", "m2"]
    },
    {
        symbol: "dorian",
        fullName: "Dorian Mode",
        category: "major",
        type: "diatonic",
        schema: ["M2", "m2", "M2", "M2", "M2", "m2", "M2"]
    },
    {
        symbol: "phrygian",
        fullName: "Phrygian Mode",
        category: "major",
        type: "diatonic",
        schema: ["m2", "M2", "M2", "M2", "m2", "M2", "M2"]
    },
    {
        symbol: "lydian",
        fullName: "Lydian Mode",
        category: "major",
        type: "diatonic",
        schema: ["M2", "M2", "M2", "m2", "M2", "M2", "m2"]
    },
    {
        symbol: "mixolydian",
        fullName: "Mixolydian Mode",
        category: "major",
        type: "diatonic",
        schema: ["M2", "M2", "m2", "M2", "M2", "m2", "M2"]
    },
    {
        symbol: "minor",
        fullName: "Natural Minor (Aeolian)",
        category: "minor",
        type: "diatonic",
        schema: ["M2", "m2", "M2", "M2", "m2", "M2", "M2"]
    },
    {
        symbol: "locrian",
        fullName: "Locrian Mode",
        category: "diminished",
        type: "diatonic",
        schema: ["m2", "M2", "M2", "m2", "M2", "M2", "M2"]
    },

    // ===== MINOR SCALE VARIATIONS =====
    {
        symbol: "harmonic minor",
        fullName: "Harmonic Minor",
        category: "minor",
        type: "harmonic",
        schema: ["M2", "m2", "M2", "M2", "m2", "A2", "m2"]
    },
    {
        symbol: "melodic minor",
        fullName: "Melodic Minor (Ascending)",
        category: "minor",
        type: "melodic",
        schema: ["M2", "m2", "M2", "M2", "M2", "M2", "m2"]
    },
    {
        symbol: "dorian ♯11",
        fullName: "Dorian ♯11 (Melodic Minor 2nd mode)",
        category: "minor",
        type: "jazz",
        schema: ["M2", "m2", "M2", "A2", "m2", "M2", "m2"]
    },

    // ===== PENTATONIC SCALES =====
    {
        symbol: "major pentatonic",
        fullName: "Major Pentatonic",
        category: "pentatonic",
        type: "pentatonic",
        schema: ["M2", "M2", "m3", "M2", "m3"]
    },
    {
        symbol: "minor pentatonic",
        fullName: "Minor Pentatonic",
        category: "pentatonic",
        type: "pentatonic",
        schema: ["m3", "M2", "M2", "m3", "M2"]
    },
    {
        symbol: "blues",
        fullName: "Blues Scale",
        category: "pentatonic",
        type: "blues",
        schema: ["m3", "M2", "m2", "m2", "m3", "M2"]
    },

    // ===== JAZZ & MODERN SCALES =====
    {
        symbol: "whole tone",
        fullName: "Whole Tone Scale",
        category: "symmetric",
        type: "whole-tone",
        schema: ["M2", "M2", "M2", "M2", "M2", "M2"]
    },
    {
        symbol: "diminished",
        fullName: "Diminished Scale (Whole-Half)",
        category: "symmetric",
        type: "diminished",
        schema: ["M2", "m2", "M2", "m2", "M2", "m2", "M2", "m2"]
    },
    {
        symbol: "octatonic",
        fullName: "Octatonic Scale (Half-Whole)",
        category: "symmetric",
        type: "diminished",
        schema: ["m2", "M2", "m2", "M2", "m2", "M2", "m2", "M2"]
    },

    // ===== WORLD & ETHNIC SCALES =====
    {
        symbol: "harmonic major",
        fullName: "Harmonic Major",
        category: "major",
        type: "world",
        schema: ["M2", "M2", "m2", "M2", "m2", "A2", "m2"]
    },
    {
        symbol: "double harmonic",
        fullName: "Double Harmonic Major",
        category: "world",
        type: "byzantine",
        schema: ["m2", "A2", "m2", "M2", "m2", "A2", "m2"]
    },
    {
        symbol: "hungarian minor",
        fullName: "Hungarian Minor",
        category: "minor",
        type: "world",
        schema: ["M2", "m2", "A2", "m2", "m2", "A2", "m2"]
    },
    {
        symbol: "phrygian dominant",
        fullName: "Phrygian Dominant",
        category: "world",
        type: "harmonic",
        schema: ["m2", "A2", "m2", "M2", "m2", "M2", "M2"]
    },

    // ===== BEBOP SCALES =====
    {
        symbol: "bebop dominant",
        fullName: "Bebop Dominant Scale",
        category: "jazz",
        type: "bebop",
        schema: ["M2", "M2", "m2", "M2", "M2", "m2", "m2", "M2"]
    },
    {
        symbol: "bebop major",
        fullName: "Bebop Major Scale",
        category: "jazz",
        type: "bebop",
        schema: ["M2", "M2", "m2", "M2", "m2", "m2", "M2", "M2"]
    },

    // ===== EXOTIC SCALES =====
    {
        symbol: "enigmatic",
        fullName: "Enigmatic Scale",
        category: "exotic",
        type: "exotic",
        schema: ["m2", "A2", "A2", "M2", "M2", "M2", "m2"]
    },
    {
        symbol: "neapolitan major",
        fullName: "Neapolitan Major",
        category: "major",
        type: "exotic",
        schema: ["m2", "M2", "M2", "M2", "M2", "M2", "m2"]
    },
    {
        symbol: "neapolitan minor",
        fullName: "Neapolitan Minor",
        category: "minor",
        type: "exotic",
        schema: ["m2", "M2", "M2", "M2", "m2", "A2", "m2"]
    }
] as const

export type ScaleSymbol =
// Major Scales & Modes
    | 'major'
    | 'dorian'
    | 'phrygian'
    | 'lydian'
    | 'mixolydian'
    | 'minor'
    | 'locrian'

    // Minor Scale Variations
    | 'harmonic minor'
    | 'melodic minor'
    | 'dorian ♯11'

    // Pentatonic Scales
    | 'major pentatonic'
    | 'minor pentatonic'
    | 'blues'

    // Jazz & Modern Scales
    | 'whole tone'
    | 'diminished'
    | 'octatonic'

    // World & Ethnic Scales
    | 'harmonic major'
    | 'double harmonic'
    | 'hungarian minor'
    | 'phrygian dominant'

    // Bebop Scales
    | 'bebop dominant'
    | 'bebop major'

    // Exotic Scales
    | 'enigmatic'
    | 'neapolitan major'
    | 'neapolitan minor';