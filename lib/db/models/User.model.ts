import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: [true, "clerkId is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "mentor", "admin"],
      default: "user",
    },
    settings: {
      intervals: {
        selectedIntervals: [String],
        direction: {
          type: String,
          enum: ["ascending", "descending", "both"],
          default: "ascending",
        },
      },
      chords: {
        selectedChords: [String],
        direction: {
          type: String,
          enum: ["ascending", "descending", "both"],
          default: "ascending",
        },
        triads: {
          inversions: {
            type: [Number],
            enum: [1, 2],
            default: [],
          },
        },
        sevenths: {
          inversions: {
            type: [Number],
            enum: [1, 2, 3],
            default: [],
          },
        },
        ninths: {
          inversions: {
            type: [Number],
            enum: [1, 2, 3, 4],
            default: [],
          },
        },
      },
      scales: {
        selectedScales: [String],
        direction: {
          type: String,
          enum: ["ascending", "descending", "both"],
          default: "ascending",
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = models.User || model("User", userSchema);
