import { z } from "zod";
import type { CATEGORIES } from "@/lib/constants/categories";
import type { Chord } from "@/lib/engine/Chord";
import type { Interval } from "@/lib/engine/Interval";
import type { Note } from "@/lib/engine/Note";
import type { Scale } from "@/lib/engine/Scale";

export type SessionMode = "free" | "test";
export type MusicElement = Interval | Chord | Scale;

export const exerciseCategorySchema = z.enum([
  "intervals",
  "chords",
  "scales",
  "rhythm",
]);
export type ExerciseCategory = z.infer<typeof exerciseCategorySchema>;

export const exerciseTypeSchema = z.enum([
  "listening",
  "singing",
  "constructing",
  "tapping",
]);
export type ExerciseType = z.infer<typeof exerciseTypeSchema>;

export type ElementData = IntervalData | ChordData | ScaleData;

type ElementBase = {
  symbol: string;
  fullName: string;
  category: string;
};

export type IntervalData = {} & ElementBase;

export type ChordData = {
  type: string;
  schema: string[];
} & ElementBase;

export type ScaleData = {
  type: string;
  schema: string[];
} & ElementBase;

export type SessionStatus =
  | "loading"
  | "ready"
  | "playing"
  | "checking"
  | "error";

export type Category = (typeof CATEGORIES)[0];

export interface MusicElementClass<T extends MusicElement> {
  new (notes: Note[]): T;
  random(selectedLabels: string[]): { element: T; label: string };
}
