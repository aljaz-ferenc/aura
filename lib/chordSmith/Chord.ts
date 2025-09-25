import { getIntervalBetween } from "@/lib/chordSmith/Interval";
import { type Duration, sampler, type TNote } from "@/lib/chordSmith/index";
import type { Note } from "@/lib/chordSmith/Note";

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

const chords = {
  maj: {
    intervals: ["M3", "m3"],
  },
};

export function Chord(label: string, baseNote: TNote) {
  const notes = [baseNote, getIntervalBetween(baseNote)];
}
