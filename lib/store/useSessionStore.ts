import { create } from "zustand/react";
import type { ExerciseCategory, SessionMode } from "@/app/types";

type Summary = {
  startTime: number;
  endTime: number;
  category: ExerciseCategory;
  attempts: number;
  overallAccuracy: number;
  longestStreak: number;
};

type SessionStore = {
  sessionId: string;
  mode: SessionMode;
  summary: Summary;
};

export const useSessionStore = create((set) => ({}));
