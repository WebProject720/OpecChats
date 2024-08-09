import DBconnect from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";
import { signInSchema } from "@/schemas/authZOD";
import axios from "axios";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  await DBconnect();

  try {
    const body = await request.json();
    const { username, email, password } = signInSchema.parse(body);
    const userWithUsername = await UserModel.findOne({
      username,
    });
    if (userWithUsername) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is Already taken",
        },
        { status: 400 }
      );
    }

    const userWithEmail = await UserModel.findOne({ email });
    if (userWithEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email Is already in Use",
        },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      username,
      email,
      password: hashPassword,
    });

    const saveUser = await user.save();
    if (saveUser) {
      const emailResponse = await axios.post(`${process.env.SERVER_PATH}/auth/email`, {
        email: saveUser.email,
      });
      return NextResponse.json(
        {
          message: "user register successfully",
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          errors: error.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    console.log("Something went wrong in SignUp");
    return NextResponse.json(
      {
        message: "User signUp failled",
        success: false,
      },
      { status: 400 }
    );
  }
}
