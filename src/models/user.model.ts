import mongoose, { Schema, Document } from "mongoose";

import { group, notifications } from "./model.interface";
import { groupModel, notificationsModel } from "./models";

//use Document for TS for Type Safety

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  adminOfGroups: group[];
  adminOfGroupsCount: number;
  joinedGroups: group[];
  groupAllowed: number;
  extraGroupAllowed: number;
  isSubscribed: boolean;
  currentStatus: boolean;
  notifications: notifications[];
  profileImage: string;
  token: string;
  isPrivateProfile: boolean;
  requestedForGroups: group[];
  providerIds: Array<String>;
}

//Schema for type Safety and document follow this scehma
export const userSchema: Schema<user> = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+..+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password are required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    adminOfGroups: [groupModel],
    adminOfGroupsCount: {
      type: Number,
      default: 0,
    },
    joinedGroups: [groupModel],
    groupAllowed: {
      type: Number,
      default: 3,
    },
    extraGroupAllowed: {
      type: Number,
      default: 0,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    currentStatus: {
      type: Boolean,
      default: true,
    },
    notifications: [notificationsModel],
    profileImage: {
      type: String,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    isPrivateProfile: {
      type: Boolean,
      default: false,
    },
    requestedForGroups: [groupModel],
    providerIds: [],
  },
  {
    timestamps: true,
  }
);

const userModel =
  (mongoose.models.Users as mongoose.Model<user>) ||
  mongoose.model<user>("User", userSchema);

export default userModel;
