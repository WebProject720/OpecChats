import { verifyCookie } from "@/helpers/verifyCookie";
import { NextRequest, NextResponse } from "next/server";

export function authenticate (request: NextRequest) {

  if (!verifyCookie(request)) {
    return NextResponse.json(
      {
        success: false,
        message: "Credientials Required",
      },
      { status: 404 }
    );
  }
  return NextResponse.next();
}
