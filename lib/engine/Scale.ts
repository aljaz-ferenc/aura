import { sampler } from "@/lib/chordSmith";
import { Note } from "@/lib/engine/Note";
import {SCALES_DATA, ScaleSymbol} from "@/lib/constants/scalesData";

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
    const schema = SCALES_DATA.find(option => scaleSymbol === option.symbol)?.schema

      if(!schema){
          throw new Error(`Schema for scale symbol ${scaleSymbol} not found.`)
      }

    const notes = [rootNote];
    let currentNote = rootNote;

    for (const interval of schema) {
      currentNote = currentNote.transpose(interval);
      notes.push(currentNote);
    }
    return new Scale(notes);
  }

  static random(scaleSymbols: ScaleSymbol[]) {
    const randomSymbol =
        scaleSymbols[Math.floor(Math.random() * scaleSymbols.length)];
    const randomScale = Scale.from(Note.random(), randomSymbol as ScaleSymbol);

    return {
      element: randomScale,
      label: randomSymbol,
    };
  }
}
