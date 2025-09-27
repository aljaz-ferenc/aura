import { sampler } from "@/lib/chordSmith";
import { CHORD_OPTIONS } from "@/lib/constants/asnwersOptions";
import { Note } from "@/lib/engine/Note";

const CHORD_SCHEMAS = {
  // Triads
  maj: ["M3", "m3"],
  min: ["m3", "M3"],
  dim: ["m3", "m3"],
  aug: ["M3", "M3"],

  // Seventh Chords
  maj7: ["M3", "m3", "M3"], // C E G B
  min7: ["m3", "M3", "m3"], // C Eb G Bb
  dom7: ["M3", "m3", "m3"], // C E G Bb
  dim7: ["m3", "m3", "m3"], // C Eb Gb A (Bb♭♭)
  halfDim7: ["m3", "m3", "M3"], // C Eb Gb Bb

  // Sixth Chords
  maj6: ["M3", "m3", "M2"], // C E G A
  min6: ["m3", "M3", "M2"], // C Eb G A

  // Ninth Chords (you can build these as 7th chords + 9th)
  maj9: ["M3", "m3", "M3", "m3"], // C E G B D
  min9: ["m3", "M3", "m3", "M3"], // C Eb G Bb D
  dom9: ["M3", "m3", "m3", "M3"], // C E G Bb D

  // Suspended Chords
  sus2: ["M2", "P4"], // C D G
  sus4: ["P4", "M2"], // C F G

  // Add9 Chords (triad + 9th, no 7th)
  add9: ["M3", "m3", "P5"], // C E G D (stacked as P5 from the 3rd)
  madd9: ["m3", "M3", "P5"], // C Eb G D

  // Eleventh Chords
  maj11: ["M3", "m3", "M3", "m3", "M3"], // C E G B D F
  min11: ["m3", "M3", "m3", "M3", "m3"], // C Eb G Bb D F
  dom11: ["M3", "m3", "m3", "M3", "m3"], // C E G Bb D F

  // Thirteenth Chords
  maj13: ["M3", "m3", "M3", "m3", "M3", "m3"], // C E G B D F A
  min13: ["m3", "M3", "m3", "M3", "m3", "M3"], // C Eb G Bb D F A
  dom13: ["M3", "m3", "m3", "M3", "m3", "M3"], // C E G Bb D F A
} as const;

type ChordType = keyof typeof CHORD_SCHEMAS;

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

  static from(rootNote: Note, chordType: ChordType): Chord {
    const schema = CHORD_OPTIONS.find(
      (chord) => chord.symbol === chordType,
    )?.schema;

    if (!schema) {
      throw new Error(`Chord schema for ${chordType} does not exist.`);
    }
    const notes = [rootNote];
    let currentNote = rootNote;

    for (const interval of schema) {
      currentNote = currentNote.transpose(interval);
      notes.push(currentNote);
    }

    return new Chord(notes);
  }

  static random(chordTypes: string[]) {
    const randomType =
      chordTypes[Math.floor(Math.random() * chordTypes.length)];
    const randomChord = Chord.from(Note.random(), randomType as ChordType);

    return {
      element: randomChord,
      label: randomType,
    };
  }
}
