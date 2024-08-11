import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const verifyCookie = (request: NextRequest) => {
  const cookies: any = request.cookies.get(process.env.TokenName || "");
  if (!cookies) {
    return false
  }
  console.log(cookies);
  const res= jwt.verify(cookies.value, process.env.JWT_SECRET_KEY || "");
  return res;
};
