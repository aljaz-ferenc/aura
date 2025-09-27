import { exerciseCategorySchema, exerciseTypeSchema } from "@/app/types";

export function validateSearchParams(
  searchParams: (string | undefined)[],
): boolean {
  const category = searchParams[0];
  const exercise = searchParams[1];

  if (!category || !exercise) {
    return false;
  }

  const categoryValidation = exerciseCategorySchema.safeParse(category);
  const exerciseValidation = exerciseTypeSchema.safeParse(exercise);

  return categoryValidation.success && exerciseValidation.success;
}
