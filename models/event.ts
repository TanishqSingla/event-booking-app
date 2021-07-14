import mongoose, { Model, Schema } from "mongoose";

export interface Event {
  title: string;
  description: string;
  price: number;
  date: Date;
}

const eventSchema = new Schema<Event>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const EventModel = mongoose.model<Event>('Event', eventSchema);