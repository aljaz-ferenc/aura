import { type Duration, type Note, sampler } from "@/lib/chordSmith/index";

export class ChordClass {
  notes: Note[] = [];
  duration: Duration = 0;

  constructor(notes: Note[], duration: Duration = 3) {
    this.notes = notes;
    this.duration = duration;
  }

  async play() {
    await sampler.playChord(this.notes, this.duration);
  }
}
