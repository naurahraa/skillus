import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtected = pathname.startsWith("/dashboard");

  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtected && session) {
    if (pathname.startsWith("/dashboard/peserta") && role !== "peserta") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/dashboard/penyelenggara") && role !== "penyelenggara") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

// Sengaja EXCLUDE /dashboard/penyelenggara/event/* dari matcher, soalnya folder itu
// ada halaman upload file (Buat Event & Edit Event) yang kena bug Next.js:
// middleware yang "nyentuh" body request gede bisa bikin datanya kepotong
// ("Unexpected end of form"). Proteksi login buat halaman-halaman itu dipindah
// jadi manual, langsung di masing-masing page.tsx-nya.
export const config = {
  matcher: [
    "/dashboard/peserta/:path*",
    "/dashboard/admin/:path*",
    "/dashboard/penyelenggara",
    "/dashboard/penyelenggara/profil",
    "/login",
    "/register",
  ],
};