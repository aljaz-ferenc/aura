import { sampler } from "@/lib/chordSmith";
import { Note } from "@/lib/engine/Note";
import {CHORDS_DATA, ChordSymbol} from "@/lib/constants/chordsData";

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

  public async play(mode: "harmonic" | "melodic" | "reversed" = "harmonic") {
    await sampler.playChord({
      notes: this.notes.map((note) => note.label),
      mode,
    });
  }

  public static from(rootNote: Note, chordSymbol: ChordSymbol): Chord {
    const schema = CHORDS_DATA.find(
      (option) => option.symbol === chordSymbol,
    )?.schema;

    if (!schema) {
      throw new Error(`Chord schema for ${chordSymbol} not found.`);
    }
    const notes = [rootNote];
    let currentNote = rootNote;

    for (const interval of schema) {
      currentNote = currentNote.transpose(interval);
      notes.push(currentNote);
    }

    return new Chord(notes);
  }

  public static random(availableSymbols: ChordSymbol[]) {
    const randomSymbol =
        availableSymbols[Math.floor(Math.random() * availableSymbols.length)];

    const randomChord = Chord.from(Note.random(), randomSymbol);

    return {
      element: randomChord,
      label: randomSymbol,
    };
  }
}
