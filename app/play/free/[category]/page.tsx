import Link from "next/link";

const EXERCISES = [
  { type: "listening", href: "listening", label: "Listening" },
  { type: "singing", href: "singing", label: "Singing" },
  { type: "constructing", href: "constructing", label: "Constructing" },
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; mode: string }>;
}) {
  const { category, mode } = await params;
  return (
    <div>
      {EXERCISES.map((e) => {
        return (
          <Link key={e.href} href={`/play/${mode}/${category}/${e.href}`}>
            {e.label}
          </Link>
        );
      })}
    </div>
  );
}
