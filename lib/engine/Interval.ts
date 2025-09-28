import { sampler } from "@/lib/chordSmith";
import { Note } from "@/lib/engine/Note";

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

  public static from(bassNote: Note, intervalSymbol: string) {
    const match = intervalSymbol.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match) throw new Error(`Invalid interval: ${intervalSymbol}`);

    return new Interval([bassNote, bassNote.transpose(intervalSymbol)]);
  }

  public static random(intervalSymbols: string[]) {
    const randomSymbol =
        intervalSymbols[Math.floor(Math.random() * intervalSymbols.length)];

    const match = randomSymbol.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match)
      throw new Error(
        `Invalid interval label when generating random interval: ${randomSymbol}`,
      );

    const randomInterval = Interval.from(Note.random(), randomSymbol);

    return {
      element: randomInterval,
      label: randomSymbol,
    };
  }
}
