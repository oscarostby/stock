import { NextResponse } from "next/server";
import { officeCookieName } from "../auth";

export async function GET(request) {
  const response = NextResponse.redirect(new URL("/instalyd-kontor/login", request.url), 303);

  response.cookies.set({
    name: officeCookieName,
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/instalyd-kontor",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });

  return response;
}
