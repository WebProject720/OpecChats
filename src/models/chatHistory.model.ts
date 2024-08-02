import mongoose, { Schema, Document } from "mongoose";

export interface chats extends Document {
  admin: string;
  currentStatus: boolean;
  chatIDs: Array<string>;
}

const chatsSchema = new Schema(
  {
    admin: {
      type: String,
      required: true,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    chatIDs: {},
  },
  { timestamps: true }
);

const chatsModel =
  (mongoose.models.Chat as mongoose.Model<chats>) ||
  mongoose.model<chats>("Chat", chatsSchema);

export default chatsModel;
