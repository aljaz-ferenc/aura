import { Accidental, StaveNote } from "vexflow";
import type { MusicElement } from "@/app/types";

// Convert Note objects to VexFlow StaveNote (harmonic, for chords and intervals)
export function getHarmonicNotes(element: MusicElement) {
  const keys: string[] = [];
  const baseNotes = element.notes;
  baseNotes.forEach((note) => {
    keys.push(`${note.base.toLowerCase()}/${note.octave}`);
  });

  const finalNote = new StaveNote({
    keys,
    duration: "w",
    clef: "treble",
  });

  baseNotes.forEach((note, index) => {
    if (note.accidentals.sharps > 0) {
      const accidentalType =
        //TODO: make dynamic so it accepts n accidentals
        note.accidentals.sharps === 1
          ? "#"
          : note.accidentals.sharps === 2
            ? "##"
            : "###";
      finalNote.addModifier(new Accidental(accidentalType), index);
    } else if (note.accidentals.flats > 0) {
      const accidentalType =
        note.accidentals.flats === 1
          ? "b"
          : note.accidentals.flats === 2
            ? "bb"
            : "bbb";
      finalNote.addModifier(new Accidental(accidentalType), index);
    }
  });

  return [finalNote];
}
