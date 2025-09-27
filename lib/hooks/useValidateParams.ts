import { type ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { z } from "zod";
import { exerciseCategorySchema, exerciseTypeSchema } from "@/app/types";

export function useValidateParams(searchParams: ReadonlyURLSearchParams) {
  const category = searchParams.get("category");
  const exercise = searchParams.get("exercise");
  const router = useRouter();

  useLayoutEffect(() => {
    const exerciseValidation = z.safeParse(exerciseCategorySchema, category);
    const categoryValidation = z.safeParse(exerciseTypeSchema, exercise);

    if (!exerciseValidation.success || !categoryValidation.success) {
      router.replace("/free-practice");
    }
  }, [category, exercise, router.replace]);

  if (!searchParams) return;
}
