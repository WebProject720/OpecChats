import mongoose, { Schema, Document } from "mongoose";

export interface group extends Document {
  groupName: string;
  profileImage: string;
  bgImage: string;
  isGroupPrivate: boolean;
  memberAllowedAtSingleTime: number;
  admin: string;
  activeMemberCount: number;
  currentStatus: boolean;
  chatID: string;
  extraMemberAllowed: number;
  isSubscribed: boolean;
  memberLists: Array<string>;
  waitingMember: Array<string>;
  removedMembers: Array<string>;
  lastUpdatedByAdmin: Date;
  blockedMembers: Array<string>;
  uniqueCode: string;
}

export const groupSchema: Schema<group> = new Schema({
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
  admin: {},
  activeMemberCount: {
    type: Number,
    default: 0,
  },
  currentStatus: {
    type: Boolean,
    default: true,
  },
  chatID: {},
  extraMemberAllowed: { type: Number, default: 0 },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  memberLists: {},
  waitingMember: {},
  removedMembers: {},
  lastUpdatedByAdmin: {
    type: Date,
  },
  blockedMembers: {},
  uniqueCode: {
    type: String,
    required: false,
    default: null,
  },
},{timestamps:true});

const groupModel =
  (mongoose.models.Group as mongoose.Model<group>) ||
  mongoose.model<group>("Group", groupSchema);

export default groupModel;
