import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken")?.value; // Get token from cookies

  // If user is NOT logged in, redirect to login page
  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next(); // Allow the request to proceed
}

// Apply middleware only to protected pages
export const config = {
  matcher: ["/dashboard", "/product", "/upload"], // Add protected routes here
};
