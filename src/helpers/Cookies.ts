import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const cookie = async (data: any = undefined) => {
  const decodeData = jwt.sign({ data }, process.env.JWT_SECRET_KEY || "", {
    algorithm: "HS384",
    expiresIn: "1d",
  });
  const res = NextResponse.json(
    {
      success: true,
      message: "Request successfully",
      token: decodeData,
    },
    { status: 200 }
  );
  res.cookies.set({
    name: process.env.TokenName || "AccessToken",
    value: decodeData,
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
  return res;
};
