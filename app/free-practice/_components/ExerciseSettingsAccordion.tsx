"use client";

import { Settings } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { ChordDisplay } from "@/app/_components/ChordDisplay";
import type { User } from "@/app/api/webhooks/types";
import type { ExerciseCategory } from "@/app/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { chordLibrary } from "@/lib/constants/chordsData";
import { IntervalLibrary } from "@/lib/constants/intervalsData";
import { scaleLibrary } from "@/lib/constants/scalesData";
import { updateUser } from "@/lib/data-access/user";
import { cn } from "@/lib/utils/cn";

function getElementOptions(category: ExerciseCategory) {
  switch (category) {
    case "intervals":
      return IntervalLibrary;
    case "chords":
      return chordLibrary;
    case "scales":
      return scaleLibrary;
    default:
      return IntervalLibrary;
  }
}

type ExerciseSettingsAccordionProps = {
  user: User;
  category: ExerciseCategory;
};

export default function ExerciseSettingsAccordion({
  user,
  category,
}: ExerciseSettingsAccordionProps) {
  const [isPending, startTransition] = useTransition();
  const answerOptions = getElementOptions(category);

  const groups = useMemo(() => {
    if (!answerOptions || answerOptions.length === 0) return [];
    return Object.groupBy(answerOptions, (option) => option.category);
  }, [answerOptions]);
  const [selectedIntervals, setSelectedIntervals] = useState(
    user.settings.intervals.selectedIntervals,
  );
  const [selectedChords, setSelectedChords] = useState(
    user.settings.chords.selectedChords,
  );
  const [selectedScales, setSelectedScalest] = useState(
    user.settings.scales.selectedScales,
  );

  function onDeselectAll(
    category: ExerciseCategory,
    symbolsToRemove: string[],
  ) {
    switch (category) {
      case "intervals":
        setSelectedIntervals((prev) => {
          const toRemove = new Set(symbolsToRemove);
          return prev.filter((s) => !toRemove.has(s));
        });
        break;
      case "chords":
        setSelectedChords((prev) => {
          const toRemove = new Set(symbolsToRemove);
          return prev.filter((s) => !toRemove.has(s));
        });
        break;
      case "scales":
        setSelectedScalest((prev) => {
          const toRemove = new Set(symbolsToRemove);
          return prev.filter((s) => !toRemove.has(s));
        });
    }
  }

  function onSelectAll(category: ExerciseCategory, symbolsToAdd: string[]) {
    switch (category) {
      case "intervals":
        setSelectedIntervals((prev) => [...prev, ...symbolsToAdd]);
        break;
      case "chords":
        setSelectedChords((prev) => [...prev, ...symbolsToAdd]);
        break;
      case "scales":
        setSelectedScalest((prev) => [...prev, ...symbolsToAdd]);
    }
  }

  function onCheckedChange(checked: boolean, symbol: string) {
    switch (category) {
      case "intervals":
        setSelectedIntervals((prev) =>
          checked ? [...prev, symbol] : prev.filter((sym) => sym !== symbol),
        );
        break;
      case "chords":
        setSelectedChords((prev) =>
          checked ? [...prev, symbol] : prev.filter((sym) => sym !== symbol),
        );
        break;
      case "scales":
        setSelectedScalest((prev) =>
          checked ? [...prev, symbol] : prev.filter((sym) => sym !== symbol),
        );
        break;
    }
  }

  const getUpdatedSettings = useMemo((): User["settings"] => {
    const userSettings = { ...user.settings };
    userSettings.scales.selectedScales = selectedScales;
    userSettings.chords.selectedChords = selectedChords;
    userSettings.intervals.selectedIntervals = selectedIntervals;
    return userSettings;
  }, [selectedIntervals, selectedChords, selectedScales, user.settings]);

  async function onSave() {
    startTransition(async () => {
      await updateUser(user.clerkId, { settings: getUpdatedSettings });
    });
  }

  return (
    <Accordion type="multiple">
      <AccordionItem value="settings">
        <AccordionTrigger className="text-xl font-bold hover:underline-none flex gap-4 justify-start items-center">
          <Settings />
          <span className="mr-auto">Settings</span>
        </AccordionTrigger>
        <AccordionContent>
          <Button
            onClick={onSave}
            className="cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
          {groups &&
            Object.entries(groups).map(([group, options]) => {
              return (
                <div key={group}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="uppercase font-bold text-sm text-muted-foreground">
                      {group}
                    </h4>
                    {options && (
                      <div>
                        <Button
                          variant="link"
                          className="cursor-pointer"
                          onClick={() =>
                            onSelectAll(
                              category,
                              options
                                .filter((o) => o.category === group)
                                .map((o) => o.symbol),
                            )
                          }
                        >
                          Select all
                        </Button>
                        <Button
                          variant="link"
                          className="cursor-pointer"
                          onClick={() =>
                            onDeselectAll(
                              category,
                              options
                                .filter((o) => o.category === group)
                                .map((o) => o.symbol),
                            )
                          }
                        >
                          Deselect all
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {options?.map((option) => {
                      const isChecked =
                        category === "intervals"
                          ? selectedIntervals.includes(option.symbol)
                          : category === "chords"
                            ? selectedChords.includes(option.symbol)
                            : selectedScales.includes(option.symbol);

                      return (
                        <label
                          htmlFor={option.symbol}
                          key={option.symbol}
                          className={cn([
                            "text-left flex justify-start gap-3 border rounded-md py-2 px-3 items-center bravura-text",
                            isChecked && "bg-secondary",
                          ])}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                              onCheckedChange(!!checked, option.symbol)
                            }
                            id={option.symbol}
                            className="peer bg-primary-foreground"
                          />
                          <span
                            className={cn([
                              "mr-auto",
                              category === "scales" && "capitalize",
                            ])}
                          >
                            {category === "chords" ? (
                              <ChordDisplay symbol={option.symbol} />
                            ) : (
                              option.symbol
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {category === "chords" && (
                    <div className="mt-6">
                      <p>Inversions: </p>
                      <ToggleGroup
                        type="multiple"
                        onValueChange={(val) => console.log(val)}
                      >
                        <ToggleGroupItem value={"0"}>Root</ToggleGroupItem>
                        <ToggleGroupItem value={"1"}>1st</ToggleGroupItem>
                        <ToggleGroupItem value={"2"}>2nd</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  )}
                  <hr className="my-5" />
                </div>
              );
            })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
