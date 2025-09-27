import { Drum, Music, Piano, Scale } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = [
  {
    title: "Intervals",
    description: "Practice identifying, building and singing intervals.",
    icon: <Music color={"var(--color-primary)"} size={35} />,
    href: "/play/intervals",
    exercises: [
      { label: "Listening", value: "listening" },
      { label: "Singing", value: "singing" },
      { label: "Constructing", value: "constructing" },
    ],
  },
  {
    title: "Chords",
    description: "Practice identifying, building and singing chords.",
    icon: <Piano color={"var(--color-primary)"} size={35} />,
    href: "/play/chords",
    exercises: [
      { label: "Listening", value: "listening" },
      { label: "Singing", value: "singing" },
      { label: "Constructing", value: "constructing" },
    ],
  },
  {
    title: "Scales",
    description: "Practice identifying, building and singing scales.",
    icon: <Scale color={"var(--color-primary)"} size={35} />,
    href: "/play/scales",
    exercises: [
      { label: "Listening", value: "listening" },
      { label: "Singing", value: "singing" },
      { label: "Constructing", value: "constructing" },
    ],
  },
  {
    title: "Rhythm",
    description:
      "Practice identifying, building and singing rhythmic patterns.",
    icon: <Drum color={"var(--color-primary)"} size={35} />,
    href: "/play/rhythm",
    exercises: [
      { label: "Listening", value: "listening" },
      { label: "Singing", value: "singing" },
      { label: "Tapping", value: "tapping" },
    ],
  },
];

export default function SelectCategoryPage() {
  return (
    <main className="container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold">Category Selection</h2>
        <p className="text-lg text-muted-foreground mb-10">
          Select a category to start your ear training practice.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 max-w-4xl mx-auto">
        {CATEGORIES.map((category, index) => (
          <Link href={category.href} key={category.title}>
            <Card>
              <CardContent className="flex items-center gap-5">
                <div className="rounded-md h-full aspect-square grid place-items-center flex-1 bg-background">
                  {category.icon}
                </div>
                <div className="flex-5">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground text-sm leading-4">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
