import DBconnect from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await DBconnect();

  try {
    const { username, email, password } = await request.json();
    // if (!username || !email || !password) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "All fields are required ",
    //     },
    //     { status: 400 }
    //   );
    // }
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
      return NextResponse.json(
        {
          message: "user register successfully",
          success: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Something went wrong");
    return NextResponse.json(
      {
        message: "User signUp failled",
        success: false,
      },
      { status: 400 }
    );
  }
}
