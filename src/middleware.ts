import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(request: NextRequest) {
    const res = NextResponse.next();
    const authToken = request.cookies.get('auth-token')?.value;

    let hasSession = !!authToken;

    // Tentar Supabase como fallback
    try {
        if (!hasSession) {
            const supabase = createMiddlewareClient({ req: request, res });
            const { data: { session } } = await supabase.auth.getSession();
            if (session) hasSession = true;
        }
    } catch (e) {
        console.error('Supabase middleware bypass:', e);
    }

    // Se rota é /backoffice/*
    if (request.nextUrl.pathname.startsWith('/backoffice')) {
        // Permitir acesso à página de login
        if (request.nextUrl.pathname === '/backoffice') {
            if (hasSession) {
                // Se já está logado, redirecionar para dashboard
                return NextResponse.redirect(new URL('/backoffice/dashboard', request.url));
            }
            return res;
        }

        // Qualquer outra rota do backoffice requer autenticação
        if (!hasSession) {
            return NextResponse.redirect(new URL('/backoffice', request.url));
        }
    }

    return res;
}

export const config = {
    matcher: [
        '/backoffice/:path*',
    ],
};
