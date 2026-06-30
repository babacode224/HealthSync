import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/", "/login", "/signup", "/register/provider"];

const roleRouteMap: Record<string, string> = {
  PATIENT: "/dashboard",
  DOCTOR: "/doctor",
  PHARMACIST: "/pharmacy",
  LAB_TECH: "/lab",
  ADMIN: "/admin",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!token && !isPublic) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublic && pathname !== "/") {
    const role = (token.role as string) || "PATIENT";
    const redirectTo = roleRouteMap[role] || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, req.url));
  }

  if (token) {
    const role = token.role as string;
    const protectedPrefixes = Object.values(roleRouteMap);
    const matchedPrefix = protectedPrefixes.find((prefix) =>
      pathname.startsWith(prefix)
    );

    if (matchedPrefix) {
      const allowedPrefix = roleRouteMap[role];
      if (role === "ADMIN" || matchedPrefix === allowedPrefix) {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL(allowedPrefix || "/dashboard", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
