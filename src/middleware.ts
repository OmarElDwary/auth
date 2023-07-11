import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublic = path === "/login" || path === "/signup" || path === "/forgotpassword" || path === "/verifyemail" || path === "/resetpassword";

    const token = req.cookies.get("token")?.value || '';
    if (isPublic && token) {
        return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',  
        '/resetpassword'
    ]
}