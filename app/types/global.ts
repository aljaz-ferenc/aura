import type { Chord } from "@/lib/engine/Chord";
import type { Interval } from "@/lib/engine/Interval";
import type { Scale } from "@/lib/engine/Scale";

export type ExerciseCategory = "intervals" | "chords" | "scale" | "rhythm";
export type SessionMode = "practice" | "test";
export type MusicElement = Interval | Chord | Scale;
