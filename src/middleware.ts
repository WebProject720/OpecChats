import { NextRequest, NextResponse } from "next/server";
import { state } from "./store/poxy";
const logout = () => {
  (state.loggedUser = {}), (state.isActive = false);
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(
    process.env.TokenName || "AccessToken"
  );
  const GuestTokenName = request.cookies.get(
    process.env.GuestTokenName || "GuestTokenName"
  );
  if (GuestTokenName && !accessToken) {
    state.isActive = true;
    state.loggedUser = { name: "guest" }
  }
  if (!accessToken && !GuestTokenName) {
    logout();
  }
  const url = request.nextUrl.clone();
  console.log(request?.url.endsWith("/dashboard"));
  
  
  if (request?.url.includes("/auth") && accessToken?.value) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if ((request.url.includes('/group') && !GuestTokenName) && (!accessToken)) {
    console.log(request.url);
    url.pathname = "/";
    logout()
    return NextResponse.redirect(url);
  } else if ((request?.url.endsWith("/dashboard") && !accessToken)) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*", "/api/:path*"],
};
