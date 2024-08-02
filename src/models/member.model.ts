import mongoose, { Schema, Document } from "mongoose";

export interface members extends Document {
  isShowDetailes: boolean;
  userID: string;
  username: string;
  isActive: boolean;
}

const membersSchema = new Schema(
  {
    isShowDetailes: {
      type: Boolean,
      default: false,
    },
    userID: {
      type: String,
      required: false,
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

const membersModel =
  (mongoose.models.Chat as mongoose.Model<members>) ||
  mongoose.model<members>("Chat", membersSchema);

export default membersModel;
