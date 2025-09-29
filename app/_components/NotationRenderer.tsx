"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Formatter, Renderer, Stave, Voice } from "vexflow";
import type { MusicElement } from "@/app/types";
import { cn } from "@/lib/utils/cn";
import { getHarmonicNotes } from "@/lib/utils/getHarmonicNotes";
import { getMelodicNotes } from "@/lib/utils/getMelodicNotes";

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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current?.getBoundingClientRect().width;
    console.log(containerWidth);
    setContainerWidth(containerWidth / 1.5);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    addEventListener("resize", onResize);
    if (containerWidth === 0)
      setContainerWidth(
        containerRef.current.getBoundingClientRect().width / 1.5,
      );
  }, [onResize, containerWidth]);

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
        mode === "melodic"
          ? Math.max(containerWidth, notes.length * 100)
          : 300 - 50;
      renderer.resize(width, 200);

      const context = renderer.getContext();
      const staveWidth = mode === "melodic" ? containerWidth - 20 : width - 50;

      // Center the stave horizontally
      const staveX = (width - staveWidth) / 2;
      const stave = new Stave(staveX, 40, staveWidth);

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
      removeEventListener("resize", onResize);
    };
  }, [element, show, mode, containerWidth, onResize]);

  return (
    <div
      ref={containerRef}
      className={cn([
        "w-full [&_svg]:mx-auto [&_svg]:h-full [&_svg]:scale-125",
        className,
      ])}
    />
  );
}
