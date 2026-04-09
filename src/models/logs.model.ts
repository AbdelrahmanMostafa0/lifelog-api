import { Schema, model } from "mongoose";

export interface ILog {
  userId: string;
  title: string;
  content: string;
  tags: string[];
  mood: string;
  createdAt: Date;
  loggedAt: Date;
  updatedAt: Date;
}

const logSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, default: "" },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    mood: { type: String, default: "" },
    loggedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Log = model<ILog>("Log", logSchema);
