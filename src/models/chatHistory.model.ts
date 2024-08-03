import mongoose, { Schema, Document } from "mongoose";
import { Chats } from "./model.interface";

export interface ChatsHistory extends Document {
  admin: string;
  currentStatus: boolean;
  chatIDs: Chats[];
}

const ChatsHistorySchema = new Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    chatIDs: {
      type:Schema.Types.ObjectId,
      ref:"Chat"
    }
  },
  { timestamps: true }
);

export const ChatsHistoryModel =
  (mongoose.models.ChatHistory as mongoose.Model<ChatsHistory>) ||
  mongoose.model<ChatsHistory>("ChatHistory", ChatsHistorySchema);

