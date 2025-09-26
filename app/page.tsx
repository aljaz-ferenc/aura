"use client";

import { Chord } from "@/lib/engine/Chord";
import { Interval } from "@/lib/engine/Interval";
import { Note } from "@/lib/engine/Note";
import { Scale } from "@/lib/engine/Scale";

const note1 = new Note("A3");

const scale = new Scale(note1, "blues");
console.log(scale.notes);

export default function PianoChord() {
  return (
    <div className="text-red-500">
      <button type="button" onClick={() => scale.play('reversed')}>
        Play scale
      </button>
    </div>
  );
}
