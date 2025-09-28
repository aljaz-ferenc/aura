import ListeningInterface from "@/app/_components/ListeningInterface";
import SingingInterface from "@/app/_components/SingingInterface";
import ExerciseSelectionScreen from "@/app/free-practice/_components/ExerciseSelectionScreen";
import { validateSearchParams } from "@/lib/utils/validateSearchParams";

export default async function FreePracticePage(props: {
  searchParams?: Promise<{ exercise?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const exercise = searchParams?.exercise;
  const category = searchParams?.category;

  const isValid = validateSearchParams([category, exercise]);

  if (!isValid) {
    return (
      <main className="container mx-auto">
        <ExerciseSelectionScreen />
      </main>
    );
  }

  return (
    <main className="container mx-auto">
      {exercise === "listening" && <ListeningInterface />}
      {exercise === "singing" && <SingingInterface />}
    </main>
  );
}
