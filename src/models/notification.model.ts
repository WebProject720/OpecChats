import mongoose, { Schema, Document } from "mongoose";
import { user } from "./model.interface";
import { userModel } from "./models";

export interface notifications extends Document {
  sendBy: user;
  sendTo: user[];
  isResolved: boolean;
  msg: string;
}

const notificationsSchema = new Schema(
  {
    sendBy: userModel,
    sendTo: [userModel],
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
