import mongoose, { Schema, Document } from "mongoose";
import { User } from "./model.interface";


export interface Members extends Document {
  isShowDetailes: boolean;
  userID: User;
  username: string;
  isActive: boolean;
}

const MembersSchema = new Schema(
  {
    isShowDetailes: {
      type: Boolean,
      default: false,
    },
    userID: {
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    username: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


export const MembersModel =
  (mongoose.models.Member as mongoose.Model<Members>) ||
  mongoose.model<Members>("Member", MembersSchema);


