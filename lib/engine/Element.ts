import type { Note } from "@/lib/engine/Note";

type IntervalLabel = "P1" | "m2" | "m3";
type ChordLabel = "maj" | "min" | "dim" | "aug";
type ScaleLabel = "ionian" | "dorian" | "locrian";

type Label = IntervalLabel | ChordLabel | ScaleLabel;

export interface MusicElement<T> {
  notes: Note[];
  play(mode: "harmonic" | "melodic" | "reversed"): Promise<void>;
  from(rootNote: Note, label: string): T;
  random(availableLabels: Label[]): T;
}
