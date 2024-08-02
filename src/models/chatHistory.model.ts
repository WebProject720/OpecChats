import mongoose, { Schema, Document } from "mongoose";
import { chats } from "./model.interface";
import { chatsModel } from "./models";

export interface chatsHistory extends Document {
  admin: string;
  currentStatus: boolean;
  chatIDs: chats;
}

const chatsHistorySchema = new Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    chatIDs: chatsModel,
  },
  { timestamps: true }
);

const chatsHistoryModel =
  (mongoose.models.ChatHistory as mongoose.Model<chatsHistory>) ||
  mongoose.model<chatsHistory>("ChatHistory", chatsHistorySchema);

export default chatsHistoryModel;
