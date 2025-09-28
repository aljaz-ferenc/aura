import { sampler } from "@/lib/engine/Sampler";

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

  private static readonly BASES = ["C", "D", "E", "F", "G", "A", "B"];

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
    const number = Number(numberStr);

    const majorScale = Note.MAJOR_SCALES[this.base];
    if (!majorScale) throw new Error(`Invalid base note: ${this.base}`);

    const scaleIndex = (number - 1) % 7;
    const targetNoteBase = majorScale[scaleIndex];

    // Get the base letter names (without accidentals)
    const startLetter = this.base;
    const targetLetter = targetNoteBase.replace(/[#b]/, "");

    // Find their positions in the note alphabet
    const noteLetters = ["C", "D", "E", "F", "G", "A", "B"];
    const startIndex = noteLetters.indexOf(startLetter);
    const targetIndex = noteLetters.indexOf(targetLetter);

    // Calculate octave change
    let octaveChange = Math.floor((number - 1) / 7);

    // Additional octave change if the target letter comes before the start letter
    // (e.g., A → F, B → G, etc.)
    if (targetIndex < startIndex) {
      octaveChange += 1;
    }

    const newOctave = this.octave + octaveChange;

    const naturalSemitones =
      Note.MAJOR_SCALE_SEMITONES[scaleIndex] + octaveChange * 12;
    const qualityAdjustment = this.getQualityAdjustment(quality, number);
    const requiredSemitones = naturalSemitones + qualityAdjustment;

    const accidentals = this.calculateAccidentals(
      targetNoteBase,
      requiredSemitones - naturalSemitones,
    );

    return new Note(`${targetLetter}${accidentals}${newOctave}`);
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
    // const baseNote = targetNoteBase.replace(/[#b]/, "");
    // const baseSemitones =
    //   Note.MAJOR_SCALE_SEMITONES[
    //     ["C", "D", "E", "F", "G", "A", "B"].indexOf(baseNote)
    //   ];

    // Count existing accidentals in the scale note
    const existingSharps =
      (targetNoteBase.match(/#/g) || []).length + this.accidentals.sharps;
    const existingFlats =
      (targetNoteBase.match(/b/g) || []).length + this.accidentals.flats;
    const existingAdjustment = existingSharps - existingFlats;

    const totalAdjustment = existingAdjustment + semitoneAdjustment;

    if (totalAdjustment > 0) return "#".repeat(totalAdjustment);
    if (totalAdjustment < 0) return "b".repeat(Math.abs(totalAdjustment));
    return "";
  }

  static random() {
    const base = Note.BASES[Math.floor(Math.random() * Note.BASES.length)];
    const includeAccidentals = Math.random() > 0.5;
    const accidentalType = includeAccidentals
      ? Math.random() > 0.5
        ? "#"
        : "b"
      : "";
    const octaves = [3, 4, 5];
    const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];

    const noteLabel = base + accidentalType + randomOctave.toString();
    return new Note(noteLabel);
  }
}
