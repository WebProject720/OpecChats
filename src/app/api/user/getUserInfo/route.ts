import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  return NextResponse.json(
    {
      success: true,
      message: "here is user details",
      data: data,
    },
    { status: 200 }
  );
}
