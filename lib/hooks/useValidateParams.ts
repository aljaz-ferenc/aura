import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { z } from "zod";
import { exerciseCategorySchema, exerciseTypeSchema } from "@/app/types";

export function useValidateParams(searchParams: (string | undefined)[]) {
  const router = useRouter();

  useLayoutEffect(() => {
    const exerciseValidation = z.safeParse(
      exerciseCategorySchema,
      searchParams[0],
    );
    const categoryValidation = z.safeParse(exerciseTypeSchema, searchParams[1]);

    if (!exerciseValidation.success || !categoryValidation.success) {
      router.replace("/free-practice");
    }
  }, [router.replace, searchParams[0], searchParams[1]]);

  if (searchParams.some((s) => !s) || !searchParams) return;
}
