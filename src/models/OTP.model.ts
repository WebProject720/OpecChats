import mongoose, { Schema, Document } from "mongoose";

export interface OTP extends Document {
  email: string;
  OTP: any;
  username?: string;
}

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    OTP: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OtpModel =
  (mongoose.models.Otp as mongoose.Model<OTP>) ||
  mongoose.model<OTP>("Otp", OtpSchema);

