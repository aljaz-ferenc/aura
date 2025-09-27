"use client";

import { useShallow } from "zustand/react/shallow";
import { useExerciseStore } from "@/lib/store/useExerciseStore";

export default function InterfaceScore() {
  const { history } = useExerciseStore(useShallow((state) => state));
  return (
    <div className="mb-2">
      <span className="text-muted-foreground">Score: </span>
      <span className="font-bold">
        {
          history
            .map((g) => g.wasGuessCorrect)
            .filter((wasCorrect) => Boolean(wasCorrect)).length
        }
        /{history.length}
      </span>
    </div>
  );
}
