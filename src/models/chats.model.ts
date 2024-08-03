import mongoose, { Schema, Document } from "mongoose";
import { Members } from "./model.interface";
import { MembersModel } from "./models";

export interface Chats extends Document {
  senderID: Members;
  canUpdate: boolean;
  targetedMsgID: string;
  msg: string;
  MsgBeforeUpdate: string;
  isRemoved: boolean;
}

const ChatsSchema = new Schema(
  {
    senderID: {
      type:Schema.Types.ObjectId,
      ref:"Member"
    },
    canUpdate: {
      type: Boolean,
      default: true,
    },
    targetedMsgID: {
      default: null,
    },
    msg: {
      type: String,
      required: true,
    },
    MsgBeforeUpdate: {
      type: String,
      default: null,
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ChatsModel =
  (mongoose.models.Chat as mongoose.Model<Chats>) ||
  mongoose.model<Chats>("Chat", ChatsSchema);

