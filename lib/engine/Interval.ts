import { Note } from "@/lib/engine/Note";
import { sampler } from "@/lib/engine/Sampler";

export class Interval {
  notes: Note[];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  public async play(mode: "harmonic" | "melodic" | "reversed" = "harmonic") {
    await sampler.playInterval({
      notes: this.notes.map((n) => n.label),
      mode,
    });
  }

  private static validateSymbol(symbol: string) {
    const match = symbol.match(/^(A+|d+|P|M|m)(\d+)$/);
    if (!match) throw new Error(`Invalid interval: ${symbol}`);
  }

  public static from(bassNote: Note, intervalSymbol: string) {
    Interval.validateSymbol(intervalSymbol);
    return new Interval([bassNote, bassNote.transpose(intervalSymbol)]);
  }

  private static hasTooManyAccidents(scale: Interval) {
    return scale.notes.some(
      (n) => n.accidentals.sharps > 2 || n.accidentals.flats > 2,
    );
  }

  public static random(intervalSymbols: string[]) {
    let randomSymbol =
      intervalSymbols[Math.floor(Math.random() * intervalSymbols.length)];
    Interval.validateSymbol(randomSymbol);

    let randomInterval = Interval.from(Note.random(), randomSymbol);

    for (let i = 3; i < 4; i++) {
      if (!Interval.hasTooManyAccidents(randomInterval)) {
        break;
      }
      randomSymbol =
        intervalSymbols[Math.floor(Math.random() * intervalSymbols.length)];
      Interval.validateSymbol(randomSymbol);

      randomInterval = Interval.from(Note.random(), randomSymbol);
    }

    return {
      element: randomInterval,
      label: randomSymbol,
    };
  }
}
