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
  const distanceFromC = () => {
    if (flats) {
      return baseDistanceFromC - flats;
    }
    if (sharps) {
      return baseDistanceFromC + sharps;
    }
    return baseDistanceFromC;
  };

  return {
    label,
    baseNote: letter.toUpperCase(),
    accidentals: { sharps, flats },
    octave: Number(octave),
    isNatural: !sharps && !flats,
    distanceFromC: distanceFromC(),
    play: () => sampler.playNote(input),
  };
}
