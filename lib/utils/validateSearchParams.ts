import { redirect } from "next/navigation";
import { z } from "zod";
import { exerciseCategorySchema, exerciseTypeSchema } from "@/app/types";

export function validateSearchParams(searchParams: string[]) {
  const category = searchParams[0];
  const exercise = searchParams[1];

  if (searchParams.some((s) => !s)) return;

  const exerciseValidation = z.safeParse(exerciseCategorySchema, category);
  const categoryValidation = z.safeParse(exerciseTypeSchema, exercise);

  if (!exerciseValidation.success || !categoryValidation.success) {
    redirect("/free-practice");
  }

  if (!searchParams) return;
}
