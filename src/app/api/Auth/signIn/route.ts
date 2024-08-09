import DBconnect from "@/lib/DBconnect";
import { UserModel } from "@/models/user.model";
import { email, signInSchema } from "@/schemas/authZOD";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { cookie } from "@/helpers/Cookies";

export async function POST(request: NextRequest) {
  await DBconnect();
  try {
    const body = await request.json();
    const accessToken = request.cookies.get(process.env.TokenName||'AccessToken');
    console.log(accessToken);
    const { identifier, password } = signInSchema.parse(body);
    const user: any = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    const passwordCompare = await bcrypt.compare(password, user?.password);

    if (!passwordCompare) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password",
        },
        { status: 400 }
      );
    }

    return cookie({
      _id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
  }
}
