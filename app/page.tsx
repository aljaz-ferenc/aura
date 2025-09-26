"use client";

import { Chord } from "@/lib/engine/Chord";
import { Interval } from "@/lib/engine/Interval";
import { Note } from "@/lib/engine/Note";

const note1 = new Note("A3");

const maj = Chord.from(note1, "maj11");
// const min = Chord.from(note1, "min");
// const dim = Chord.from(note1, "dim");
// const aug = Chord.from(note1, "aug");

const transposed = note1.transpose("M6");

const int = new Interval(note1, transposed);

// console.log(maj);

const interval = Interval.from(note1, "M6");

export default function PianoChord() {
  return (
    <div className="text-red-500">
      <button type="button" onClick={() => int.play("melodic")}>
        Play Interval
      </button>
      <button onClick={() => note1.play()} type="button">
        Play note
      </button>
      <button onClick={() => maj.play("melodic")} type="button">
        maj
      </button>
      {/*<button onClick={() => min.play()} type="button">*/}
      {/*  min*/}
      {/*</button>*/}
      {/*<button onClick={() => dim.play()} type="button">*/}
      {/*  dim*/}
      {/*</button>*/}
      {/*<button onClick={() => aug.play()} type="button">*/}
      {/*  aug*/}
      {/*</button>*/}
    </div>
  );
}
