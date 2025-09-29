import { type ScaleSymbol, scaleLibrary } from "@/lib/constants/scalesData";
import { Note } from "@/lib/engine/Note";
import { sampler } from "@/lib/engine/Sampler";

export class Scale {
  notes: Note[];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  async play(mode: "melodic" | "reversed" = "melodic") {
    await sampler?.playScale({
      notes: this.notes.map((note) => note.label),
      mode,
    });
  }

  static from(rootNote: Note, scaleSymbol: ScaleSymbol) {
    const schema = scaleLibrary.find(
      (option) => scaleSymbol === option.symbol,
    )?.schema;

    if (!schema) {
      throw new Error(`Schema for scale symbol ${scaleSymbol} not found.`);
    }

    const notes = [rootNote];
    let currentNote = rootNote;

    for (const interval of schema) {
      currentNote = currentNote.transpose(interval);
      notes.push(currentNote);
    }
    return new Scale(notes);
  }

  private static hasTooManyAccidents(scale: Scale) {
    return scale.notes.some(
      (n) => n.accidentals.sharps > 2 || n.accidentals.flats > 2,
    );
  }

  static random(scaleSymbols: ScaleSymbol[]) {
    let randomSymbol =
      scaleSymbols[Math.floor(Math.random() * scaleSymbols.length)];
    let randomScale = Scale.from(Note.random(), randomSymbol as ScaleSymbol);

    for (let i = 0; i < 3; i++) {
      if (!Scale.hasTooManyAccidents(randomScale)) {
        break;
      }

      randomSymbol =
        scaleSymbols[Math.floor(Math.random() * scaleSymbols.length)];
      randomScale = Scale.from(Note.random(), randomSymbol as ScaleSymbol);
    }

    return {
      element: randomScale,
      label: randomSymbol,
    };
  }
}
