import mongoose, { Schema, Document } from "mongoose";
//use Document for TS for Type Safety

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  adminOfGroups: Array<string>;
  adminOfGroupsCount: number;
  joinedGroups: Array<string>;
  groupAllowed: number;
  extraGroupAllowed: number;
  isSubscribed: boolean;
  currentStatus: boolean;
  notifications: Array<string>;
  profileImage: string;
  token: string;
  isPrivateProfile: boolean;
  requestedForGroups: Array<string>;
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
    adminOfGroups: {},
    adminOfGroupsCount: {
      type: Number,
      default: 0,
    },
    joinedGroups: {},
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
    notifications: {},
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
    requestedForGroups: {},
    providerIds: {},
  },
  {
    timestamps: true,
  }
);

const userModel =
  (mongoose.models.Users as mongoose.Model<user>) ||
  mongoose.model<user>("User", userSchema);

export default userModel;
