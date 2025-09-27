// lib/getMelodicNotes.ts
import { Accidental, StaveNote } from "vexflow";
import type { MusicElement } from "@/app/types";

export function getMelodicNotes(element: MusicElement) {
  const notes = [];

  for (const note of element.notes) {
    const key = `${note.base.toLowerCase()}/${note.octave}`;
    const staveNote = new StaveNote({
      keys: [key],
      duration: "w", // Keep whole notes!
      clef: "treble",
    });

    // Add accidentals if needed
    if (note.accidentals.sharps > 0) {
      const accidentalType =
        note.accidentals.sharps === 1
          ? "#"
          : note.accidentals.sharps === 2
            ? "##"
            : "###";
      staveNote.addModifier(new Accidental(accidentalType), 0);
    } else if (note.accidentals.flats > 0) {
      const accidentalType =
        note.accidentals.flats === 1
          ? "b"
          : note.accidentals.flats === 2
            ? "bb"
            : "bbb";
      staveNote.addModifier(new Accidental(accidentalType), 0);
    }

    notes.push(staveNote);
  }

  return notes;
}
