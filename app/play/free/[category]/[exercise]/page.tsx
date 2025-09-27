import Interface from "@/app/play/_components/Interface";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ category: string; exercise: string }>;
}) {
  const { exercise, category } = await params;
  return (
    <div>
      <Interface />
    </div>
  );
}
