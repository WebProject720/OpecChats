import { NextRequest, NextResponse } from "next/server";
import { state } from "./store/poxy";


export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (request?.url.includes("/auth") && state.isActive) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  else if (request?.url?.endsWith('/dashboard')) {
    if (state?.isGuest) {
      url.pathname = '/dashboard/group/search';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*", "/api/:path*"],
};
