import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (req.nextUrl.pathname.startsWith('/backoffice')) {
        // Treat root backoffice as potential login redirect
        if (req.nextUrl.pathname === '/backoffice' || req.nextUrl.pathname === '/backoffice/login') {
            if (session) {
                return NextResponse.redirect(new URL('/backoffice/dashboard', req.url));
            }
            return res;
        }

        if (!session) {
            return NextResponse.redirect(new URL('/backoffice/login', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: '/backoffice/:path*',
};
