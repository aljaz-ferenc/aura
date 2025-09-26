import { sampler } from "@/lib/chordSmith";
import type { Note } from "@/lib/engine/Note";

const SCALE_SCHEMAS = {
  // Major and Minor Scales
  major: ["M2", "M2", "m2", "M2", "M2", "M2", "m2"],
  naturalMinor: ["M2", "m2", "M2", "M2", "m2", "M2", "M2"],
  harmonicMinor: ["M2", "m2", "M2", "M2", "m2", "A2", "m2"],
  melodicMinor: ["M2", "m2", "M2", "M2", "M2", "M2", "m2"],

  // Modes of Major Scale
  ionian: ["M2", "M2", "m2", "M2", "M2", "M2", "m2"],
  dorian: ["M2", "m2", "M2", "M2", "M2", "m2", "M2"],
  phrygian: ["m2", "M2", "M2", "M2", "m2", "M2", "M2"],
  lydian: ["M2", "M2", "M2", "m2", "M2", "M2", "m2"],
  mixolydian: ["M2", "M2", "m2", "M2", "M2", "m2", "M2"],
  aeolian: ["M2", "m2", "M2", "M2", "m2", "M2", "M2"],
  locrian: ["m2", "M2", "M2", "m2", "M2", "M2", "M2"],

  // Pentatonic Scales
  majorPentatonic: ["M2", "M2", "m3", "M2", "m3"],
  minorPentatonic: ["m3", "M2", "M2", "m3", "M2"],
  blues: ["m3", "M2", "m2", "m2", "m3", "M2"],

  // Other Common Scales
  wholeTone: ["M2", "M2", "M2", "M2", "M2", "M2"],
  chromatic: [
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
    "m2",
  ],
  octatonic: ["m2", "M2", "m2", "M2", "m2", "M2", "m2", "M2"], // Half-whole diminished
  octatonic2: ["M2", "m2", "M2", "m2", "M2", "m2", "M2", "m2"], // Whole-half diminished

  // World Music Scales
  hirajoshi: ["M2", "m2", "M3", "m2", "M3"],
  inSen: ["m2", "M3", "M2", "M3", "m2"],
  yo: ["M2", "M3", "M2", "M3", "M2"],
  arabic: ["m2", "A2", "m2", "M2", "m2", "A2", "m2"], // Arabic scale
  hungarianMinor: ["M2", "m2", "A2", "m2", "m2", "A2", "m2"], // Gypsy scale

  // Jazz Scales
  bebopDominant: ["M2", "M2", "m2", "M2", "M2", "m2", "m2", "m2"],
  bebopMajor: ["M2", "M2", "m2", "M2", "m2", "m2", "M2", "m2"],
  bebopMinor: ["M2", "m2", "m2", "M2", "M2", "m2", "M2", "m2"],

  // Synthetic Scales
  neapolitanMajor: ["m2", "M2", "M2", "M2", "M2", "M2", "m2"],
  neapolitanMinor: ["m2", "M2", "M2", "M2", "m2", "M2", "M2"],
  enigmatic: ["m2", "A2", "A2", "A2", "m2", "m2", "m2"],

  // Ragas (Indian Classical)
  ragaBhairavi: ["m2", "A2", "m2", "M2", "m2", "A2", "m2"],
  ragaTodi: ["m2", "A2", "A2", "m2", "M2", "A2", "m2"],
} as const;

type ScaleType = keyof typeof SCALE_SCHEMAS;

export class Scale {
  root: Note;
  type: ScaleType;
  notes: Note[];

  constructor(root: Note, type: ScaleType) {
    this.root = root;
    this.type = type;
    this.notes = this.generateScale();
  }

  private generateScale(): Note[] {
    const intervals = SCALE_SCHEMAS[this.type];
    const notes = [this.root];
    let currentNote = this.root;

    for (const interval of intervals) {
      currentNote = currentNote.transpose(interval);
      notes.push(currentNote);
    }

    return notes;
  }

  async play(mode: "melodic" | "reversed" = "melodic") {
    await sampler?.playScale({
      notes: this.notes.map((note) => note.label),
      mode,
    });
  }
}
