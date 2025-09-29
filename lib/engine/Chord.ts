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

  private static invert(chord: Chord, inversion: number) {
    if (inversion > chord.notes.length - 1) {
      throw new Error(`Inversion too large: ${inversion}.`);
    }
    const notes = chord.notes.map((n) => n);
    const removedNotes = notes.splice(0, inversion);
    const transposedNotes = removedNotes.map((note) => note.transpose("P8"));
    notes.push(...transposedNotes);

    return new Chord(notes);
  }

  public static from(
    rootNote: Note,
    chordSymbol: ChordSymbol,
    options?: { inversion: number },
  ): Chord {
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

    const chord = new Chord(notes);

    if (options?.inversion) {
      return Chord.invert(chord, options.inversion);
    }
    return chord;
  }

  private static hasTooManyAccidents(scale: Chord) {
    return scale.notes.some(
      (n) => n.accidentals.sharps > 2 || n.accidentals.flats > 2,
    );
  }

  public static random(availableSymbols: ChordSymbol[], inversion?: number) {
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

    if (inversion) {
      randomChord = Chord.invert(randomChord, inversion);
    }

    return {
      element: randomChord,
      label: randomSymbol,
      inversion: inversion,
    };
  }
}
