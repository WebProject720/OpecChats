import { NextResponse } from "next/server";

export const cookie = (data=undefined) => {
  const res = NextResponse.json(
    {
      success: true,
      message: "Request successfully",
      data:undefined
    },
    { status: 200 }
  );
  res.cookies.set({
    name: "AccessToken",
    value: "fghjkfghjk",
    httpOnly: true,
  });
  res.cookies.set({
    name: "RefreshToken",
    value: "fghjkfghjk",
    httpOnly: true,
  });
  return res;
};
