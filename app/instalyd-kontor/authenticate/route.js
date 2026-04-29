import { NextResponse } from "next/server";
import {
  createOfficeSessionValue,
  officeCookieMaxAge,
  officeCookieName,
  verifyOfficeCredentials,
} from "../auth";

function getSafeNextPath(value) {
  if (typeof value === "string" && value.startsWith("/instalyd-kontor")) {
    return value;
  }

  return "/instalyd-kontor";
}

export async function POST(request) {
  const formData = await request.formData();
  const username = (formData.get("username") || "").toString();
  const password = (formData.get("password") || "").toString();
  const nextPath = getSafeNextPath((formData.get("next") || "").toString());

  if (!verifyOfficeCredentials(username, password)) {
    const loginUrl = new URL("/instalyd-kontor/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), 303);

  response.cookies.set({
    name: officeCookieName,
    value: createOfficeSessionValue(username),
    httpOnly: true,
    maxAge: officeCookieMaxAge,
    path: "/instalyd-kontor",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });

  return response;
}
