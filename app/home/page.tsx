import { Flame, GraduationCap } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

export default function HomePage() {
  return (
    <main className="container">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold">Welcome back, Sarah!</h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Ready to sharpen your musical ear today?
        </p>
      </div>
      <div className="flex justify-center gap-6 w-full max-w-4xl mx-auto px-6 my-10">
        <Card className="p-8 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer w-full">
          <CardContent className="flex flex-col items-center">
            <GraduationCap
              className="bg-secondary rounded-full size-24 p-6"
              color="var(--color-primary)"
            />
            <p className="text-lg font-bold mt-4">Current Level</p>
            <span className="text-sm text-muted-foreground">Keep it up!</span>
          </CardContent>
        </Card>
        <Card className="p-8 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer w-full">
          <CardContent className="flex flex-col items-center">
            <Flame
              className="bg-secondary rounded-full size-24 p-6"
              color="var(--color-primary)"
            />
            <p className="text-lg font-bold mt-4">Practice Streak</p>
            <span className="text-sm text-muted-foreground">
              5 days in a row!
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Link
          href="/play/free"
          className={cn([
            buttonVariants({ variant: "default" }),
            "rounded-full px-10 py-7 text-lg font-bold cursor-pointer",
          ])}
        >
          Free
        </Link>
        <Link
          href="/play/test"
          className={cn([
            buttonVariants({ variant: "outline" }),
            "rounded-full e px-10 py-7 text-lg font-bold border-primary border-2 hover:outline-primary/80 hover:text-primary/80 text-primary cursor-pointer",
          ])}
        >
          Start Test
        </Link>
      </div>
    </main>
  );
}
