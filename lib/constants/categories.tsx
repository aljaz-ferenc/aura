import { Drum, Music, Piano, Scale } from "lucide-react";

export const CATEGORIES = [
  {
    title: "Intervals",
    slug: "intervals",
    description: "Practice identifying, building and singing intervals.",
    icon: <Music color={"var(--color-primary)"} size={35} />,
    href: "intervals",
    exercises: [
      { slug: "listening", label: "Listening" },
      { slug: "singing", label: "Singing" },
    ],
  },
  {
    title: "Chords",
    slug: "chords",
    description: "Practice identifying, building and singing chords.",
    icon: <Piano color={"var(--color-primary)"} size={35} />,
    href: "/play/chords",
    exercises: [
      { slug: "listening", label: "Listening" },
      { slug: "singing", label: "Singing" },
    ],
  },
  {
    title: "Scales",
    slug: "scales",
    description: "Practice identifying, building and singing scales.",
    icon: <Scale color={"var(--color-primary)"} size={35} />,
    href: "/play/scales",
    exercises: [
      { slug: "listening", label: "Listening" },
      { slug: "singing", label: "Singing" },
    ],
  },
  {
    title: "Rhythm",
    slug: "rhythm",
    description:
      "Practice identifying, building and singing rhythmic patterns.",
    icon: <Drum color={"var(--color-primary)"} size={35} />,
    href: "/play/rhythm",
    exercises: [
      { slug: "listening", label: "Listening" },
      { slug: "tapping", label: "Tapping" },
    ],
  },
];
