import { sampler, type Note as TNote } from "@/lib/chordSmith/index";
import { Note, type ParsedNote } from "@/lib/chordSmith/Note";

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
  const match = label.match(/^(P|M|m|a+|d+)(\d+)$/);
  if (!match) {
    throw new Error(`Invalid interval label: ${label}`);
  }

  const [, qualityStr, quantityStr] = match;
  const quantity = Number(quantityStr);

  const octaveDiff = Math.floor((quantity - 1) / 7);
  const simpleQuantity = quantity - octaveDiff * 7;

  let distance = 0;

  if (qualityStr === "M" || qualityStr === "m") {
    // major/minor intervals
    const majorDistance = baseDistances[`M${simpleQuantity}`];
    if (qualityStr === "M") {
      distance = majorDistance;
    } else {
      distance = majorDistance - 1; // minor is 1 semitone smaller
    }
  } else if (qualityStr === "P") {
    // perfect intervals
    distance = baseDistances[`P${simpleQuantity}`];
  } else if (qualityStr.startsWith("a")) {
    // augmented
    const base =
      baseDistances[`M${simpleQuantity}`] ??
      baseDistances[`P${simpleQuantity}`];
    distance = base + qualityStr.length;
  } else if (qualityStr.startsWith("d")) {
    // diminished
    if (`M${simpleQuantity}` in baseDistances) {
      const base = baseDistances[`M${simpleQuantity}`];
      distance = base - 1 - (qualityStr.length - 1); // m = 1 d, extra ds keep subtracting
    } else if (`P${simpleQuantity}` in baseDistances) {
      const base = baseDistances[`P${simpleQuantity}`];
      distance = base - qualityStr.length;
    }
  }

  distance += octaveDiff * 12;

  return {
    label,
    distance,
    quantity,
    quality: qualityStr,
  };
}

const CScale = ["C", "D", "E", "F", "G", "A", "B"];
const isPerfectInterval = (quantity: number) => [1, 4, 5].includes(quantity);

export function getIntervalBetween(notes: ParsedNote[]): {
  interval: ParsedInterval;
  notes: ParsedNote[];
  play: (reverse?: boolean) => Promise<void>;
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

  const baseQuantity = Math.abs(start - end) + 1;
  const octaveDiff = Math.abs(note1.octave - note2.octave);
  const quantity = baseQuantity + octaveDiff * 7;

  let quality = "";

  if (isPerfectInterval(baseQuantity)) {
    const semitonesToPerfect = baseDistances[`P${baseQuantity}`];

    if (distance === semitonesToPerfect) {
      quality = "P";
    } else if (distance < semitonesToPerfect) {
      const diff = semitonesToPerfect - distance;
      quality = "d".repeat(diff);
    } else {
      const diff = distance - semitonesToPerfect;
      quality = "a".repeat(diff);
    }
  } else {
    const semitonesToMajor = baseDistances[`M${baseQuantity}`];

    if (distance === semitonesToMajor) {
      quality = "M";
    } else if (distance === semitonesToMajor - 1) {
      quality = "m";
    } else if (distance < semitonesToMajor - 1) {
      const diff = semitonesToMajor - distance;
      quality = "d".repeat(diff);
    } else {
      const diff = distance - semitonesToMajor;
      quality = "a".repeat(diff);
    }
  }

  const noteLabels = notes.map((note) => note.label);
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

const NOTES = ["C", "D", "E", "F", "G", "A", "B"];

export function distanceToNote(distance: number): TNote {
  const octave = Math.floor(distance / 12);
  const index = distance % 12;
  const noteName = NOTES[index];
  return `${noteName}${octave}` as TNote;
}

export function getNoteFromInterval(baseNote: TNote, intervalLabel: string) {
  console.log(Note(baseNote), intervalLabel);
  const intervalLabelMatch = intervalLabel.match(/^(P|M|m|a+|d+)(\d+)$/);

  if (!intervalLabelMatch) {
    throw new Error(`Invalid interval label: ${intervalLabel}`);
  }

  const noteMatch = baseNote.match(/^([A-Ga-g])([#b]*)(\d+)$/);

  if (!noteMatch) {
    throw new Error(`Invalid note format: ${baseNote}`);
  }

  const parsedBase = Note(baseNote);
  const parsedInterval = Interval(intervalLabel);

  console.log("BASENOtE: ", parsedBase.baseNote);
  console.log("QUANTITY: ", parsedInterval.quantity);

  const startIndex = NOTES.findIndex((note) => note === parsedBase.baseNote);
  const endIndex = startIndex + parsedInterval.quantity;

  const secondBase = NOTES[endIndex - 1];
  console.log(secondBase);
}
