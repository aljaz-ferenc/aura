import type { PropsWithChildren } from "react";

type InterfaceLayout = {
  title: string;
  instructions: string;
};

export default function InterfaceLayout({
  children,
  title,
  instructions,
}: PropsWithChildren<InterfaceLayout>) {
  return (
    <main>
      <div className="text-center">
        <h3 className="text-4xl font-bold">{title}</h3>
        <p className="text-muted-foreground mt-3">{instructions}</p>
      </div>
      {children}
    </main>
  );
}
