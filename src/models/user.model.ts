import mongoose, { Schema, Document } from "mongoose";

import { Group, Notifications } from "./model.interface";

//use Document for TS for Type Safety

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  adminOfGroups: Group[];
  adminOfGroupsCount: number;
  joinedGroups: Group[];
  groupAllowed: number;
  extraGroupAllowed: number;
  isSubscribed: boolean;
  currentStatus: boolean;
  notifications: Notifications[];
  profileImage: string;
  token: string;
  isPrivateProfile: boolean;
  requestedForGroups: Group[];
  providerIds: Array<String>;
}

//Schema for type Safety and document follow this scehma
export const UserSchema: Schema<User> = new Schema(
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
    adminOfGroups: {
      type: [Schema.Types.ObjectId],
      ref: "Group",
    },
    adminOfGroupsCount: {
      type: Number,
      default: 0,
    },
    joinedGroups: {
      type: [Schema.Types.ObjectId],
      ref: "Group",
    },
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
    notifications: {
      type: [Schema.Types.ObjectId],
      ref: "Notification",
    },
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
    requestedForGroups: {
      type: [Schema.Types.ObjectId],
      ref: "Group",
    },
    providerIds: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
