import { NextRequest, NextResponse } from "next/server";
import { userMiddleware } from "./app/api/user/_middleware";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(
    process.env.TokenName || "AccessToken"
  );
  const url = request.nextUrl.clone();
  if (request?.url.includes("/auth") && accessToken?.value) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if (request?.url.includes("/dashboard") && !accessToken) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }else if(request?.url.includes('/api/user')){
    return userMiddleware(request)
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*",'/api/:path*'],
};
