import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="screen w-full grid place-items-center">
      <SignIn />
    </main>
  );
}
