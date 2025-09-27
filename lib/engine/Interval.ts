import { sampler } from "@/lib/chordSmith";
import { Note } from "@/lib/engine/Note";

export class Interval {
  notes: Note[];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  async play(mode: "harmonic" | "melodic" | "reversed" = "harmonic") {
    await sampler.playInterval({
      notes: this.notes.map((n) => n.label),
      mode,
    });
  }

  static from(bassNote: Note, intervalLabel: string) {
    const match = intervalLabel.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match) throw new Error(`Invalid interval: ${intervalLabel}`);

    return new Interval([bassNote, bassNote.transpose(intervalLabel)]);
  }

  static random(intervalLabels: string[]) {
    const randomLabel =
      intervalLabels[Math.floor(Math.random() * intervalLabels.length)];

    const match = randomLabel.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match)
      throw new Error(
        `Invalid interval label when generating random interval: ${randomLabel}`,
      );

    const randomInterval = Interval.from(Note.random(), randomLabel);

    return {
      element: randomInterval,
      label: randomLabel,
    };
  }
}
