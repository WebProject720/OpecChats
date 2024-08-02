import mongoose, { Schema, Document } from "mongoose";
import { members, user, chatsHistory } from "./model.interface";
import { membersModel, userModel, chatsHistoryModel } from "./models";

export interface group extends Document {
  groupName: string;
  profileImage: string;
  bgImage: string;
  isGroupPrivate: boolean;
  memberAllowedAtSingleTime: number;
  admin: user;
  activeMemberCount: number;
  currentStatus: boolean;
  chatID: chatsHistory;
  extraMemberAllowed: number;
  isSubscribed: boolean;
  memberLists: members[];
  waitingMember: members[];
  removedMembers: members[];
  blockedMembers: members[];
  uniqueCode: string;
}

export const groupSchema: Schema<group> = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    bgImage: {
      type: String,
      required: false,
    },
    isGroupPrivate: {
      type: Boolean,
      default: false,
    },
    memberAllowedAtSingleTime: {
      type: Number,
      default: 20,
    },
    admin: userModel,
    activeMemberCount: {
      type: Number,
      default: 0,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    chatID: chatsHistoryModel,
    extraMemberAllowed: { type: Number, default: 0 },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    memberLists: [membersModel],
    waitingMember: [membersModel],
    removedMembers: [membersModel],
    blockedMembers: [membersModel],
    uniqueCode: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

const groupModel =
  (mongoose.models.Group as mongoose.Model<group>) ||
  mongoose.model<group>("Group", groupSchema);

export default groupModel;
