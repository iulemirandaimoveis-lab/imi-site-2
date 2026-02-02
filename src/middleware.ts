import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Verificar se é rota do backoffice (exceto login)
    if (request.nextUrl.pathname.startsWith('/backoffice') &&
        request.nextUrl.pathname !== '/backoffice') {

        const token = request.cookies.get('auth-token')?.value

        if (!token) {
            // Redirecionar para login se não autenticado
            return NextResponse.redirect(new URL('/backoffice', request.url))
        }

        // Token existe, permitir acesso (validação real ocorre nas API routes)
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/backoffice/:path*'],
}
