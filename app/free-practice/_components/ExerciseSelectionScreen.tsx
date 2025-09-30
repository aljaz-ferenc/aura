"use client";

import { useState } from "react";
import type { User } from "@/app/api/webhooks/types";
import ExerciseSelection from "@/app/free-practice/_components/ExerciseSelection";
import ExerciseSettingsAccordion from "@/app/free-practice/_components/ExerciseSettingsAccordion";
import type { Category, ExerciseCategory } from "@/app/types";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES } from "@/lib/constants/categories";
import { cn } from "@/lib/utils/cn";

type ExerciseSelectionScreen = {
  user: User;
};

export default function ExerciseSelectionScreen({
  user,
}: ExerciseSelectionScreen) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES[0],
  );

  return (
    <main className="">
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
      <ExerciseSelection category={selectedCategory} />
      <Card className="mt-5 p-0">
        <CardContent>
          <ExerciseSettingsAccordion
            user={user}
            category={selectedCategory.slug as ExerciseCategory}
          />
        </CardContent>
      </Card>
    </main>
  );
}
