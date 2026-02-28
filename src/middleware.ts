// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Pages only for non-logged-in users
  const authPages = ["/login", "/register"];
  // Pages that require login
  const protectedPages = ["/products", "/cart", "/checkout", "/profile", "/orders"];

  // Redirect logged-in users away from auth pages
  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect non-logged-in users from protected pages
  if (!token && protectedPages.some(page => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: [
    "/products/:path*",
    "/cart/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};