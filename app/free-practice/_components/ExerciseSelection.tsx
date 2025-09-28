import Link from "next/link";
import type { Category } from "@/app/types";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

type ExerciseSlectionProps = {
  category: Category;
};

export default function ExerciseSelection({ category }: ExerciseSlectionProps) {
  return (
    <Card className="border-none py-4">
      <CardContent>
        <h3 className="text-xl font-bold">{category.title}</h3>
        <p className="text-muted-foreground text-sm">
          Practice{" "}
          {category.exercises
            .slice(0, -1)
            .map((e) => e.label.toLowerCase())
            .join(", ") +
            " and " +
            category.exercises.at(-1)?.label.toLowerCase() +
            " " +
            category.title.toLowerCase() +
            "."}
        </p>
        <hr className="my-5" />
        <p className="text-muted-foreground text-sm mb-2">Exercises:</p>
        <div className="flex gap-3">
          {category.exercises.map((exercise) => (
            <Link
              key={category.slug + exercise.slug}
              href={`/free-practice?category=${category.slug}&exercise=${exercise.slug}`}
              className={cn([
                buttonVariants({ variant: "outline" }),
                "max-w-50 w-full",
              ])}
            >
              {exercise.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
