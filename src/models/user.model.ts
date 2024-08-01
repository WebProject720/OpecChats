import mongoose, { Schema, Document } from "mongoose";
//use Document for TS for Type Safety

export interface User extends Document {
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
  createdAt: Date;
  lastUpdated: Date;
}

//Schema for type Safety and document follow this scehma
export const userSchema: Schema<User> = new Schema({
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default userModel;
