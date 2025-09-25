"use client";

import { Chord, Interval, Note } from "@/lib/engine/Note";

const note1 = new Note("C#4");
const note2 = new Note("E#4");
const note3 = new Note("G#4");
const interval = new Interval(note1, note2);
const chord = new Chord([note1, note2, note3]);

export default function PianoChord() {
  return (
    <div className="text-red-500">
      <button type="button" onClick={() => interval.play()}>
        Play Interval
      </button>
      <button onClick={() => note1.play()} type="button">
        Play note
      </button>
      <button onClick={() => chord.play("reversed")} type="button">
        Play chord
      </button>
    </div>
  );
}
