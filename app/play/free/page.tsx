"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils/cn";

export default function SelectCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  return (
    <main className="container">
      <div className=" mx-auto">
        <h2 className=" font-bold text-4xl">Select Exercise</h2>
        <p className="text-lg text-muted-foreground mb-10">
          Select an exercise to start your ear training practice.
        </p>
      </div>
      <div className="flex w-full gap-3  mx-auto mb-10">
        {CATEGORIES.map((category) => (
          <button
            className="flex-1 cursor-pointer"
            onClick={() => setSelectedCategory(category)}
            type="button"
            key={category.title}
          >
            <Card
              className={cn([
                "rounded border-none p-0",
                selectedCategory.slug === category.slug && "bg-secondary",
              ])}
            >
              <CardContent className="flex items-center gap-5 p-3">
                <div className="h-full grid place-items-center flex-1 bg-background p-3 aspect-4/5 rounded-md w-min">
                  {category.icon}
                </div>
                <div className="flex-5 text-left">
                  <h3 className="text-lg font-bold">{category.title}</h3>
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
      <Card className="border-none">
        <CardContent>
          <h3 className="text-xl font-bold">{selectedCategory.title}</h3>
          <p className="text-muted-foreground text-sm">
            Practice{" "}
            {selectedCategory.exercises
              .slice(0, -1)
              .map((e) => e.label.toLowerCase())
              .join(", ") +
              " and " +
              selectedCategory.exercises.at(-1)?.label.toLowerCase() +
              " " +
              selectedCategory.title.toLowerCase() +
              "."}
          </p>
          <hr className="my-5" />
          <p className="text-muted-foreground text-sm mb-2">Exercises:</p>
          <div className="flex gap-3">
            {selectedCategory.exercises.map((exercise) => (
              <Link
                key={selectedCategory.slug + exercise.slug}
                href={`/play/free/${selectedCategory.slug}/${exercise.slug}`}
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
    </main>
  );
}
