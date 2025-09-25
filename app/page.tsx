"use client";

import { getIntervalBetween, Interval } from "@/lib/chordSmith/Interval";
import { Note } from "@/lib/chordSmith/Note";

const int = getIntervalBetween([Note("F#4"), Note("D4")]);

export default function PianoChord() {
  return (
    <div className="flex flex-col">
      <button type="button" onClick={() => int.play(true)}>
        Play Interval
      </button>
      {/*<button*/}
      {/*  onClick={() => Chord.play(["C4", "E4", "G4", "F4"], 2)}*/}
      {/*  type="button"*/}
      {/*>*/}
      {/*  Play C Major Chord*/}
      {/*</button>*/}
      {/*<button onClick={() => sampler.playNote("C4", 2)} type="button">*/}
      {/*  Play C*/}
      {/*</button>*/}
      <button onClick={() => Note("C#4").play()} type="button">
        Play C-G
      </button>
    </div>
  );
}
