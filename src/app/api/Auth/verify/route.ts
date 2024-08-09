import DBconnect from "@/lib/DBconnect";
import { OtpModel } from "@/models/OTP.model";
import { UserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  await DBconnect();
  try {
    const { OTP, email } = await request.json();
    const doc = await OtpModel.findOne({ email });
    if (!doc) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification Failled",
        },
        { status: 400 }
      );
    }
    // console.log(OTP,email,doc)
    if (doc.OTP == OTP) {
      const user = await UserModel.findOneAndUpdate(
        { email },
        { isEmailVerified: true }
      );
      if (!user) {
        return NextResponse.json(
          {
            success: false,
            message: "Verification Failled",
          },
          { status: 400 }
        );
      }
      await OtpModel.deleteOne({ email });
      return NextResponse.json(
        {
          success: true,
          message: "Verification Success",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Verification Failled",
      },
      { status: 400 }
    );
  }
}
