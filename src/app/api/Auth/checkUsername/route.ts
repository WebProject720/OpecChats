"use server";
import DBconnect from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await DBconnect();
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "username is required",
        },
        { status: 400 }
      );
    }
    const users = await UserModel.findOne({ username });
    if (users) {
      return NextResponse.json(
        {
          success: false,
          message: "username already taken",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "username is unique",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
        success: false,
      },
      { status: 500 }
    );
  }
}
