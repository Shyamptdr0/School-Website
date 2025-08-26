import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Skip static files & Next internals
    if (pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
        return NextResponse.next();
    }

    // ⚡ Treat expired token as "no token"
    const isExpired = !token || token.expired;

    // Redirect /krishna-academy-admin root
    if (pathname === "/krishna-academy-admin") {
        if (!isExpired) {
            return NextResponse.redirect(
                new URL("/krishna-academy-admin/dashboard", req.url)
            );
        } else {
            return NextResponse.redirect(
                new URL("/krishna-academy-admin/login", req.url)
            );
        }
    }

    // Protect /krishna-academy-admin/* except /login
    if (
        pathname.startsWith("/krishna-academy-admin") &&
        pathname !== "/krishna-academy-admin/login"
    ) {
        if (isExpired) {
            return NextResponse.redirect(
                new URL("/krishna-academy-admin/login", req.url)
            );
        }
    }

    // Redirect logged-in admins away from /login
    if (pathname === "/krishna-academy-admin/login" && !isExpired) {
        return NextResponse.redirect(
            new URL("/krishna-academy-admin/dashboard", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/krishna-academy-admin/:path*", "/api/krishna-academy-admin/:path*"],
};
