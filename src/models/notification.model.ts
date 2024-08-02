import mongoose, { Schema, Document } from "mongoose";

export interface notifications extends Document {
  sendBy: string;
  sendTo: string;
  isResolved: boolean;
  msg: string;
}

const notificationsSchema = new Schema(
  {
    sendBy: {},
    sendTo: {},
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

const notificationsModel =
  (mongoose.models.Notification as mongoose.Model<notifications>) ||
  mongoose.model<notifications>("Notification", notificationsSchema);

export default notificationsModel;
