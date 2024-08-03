import mongoose, { Schema, Document } from "mongoose";
import { Members, User, ChatsHistory } from "./model.interface";
import { MembersModel, UserModel, ChatsHistoryModel } from "./models";

export interface Group extends Document {
  groupName: string;
  profileImage: string;
  bgImage: string;
  isGroupPrivate: boolean;
  memberAllowedAtSingleTime: number;
  admin: User;
  activeMemberCount: number;
  currentStatus: boolean;
  chatID: ChatsHistory;
  extraMemberAllowed: number;
  isSubscribed: boolean;
  memberLists: Members[];
  waitingMember: Members[];
  removedMembers: Members[];
  blockedMembers: Members[];
  uniqueCode: string;
}

export const GroupSchema: Schema<Group> = new Schema(
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
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activeMemberCount: {
      type: Number,
      default: 0,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    chatID: {
      type: Schema.Types.ObjectId,
      ref: "ChatHistory",
    },
    extraMemberAllowed: { type: Number, default: 0 },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    memberLists: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
    },
    waitingMember: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
    },
    removedMembers: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
    },
    blockedMembers: {
      type: [Schema.Types.ObjectId],
      ref: "Member",
    },
    uniqueCode: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

export const GroupModel =
  (mongoose.models.Group as mongoose.Model<Group>) ||
  mongoose.model<Group>("Group", GroupSchema);

