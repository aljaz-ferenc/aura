import { sampler } from "@/lib/chordSmith";
import type { Note } from "@/lib/engine/Note";

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
}
