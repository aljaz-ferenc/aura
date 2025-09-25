"use client";

import { getIntervalBetween, Interval } from "@/lib/chordSmith/Interval";
import { Note } from "@/lib/chordSmith/Note";

const int = getIntervalBetween([Note("C4"), Note("Gb5")]);
console.log(int);

export default function PianoChord() {
  return (
    <div className="flex flex-col">
      <button type="button" onClick={() => int.play(true)}>
        Play Interval
      </button>
      <button onClick={() => Note("C#4").play()} type="button">
        Play C-G
      </button>
    </div>
  );
}
