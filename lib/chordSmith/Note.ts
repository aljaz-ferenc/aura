import { sampler } from "@/lib/chordSmith/index";

type Accidentals = {
  sharps: number;
  flats: number;
};

export type ParsedNote = {
  label: string;
  baseNote: string;
  accidentals: Accidentals;
  octave: number;
  isNatural: boolean;
  distanceFromC: number;
  play: () => void;
};

const distancesFromC = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export function Note(input: string): ParsedNote {
  const match = input.match(/^([A-Ga-g])([#b]*)(\d+)$/);

  if (!match) {
    throw new Error(`Invalid note format: ${input}`);
  }

  const [, letter, accidentalStr, octaveStr] = match;
  const octave = Number(octaveStr);

  const sharps = (accidentalStr.match(/#/g) || []).length;
  const flats = (accidentalStr.match(/b/g) || []).length;

  const label = `${letter.toUpperCase()}${accidentalStr}${octaveStr}`;

  const baseDistanceFromC =
    distancesFromC[letter as "C" | "D" | "E" | "F" | "G" | "A" | "B"];

  const pitchClass = baseDistanceFromC + sharps - flats;
  // Wrap into 0–11
  const distanceInOctave = (pitchClass + 12) % 12;

  // Absolute semitone distance from C0
  const distanceFromC = octave * 12 + distanceInOctave;

  return {
    label,
    baseNote: letter.toUpperCase(),
    accidentals: { sharps, flats },
    octave,
    isNatural: !sharps && !flats,
    distanceFromC, // <-- fixed: unique per note, octave-aware
    distanceInOctave, // <-- useful for theory (0–11)
    play: () => sampler.playNote(input),
  };
}
