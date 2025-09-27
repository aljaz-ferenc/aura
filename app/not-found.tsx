export default function NotFoundPage() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center text-center max-w-xs absolute top-1/2 left-1/2 -translate-1/2">
      <span className="text-primary/80 text-7xl font-black">404</span>
      <span className="text-2xl font-bold">Page Not Found</span>
      <p className="text-muted-foreground text-sm">
        Oops! The page you're looking for seems to have taken a detour. Let's
        get you back on the right track.
      </p>
    </main>
  );
}
