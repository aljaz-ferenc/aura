import ListeningInterface from "@/app/_components/ListeningInterface";
import ExerciseSelection from "@/app/free-practice/_components/ExerciseSelectionPage";
import { validateSearchParams } from "@/lib/utils/validateSearchParams";

export default async function FreePracticePage(props: {
  searchParams?: Promise<{ exercise?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const exercise = searchParams?.exercise;
  const category = searchParams?.category;

  validateSearchParams([category, exercise]);

  if (!category || !exercise) {
    return <ExerciseSelection />;
  }

  return (
    <main className="container mx-auto">
      {exercise === "listening" && <ListeningInterface />}
    </main>
  );
}
