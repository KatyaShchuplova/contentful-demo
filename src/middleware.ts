import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (locales.some((loc) => pathname.startsWith(`/${loc}`))) return;

  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
