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
        if (req.nextUrl.pathname === '/backoffice') {
            if (session) {
                return NextResponse.redirect(new URL('/backoffice/dashboard', req.url));
            }
            return res;
        }

        if (!session) {
            return NextResponse.redirect(new URL('/backoffice', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: '/backoffice/:path*',
};
