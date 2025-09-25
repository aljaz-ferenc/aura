"use client";

import { Chord, Interval, Note } from "@/lib/engine/Note";

const note1 = new Note("D4");
const note2 = new Note("E4");
const note3 = new Note("G4");
const transposed = note1.transpose("ddd4");
// const transposed = note1.transpose("M3");
console.log("TRANSPOSED: ", transposed);
const interval = new Interval(note1, note2);
const chord = new Chord([note1, transposed, note3]);

// console.log("ORIGINAL: ", note1);
// console.log("ORIGINAL: ", note1);

export default function PianoChord() {
  return (
    <div className="text-red-500">
      <button type="button" onClick={() => interval.play()}>
        Play Interval
      </button>
      <button onClick={() => note1.play()} type="button">
        Play note
      </button>
      <button onClick={() => chord.play()} type="button">
        Play chord
      </button>
    </div>
  );
}
