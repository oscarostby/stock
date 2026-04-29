import { NextResponse } from "next/server";
import {
  officeCookieName,
  readOfficeSessionValue,
} from "./app/instalyd-kontor/auth";

function redirectToLogin(request) {
  const loginUrl = new URL("/instalyd-kontor/login", request.url);
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (nextPath.startsWith("/instalyd-kontor")) {
    loginUrl.searchParams.set("next", nextPath);
  }

  return NextResponse.redirect(loginUrl);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionValue = request.cookies.get(officeCookieName)?.value;
  const sessionUser = readOfficeSessionValue(sessionValue);

  if (pathname === "/instalyd-kontor/login") {
    if (sessionUser) {
      return NextResponse.redirect(new URL("/instalyd-kontor", request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/instalyd-kontor/logout") {
    return NextResponse.next();
  }

  if (pathname === "/instalyd-kontor/authenticate") {
    return NextResponse.next();
  }

  if (!sessionUser) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/instalyd-kontor/:path*"],
};
