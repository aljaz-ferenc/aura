"use client";
import { useEffect, useRef } from "react";
import {
  Accidental,
  Formatter,
  Renderer,
  Stave,
  StaveNote,
  Voice,
} from "vexflow";
import type { Interval } from "@/lib/engine/Interval";
import { cn } from "@/lib/utils";

type IntervalRendererProps = {
  interval: Interval;
  className?: string;
  show?: boolean;
};

export function IntervalRenderer({
  interval,
  className,
  show = true,
}: IntervalRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Convert Note objects to VexFlow StaveNote
    if (!interval) return;
    const keys: string[] = [];
    const baseNotes = [interval.note1, interval.note2];
    baseNotes.forEach((note) => {
      keys.push(`${note.base.toLowerCase()}/${note.octave}`);
    });

    const finalNote = new StaveNote({
      keys,
      duration: "w",
      clef: "treble",
    });

    baseNotes.forEach((note, index) => {
      if (note.accidentals.sharps > 0) {
        const accidentalType =
          note.accidentals.sharps === 1
            ? "#"
            : note.accidentals.sharps === 2
              ? "##"
              : "###";
        finalNote.addModifier(new Accidental(accidentalType), index);
      } else if (note.accidentals.flats > 0) {
        const accidentalType =
          note.accidentals.flats === 1
            ? "b"
            : note.accidentals.flats === 2
              ? "bb"
              : "bbb";
        finalNote.addModifier(new Accidental(accidentalType), index);
      }
    });

    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    try {
      const renderer = new Renderer(
        containerRef.current,
        Renderer.Backends.SVG,
      );

      renderer.resize(500, 200);
      const context = renderer.getContext();
      const stave = new Stave(10, 40, 200);

      stave.addClef("treble");

      stave.setContext(context).draw();

      const notes = [finalNote];

      const voice = new Voice({ numBeats: 4, beatValue: 4 });
      if (show) {
        voice.addTickables(notes);
      }

      new Formatter().joinVoices([voice]).format([voice], 350);

      voice.draw(context, stave);
    } catch (error) {
      console.error("Error rendering music notation:", error);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [interval, show]);

  return <div ref={containerRef} className={cn(["mx-auto", className])} />;
}
