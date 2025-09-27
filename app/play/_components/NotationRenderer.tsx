"use client";
import { useEffect, useRef } from "react";
import { Formatter, Renderer, Stave, Voice } from "vexflow";
import type { MusicElement } from "@/app/types";
import { getHarmonicNotes } from "@/lib/getHarmonicNotes";
import { getMelodicNotes } from "@/lib/getMelodicNotes";
import { cn } from "@/lib/utils";

type IntervalRendererProps = {
  element: MusicElement;
  className?: string;
  show?: boolean;
  mode: "harmonic" | "melodic";
};

export function NotationRenderer({
  element,
  className,
  show = true,
  mode = "harmonic",
}: IntervalRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element) return;

    const notes =
      mode === "melodic" ? getMelodicNotes(element) : getHarmonicNotes(element);

    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    try {
      const renderer = new Renderer(
        containerRef.current,
        Renderer.Backends.SVG,
      );

      const width =
        mode === "melodic" ? Math.max(500, notes.length * 100) : 500;
      renderer.resize(width, 200);

      const context = renderer.getContext();
      const staveWidth = mode === "melodic" ? width - 20 : 200;
      const stave = new Stave(10, 40, staveWidth);

      stave.addClef("treble");
      stave.setContext(context).draw();

      if (mode === "melodic") {
        const voice = new Voice({
          numBeats: notes.length * 4,
          beatValue: 4,
        });
        voice.addTickables(notes);
        new Formatter().joinVoices([voice]).format([voice], staveWidth - 50);

        if (show) {
          voice.draw(context, stave);
        }
      } else {
        const voice = new Voice({ numBeats: 4, beatValue: 4 });
        voice.addTickables(notes);
        new Formatter().joinVoices([voice]).format([voice], 350);

        if (show) {
          voice.draw(context, stave);
        }
      }
    } catch (error) {
      console.error("Error rendering music notation:", error);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [element, show, mode]);

  return <div ref={containerRef} className={cn(["mx-auto", className])} />;
}
