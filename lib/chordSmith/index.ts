import * as Tone from "tone";

export type Note = string;
export type Duration = number | string;

export class Sampler {
  private sampler: Tone.Sampler | null = null;
  private isLoaded = false;

  constructor() {
    this.initSampler();
  }

  private async initSampler() {
    if (this.sampler) return;

    try {
      await Tone.start();

      this.sampler = new Tone.Sampler({
        urls: {
          C4: "JHPiano_NoSus_Close_C4_vl4_rr1.flac",
          D4: "JHPiano_NoSus_Close_D4_vl4_rr1.flac",
          E4: "JHPiano_NoSus_Close_E4_vl2_rr1.flac",
        },
        release: 1,
        baseUrl: "/samples/",
      }).toDestination();

      // Wait for samples to load
      await new Promise<void>((resolve) => {
        if (this.sampler) {
          this.sampler.onload = () => {
            console.log("Sampler loaded!");
            this.isLoaded = true;
            resolve();
          };

          setTimeout(() => {
            console.log("Sampler load timeout, proceeding anyway...");
            this.isLoaded = true;
            resolve();
          }, 3000);
        }
      });
    } catch (error) {
      console.error("Sampler initialization failed:", error);
      this.sampler = null;
      throw error;
    }
  }

  private async waitForLoad() {
    if (this.isLoaded) return;
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (this.isLoaded) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  async playNote(note: Note, duration?: Duration) {
    duration = duration || 3;
    await Tone.start();
    await this.waitForLoad();
    this.sampler?.triggerAttackRelease(note, duration);
  }

  async playChord({
    notes,
    spread = 0.5,
    duration = 2,
    mode = "harmonic",
  }: {
    notes: Note[];
    spread?: number;
    duration?: number;
    mode?: "harmonic" | "melodic" | "reversed";
  }) {
    await Tone.start();
    await this.waitForLoad();
    const now = Tone.now();

    switch (mode) {
      case "melodic":
        notes.forEach((note, index) => {
          this.sampler?.triggerAttack(note, now + index * spread);
        });
        break;
      case "reversed":
        notes.reverse().forEach((note, index) => {
          this.sampler?.triggerAttack(note, now + index * spread);
        });
        break;
      case "harmonic":
        notes.forEach((note) => {
          this.sampler?.triggerAttack(note, now);
        });
        break;
    }

    this.sampler?.triggerRelease(notes, now + notes.length * spread + duration);
  }

  async playScale({
    notes,
    spread = 0.5,
    mode = "melodic",
  }: {
    notes: Note[];
    spread?: number;
    mode?: "melodic" | "reversed";
  }) {
    await Tone.start();
    await this.waitForLoad();
    const now = Tone.now();

    switch (mode) {
      case "melodic":
        notes.forEach((note, index) => {
          this.sampler?.triggerAttackRelease(
            note,
            spread,
            now + index * spread,
          );
        });
        break;
      case "reversed":
        notes.reverse().forEach((note, index) => {
          this.sampler?.triggerAttackRelease(
            note,
            spread,
            now + index * spread,
          );
        });
        break;
    }
  }

  async playInterval({
    notes,
    spread = 0.5,
    mode = "melodic",
    noteDuration = 0.4,
  }: {
    notes: Note[];
    spread?: number;
    mode?: "harmonic" | "melodic" | "reversed";
    noteDuration?: number;
  }) {
    await Tone.start();
    await this.waitForLoad();

    const noteLabels = notes.map((note) => note.label);
    const sequenceNotes =
      mode === "reversed" ? [...noteLabels].reverse() : noteLabels;

    if (mode === "harmonic") {
      // Play all notes simultaneously
      sequenceNotes.forEach((note) => {
        this.sampler?.triggerAttackRelease(note, noteDuration, Tone.now());
      });
    } else {
      // Use Sequence for precise melodic timing
      const sequence = new Tone.Sequence(
        (time, note) => {
          this.sampler?.triggerAttackRelease(note, noteDuration, time);
        },
        sequenceNotes,
        spread, // Use spread as the interval between notes
      );

      sequence.start();

      // Stop sequence after it completes
      const totalDuration = sequenceNotes.length * spread;
      setTimeout(() => {
        sequence.stop();
        sequence.dispose();
      }, totalDuration * 1000);
    }
  }
}

export const sampler = new Sampler();
