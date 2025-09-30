import { z } from "zod";

const intervalsSettingsSchema = z.object({
  selectedIntervals: z.string().array(),
  direction: z.enum(["ascending", "descending", "both"]).array(),
});

const chordsSettingsSchema = z.object({
  selectedChords: z.string().array(),
  direction: z.enum(["ascending", "descending", "both"]).array(),
  triads: {
    inversions: z.array(z.union([z.literal(1), z.literal(2)])).default([]),
  },
  sevenths: {
    inversions: z
      .array(z.union([z.literal(1), z.literal(2), z.literal(3)]))
      .default([]),
  },
  ninths: {
    inversions: z
      .array(z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]))
      .default([]),
  },
});

const scalesSettingsSchema = z.object({
  selectedScales: z.string().array(),
  direction: z.enum(["ascending", "descending", "both"]).array(),
});

export const userSettingsSchema = z.object({
  intervals: intervalsSettingsSchema,
  chords: chordsSettingsSchema,
  scales: scalesSettingsSchema,
});

export const userSchema = z.object({
  _id: z.string().min(1, { error: "_id is required" }),
  clerkId: z.string().min(1, { error: "clerkId is required" }),
  firstName: z.string().min(1, { error: "firstName is required" }),
  lastName: z.string().min(1, { error: "lastName is required" }),
  email: z.email().min(1, { error: "email is required" }),
  avatar: z.url().min(1, { error: "avatar url is required" }),
  role: z.enum(["user", "mentor", "admin"]).default("user"),
  settings: userSettingsSchema.default({
    intervals: {
      selectedIntervals: [],
      direction: ["ascending"],
    },
    chords: {
      selectedChords: [],
      direction: ["ascending"],
      triads: { inversions: [] },
      sevenths: { inversions: [] },
      ninths: { inversions: [] },
    },
    scales: {
      selectedScales: [],
      direction: ["ascending"],
    },
  }),
});

export type User = z.infer<typeof userSchema>;
