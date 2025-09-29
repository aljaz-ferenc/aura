import { type ChordSymbol, chordLibrary } from "@/lib/constants/chordsData";
import { Note } from "@/lib/engine/Note";
import { sampler } from "@/lib/engine/Sampler";

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
    const schema = chordLibrary.find(
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

  private static hasTooManyAccidents(scale: Chord) {
    return scale.notes.some(
      (n) => n.accidentals.sharps > 2 || n.accidentals.flats > 2,
    );
  }

  public static random(availableSymbols: ChordSymbol[]) {
    let randomSymbol =
      availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
    let randomChord = Chord.from(Note.random(), randomSymbol);

    for (let i = 0; i < 4; i++) {
      if (!Chord.hasTooManyAccidents(randomChord)) {
        break;
      }

      randomSymbol =
        availableSymbols[Math.floor(Math.random() * availableSymbols.length)];
      randomChord = Chord.from(Note.random(), randomSymbol);
    }

    return {
      element: randomChord,
      label: randomSymbol,
    };
  }
}
