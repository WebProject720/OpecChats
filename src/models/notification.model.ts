import mongoose, { Schema, Document } from "mongoose";
import { User } from "./model.interface";

export interface Notifications extends Document {
  sendBy: User;
  sendTo: User[];
  isResolved: boolean;
  msg: string;
}

const NotificationsSchema = new Schema(
  {
    sendBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sendTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    msg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const NotificationsModel =
  (mongoose.models.Notification as mongoose.Model<Notifications>) ||
  mongoose.model<Notifications>("Notification", NotificationsSchema);

