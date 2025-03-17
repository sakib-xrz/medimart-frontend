import { jwtDecode, JwtPayload } from "jwt-decode";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY } from "./lib/constant";

interface CustomJwtPayload extends JwtPayload {
  role?: "ADMIN" | "CUSTOMER";
}

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/change-password", "/profile"];

const roleBasedRoutes = {
  ADMIN: [/^\/admin/],
  CUSTOMER: ["checkout", "my-orders"],
};

export function middleware(request: {
  nextUrl: { pathname: string };
  url: string;
}) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const accessToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(
        `/login?next=${pathname.startsWith("/") ? pathname.slice(1) : pathname}`,
        request.url,
      ),
    );
  }

  let decodedData: CustomJwtPayload | null = null;
  try {
    decodedData = jwtDecode<CustomJwtPayload>(accessToken);
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decodedData?.role;

  if (AuthRoutes.includes(pathname)) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  if (commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (role && roleBasedRoutes[role]) {
    const allowedRoutes = roleBasedRoutes[role];

    if (
      allowedRoutes.some((route) =>
        typeof route === "string" ? route === pathname : route.test(pathname),
      )
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/logout", request.url));
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/change-password",
    "/profile",
    "/admin/:path*",
    "/checkout",
    "/my-orders",
  ],
};
