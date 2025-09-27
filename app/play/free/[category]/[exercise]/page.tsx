export default async function ExercisePage({
  params,
}: {
  params: Promise<{ category: string; exercise: string }>;
}) {
  const { exercise, category } = await params;
  return (
    <div>
      {category} {exercise}
      <div>INTERFACE</div>
    </div>
  );
}
