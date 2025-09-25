import { sampler } from "@/lib/chordSmith/index";
import type { ParsedNote } from "@/lib/chordSmith/Note";

export type ParsedInterval = {
  distance: number;
  label: string;
  quantity: number;
  quality: string;
};

const baseDistances: Record<string, number> = {
  P1: 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  A4: 6,
  d5: 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  P8: 12,
};

export function Interval(label: string): ParsedInterval {
  // Match examples: P1, m2, M3, A4, aa4, d5, dd7
  const match = label.match(/^(P|M|m|a+|d+)(\d+)$/);

  if (!match) {
    throw new Error(`Invalid interval label: ${label}`);
  }

  const [, qualityStr, quantityStr] = match;

  let distance = 0;
  distance = baseDistances[label];

  // if diminished, take distance of minor or perfect interval and subtract amount of ds
  if (qualityStr.startsWith("d")) {
    if (`m${quantityStr}` in baseDistances) {
      const baseDistance = baseDistances[`m${quantityStr}`];
      distance = baseDistance - qualityStr.length;
    }

    if (`P${quantityStr}` in baseDistances) {
      const baseDistance = baseDistances[`P${quantityStr}`];
      distance = baseDistance - qualityStr.length;
    }
  }

  // if augumented, take distance of major or perfect interval and add amount of as
  if (qualityStr.startsWith("a")) {
    if (`M${quantityStr}` in baseDistances) {
      const baseDistance = baseDistances[`M${quantityStr}`];
      distance = baseDistance + qualityStr.length;
    }

    if (`P${quantityStr}` in baseDistances) {
      const baseDistance = baseDistances[`P${quantityStr}`];
      distance = baseDistance + qualityStr.length;
    }
  }

  return {
    label,
    distance,
    quantity: Number(quantityStr),
    quality: qualityStr,
  };
}

const CScale = ["C", "D", "E", "F", "G", "A", "B"];
const isPerfectInterval = (quantity: number) => [1, 4, 5].includes(quantity);

export function getIntervalBetween(notes: ParsedNote[]): {
  interval: ParsedInterval;
  notes: ParsedNote[];
  play: (reverse?: boolean) => void;
} {
  if (notes.length !== 2) {
    throw new Error(
      `getIntervalBetween requires exactly 2 notes. You passed ${notes.length}.`,
    );
  }

  const [note1, note2] = notes;
  const distance = Math.abs(note2.distanceFromC - note1.distanceFromC);
  const start = CScale.findIndex((scaleNote) => scaleNote === note1.baseNote);
  const end = CScale.findIndex((scaleNote) => scaleNote === note2.baseNote);

  const quantity = Math.abs(start - end) + 1;
  let quality = "";

  if (isPerfectInterval(quantity)) {
    const semitonesToPerfect = baseDistances[`P${quantity}`];

    if (distance === semitonesToPerfect) quality = "P";

    if (distance < semitonesToPerfect) {
      const diff = distance - semitonesToPerfect;
      quality = Array.from({ length: diff }, () => "d").join("");
    }

    if (distance > semitonesToPerfect) {
      const diff = distance - semitonesToPerfect;
      quality = Array.from({ length: diff }, () => "a").join("");
    }
  }

  if (!isPerfectInterval(quantity)) {
    const semitonesToMajor = baseDistances[`M${quantity}`];

    if (distance === semitonesToMajor) quality = "M";

    if (distance < semitonesToMajor) {
      if (semitonesToMajor - distance === 1) quality = "m";
      if (semitonesToMajor - distance > 1) {
        const diff = semitonesToMajor - distance;
        quality = Array.from({ length: diff - 1 }, () => "")
          .map(() => "d")
          .join("");
      }
    }

    if (distance > semitonesToMajor) {
      const diff = distance - semitonesToMajor;
      quality = Array.from({ length: diff }, () => "")
        .map(() => "a")
        .join("");
    }
  }

  const noteLabels = notes.map((note) => note.label);
  console.log(noteLabels);

  const intervalLabel = `${quality}${quantity}`;
  return {
    interval: Interval(intervalLabel),
    notes,
    play: (reverse?: boolean): Promise<void> =>
      reverse
        ? sampler.playInterval([...noteLabels].reverse())
        : sampler.playInterval(noteLabels),
  };
}
