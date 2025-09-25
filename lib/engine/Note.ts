import { sampler } from "@/lib/chordSmith";

export type Accidentals = { sharps: number } | { flats: number };

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const INTERVAL_QUALITIES = {
  P: [0, 3, 4, 7, 8, 11], // Perfect: 1, 4, 5, 8, 11, 12
  M: [1, 2, 5, 6, 9, 10], // Major: 2, 3, 6, 7, 9, 10
  m: [1, 2, 5, 6, 9, 10], // Minor (same distances, different context)
  d: [0, 3, 4, 7, 8, 11], // Diminished
  A: [1, 2, 5, 6, 9, 10], // Augmented
};

const INTERVAL_SEMITONES = {
  P1: 0,
  d2: 0,
  m2: 1,
  a1: 1,
  M2: 2,
  d3: 2,
  m3: 3,
  a2: 3,
  M3: 4,
  d4: 4,
  P4: 5,
  a3: 5,
  d5: 6,
  a4: 6,
  P5: 7,
  d6: 7,
  m6: 8,
  a5: 8,
  M6: 9,
  d7: 9,
  m7: 10,
  a6: 10,
  M7: 11,
  d8: 11,
  P8: 12,
  a7: 12,
};

export class Note {
  base: string;
  octave: number;
  label: string;
  accidentals: Accidentals;

  constructor(label: string) {
    const match = label.match(/^([A-Ga-g])([#b]*)(\d+)$/);

    if (!match) {
      throw new Error(`Invalid note format: ${label}`);
    }

    const [, base, accidentalStr, octaveStr] = match;
    this.label = label;
    this.base = base;
    this.octave = +octaveStr;
    this.accidentals = accidentalStr.startsWith("#")
      ? { sharps: accidentalStr.length }
      : { flats: accidentalStr.length };
  }

  async play() {
    await sampler.playNote(this.label);
  }
}

export class Interval {
  note1: Note;
  note2: Note;

  constructor(note1: Note, note2: Note) {
    this.note1 = note1;
    this.note2 = note2;
  }

  async play(mode: "harmonic" | "melodic" | "reversed" = "harmonic") {
    await sampler.playInterval({
      notes: [this.note1.label, this.note2.label],
      mode,
    });
  }
}

export class Chord {
  notes: Note[];

  constructor(notes: Note[]) {
    if (notes.length < 3) {
      throw new Error(
        `Chord must have at least three notes. You provided: ${notes.length}.`,
      );
    }

    this.notes = notes;
  }

  async play(mode: "harmonic" | "melodic" | "reversed" = "harmonic") {
    await sampler.playChord({
      notes: this.notes.map((note) => note.label),
      mode,
    });
  }
}
