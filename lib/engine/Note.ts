import { sampler } from "@/lib/chordSmith";

export type Accidentals = { sharps: number; flats: number };

export class Note {
  base: string;
  octave: number;
  label: string;
  accidentals: Accidentals = { sharps: 0, flats: 0 };

  constructor(label: string) {
    const match = label.match(/^([A-Ga-g])([#b]*)(\d+)$/);

    if (!match) {
      throw new Error(`Invalid note format: ${label}`);
    }

    const [, base, accidentalStr, octaveStr] = match;
    this.label = label;
    this.base = base.toUpperCase();
    this.octave = +octaveStr;

    if (accidentalStr.includes("#")) {
      this.accidentals = { sharps: accidentalStr.length, flats: 0 };
    } else if (accidentalStr.includes("b")) {
      this.accidentals = { sharps: 0, flats: accidentalStr.length };
    } else {
      this.accidentals = { sharps: 0, flats: 0 };
    }
  }

  async play() {
    await sampler.playNote(this.label);
  }

  private static readonly MAJOR_SCALES: { [key: string]: string[] } = {
    C: ["C", "D", "E", "F", "G", "A", "B"],
    D: ["D", "E", "F#", "G", "A", "B", "C#"],
    E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
    F: ["F", "G", "A", "Bb", "C", "D", "E"],
    G: ["G", "A", "B", "C", "D", "E", "F#"],
    A: ["A", "B", "C#", "D", "E", "F#", "G#"],
    B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  };

  // Semitones for each scale degree (1-based index)
  private static readonly MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];

  transpose(intervalLabel: string): Note {
    const match = intervalLabel.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match) throw new Error(`Invalid interval: ${intervalLabel}`);

    const [, quality, numberStr] = match;
    const number = parseInt(numberStr);

    const majorScale = Note.MAJOR_SCALES[this.base];
    if (!majorScale) throw new Error(`Invalid base note: ${this.base}`);

    const scaleIndex = (number - 1) % 7;
    const targetNoteBase = majorScale[scaleIndex];

    const octaveChange = Math.floor((number - 1) / 7);
    const newOctave = this.octave + octaveChange;

    const naturalSemitones =
      Note.MAJOR_SCALE_SEMITONES[scaleIndex] + octaveChange * 12;

    const qualityAdjustment = this.getQualityAdjustment(quality, number);
    const requiredSemitones = naturalSemitones + qualityAdjustment;

    const accidentals = this.calculateAccidentals(
      targetNoteBase,
      requiredSemitones - naturalSemitones,
    );

    return new Note(
      `${targetNoteBase.replace(/[#b]/, "")}${accidentals}${newOctave}`,
    );
  }

  private getQualityAdjustment(quality: string, number: number): number {
    const isPerfect = [1, 4, 5, 8].includes(((number - 1) % 7) + 1);

    const adjustments: { [key: string]: number } = {
      P: 0,
      M: 0, // Perfect/Major: no change from major scale
      m: -1, // Minor: 1 semitone down from major
      d: isPerfect ? -1 : -2, // Diminished: 1 down from perfect, 2 down from major
      A: 1, // Augmented: 1 up
      AA: 2,
      AAA: 3, // Multiple augmentations
      dd: isPerfect ? -2 : -3, // Double diminished
      ddd: isPerfect ? -3 : -4, // Triple diminished
    };

    return adjustments[quality] || 0;
  }

  private calculateAccidentals(
    targetNoteBase: string,
    semitoneAdjustment: number,
  ): string {
    // Remove existing accidentals from the scale note and apply adjustment
    const baseNote = targetNoteBase.replace(/[#b]/, "");
    const baseSemitones =
      Note.MAJOR_SCALE_SEMITONES[
        ["C", "D", "E", "F", "G", "A", "B"].indexOf(baseNote)
      ];

    // Count existing accidentals in the scale note
    const existingSharps = (targetNoteBase.match(/#/g) || []).length;
    const existingFlats = (targetNoteBase.match(/b/g) || []).length;
    const existingAdjustment = existingSharps - existingFlats;

    const totalAdjustment = existingAdjustment + semitoneAdjustment;

    if (totalAdjustment > 0) return "#".repeat(totalAdjustment);
    if (totalAdjustment < 0) return "b".repeat(Math.abs(totalAdjustment));
    return "";
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
