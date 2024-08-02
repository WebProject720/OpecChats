import mongoose, { Schema, Document } from "mongoose";
import { members } from "./model.interface";
import { membersModel } from "./models";

export interface chats extends Document {
  senderID: members;
  canUpdate: boolean;
  targetedMsgID: string;
  msg: string;
  MsgBeforeUpdate: string;
  isRemoved: boolean;
}

const chatsSchema = new Schema(
  {
    senderID: membersModel,
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

const chatsModel =
  (mongoose.models.Chat as mongoose.Model<chats>) ||
  mongoose.model<chats>("Chat", chatsSchema);

export default chatsModel;
