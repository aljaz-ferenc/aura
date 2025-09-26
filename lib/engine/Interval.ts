import { sampler } from "@/lib/chordSmith";
import { Note } from "@/lib/engine/Note";

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

  static from(bassNote: Note, interval: string) {
    const match = interval.match(/^([A]+|[d]+|P|M|m)(\d+)$/);
    if (!match) throw new Error(`Invalid interval: ${interval}`);

    return new Interval(bassNote, bassNote.transpose(interval));
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
      interval: randomInterval,
      label: randomLabel,
    };
  }
}
