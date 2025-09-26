import * as Tone from "tone";

export type Note = string;
export type Duration = number | string;

export class Sampler {
  private sampler: Tone.Sampler | null = null;
  private isLoaded = false;

  constructor() {
    this.initSampler();
  }

  private initSampler() {
    if (this.sampler) return;

    this.sampler = new Tone.Sampler({
      urls: {
        C4: "JHPiano_NoSus_Close_C4_vl4_rr1.flac",
        D4: "JHPiano_NoSus_Close_D4_vl4_rr1.flac",
        E4: "JHPiano_NoSus_Close_E4_vl2_rr1.flac",
      },
      release: 1,
      baseUrl: "/samples/",
      onload: () => {
        console.log("Sampler loaded!");
        this.isLoaded = true;
      },
    }).toDestination();
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
          this.sampler?.triggerAttack(note, now + index * spread);
        });
        break;
      case "reversed":
        notes.reverse().forEach((note, index) => {
          this.sampler?.triggerAttack(note, now + index * spread);
        });
        break;
    }
  }

  async playInterval({
    notes,
    spread = 0.5,
    mode = "melodic",
  }: {
    notes: Note[];
    spread?: number;
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
    }
  }
}

export const sampler = new Sampler();
