import mongoose, { Schema, Document } from "mongoose";
import { user } from "./model.interface";
import { userModel } from "./models";


export interface members extends Document {
  isShowDetailes: boolean;
  userID: user;
  username: string;
  isActive: boolean;
}

const membersSchema = new Schema(
  {
    isShowDetailes: {
      type: Boolean,
      default: false,
    },
    userID: userModel,
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

const membersModel =
  (mongoose.models.Chat as mongoose.Model<members>) ||
  mongoose.model<members>("Chat", membersSchema);

export default membersModel;
