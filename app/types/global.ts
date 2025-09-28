import { z } from "zod";
import type { CATEGORIES } from "@/lib/constants/categories";
import type { Chord } from "@/lib/engine/Chord";
import type { Interval } from "@/lib/engine/Interval";
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

export type AnswerOption = {
  symbol: string;
  fullName: string;
  category?: string;
  type?: string;
  schema?: string[];
};

export type SessionStatus = "loading" | "ready" | "playing" | 'checking' | "error";

export type Category = (typeof CATEGORIES)[0];
