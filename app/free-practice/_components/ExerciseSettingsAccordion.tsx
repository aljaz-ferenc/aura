import { Settings } from "lucide-react";
import { useMemo, useState } from "react";
import { ChordDisplay } from "@/app/_components/ChordDisplay";
import type { Category, ExerciseCategory } from "@/app/types";
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
import { INTERVALS_DATA } from "@/lib/constants/intervalsData";
import { scaleLibrary } from "@/lib/constants/scalesData";
import { cn } from "@/lib/utils/cn";

function getElementOptions(category: ExerciseCategory) {
  switch (category) {
    case "intervals":
      return INTERVALS_DATA;
    case "chords":
      return chordLibrary;
    case "scales":
      return scaleLibrary;
    default:
      return INTERVALS_DATA;
  }
}

type ExerciseSettingsAccordionProps = {
  category: Category;
};

export default function ExerciseSettingsAccordion({
  category,
}: ExerciseSettingsAccordionProps) {
  const answerOptions = getElementOptions(category.slug as ExerciseCategory);
  const [selectedElements, setSelectedElements] = useState<Set<string>>(
    new Set(),
  );

  const groups = useMemo(() => {
    if (!answerOptions || answerOptions.length === 0) return [];
    return Object.groupBy(answerOptions, (option) => option.category);
  }, [answerOptions]);

  function onCheckedChange(checked: boolean, symbol: string) {
    if (checked) {
      setSelectedElements((prev) => new Set([...prev, symbol]));
      return;
    }

    setSelectedElements((prev) => {
      const newSet = new Set(prev);
      newSet.delete(symbol);
      return newSet;
    });
  }

  function onSave() {
    console.log(selectedElements);
  }

  return (
    <Accordion type="multiple">
      <AccordionItem value="settings">
        <AccordionTrigger className="text-xl font-bold hover:underline-none flex gap-4 justify-start items-center">
          <Settings />
          <span className="mr-auto">Settings</span>
        </AccordionTrigger>
        <AccordionContent>
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
                            setSelectedElements((prev) => {
                              return new Set([
                                ...prev,
                                ...options.map((option) => option.symbol),
                              ]);
                            })
                          }
                        >
                          Select all
                        </Button>
                        <Button
                          variant="link"
                          className="cursor-pointer"
                          onClick={() => {
                            const symbolsToRemove = new Set(
                              options.map((o) => o.symbol),
                            );
                            setSelectedElements(
                              (prev) =>
                                new Set(
                                  [...prev].filter(
                                    (s) => !symbolsToRemove.has(s),
                                  ),
                                ),
                            );
                          }}
                        >
                          Deselect all
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {options?.map((option) => {
                      const checked = selectedElements.has(option.symbol);
                      return (
                        <label
                          htmlFor={option.symbol}
                          key={option.symbol}
                          className={cn([
                            "text-left flex justify-start gap-3 border rounded-md py-2 px-3 items-center bravura-text",
                            checked && "bg-secondary",
                          ])}
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(checked) =>
                              onCheckedChange(!!checked, option.symbol)
                            }
                            id={option.symbol}
                            className="peer bg-primary-foreground"
                          />
                          <span
                            className={cn([
                              "mr-auto",
                              category.slug === "scales" && "capitalize",
                            ])}
                          >
                            {category.slug === "chords" ? (
                              <ChordDisplay symbol={option.symbol} />
                            ) : (
                              option.symbol
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {category.slug === "chords" && (
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
          <Button onClick={onSave} className="cursor-pointer">
            Save
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
