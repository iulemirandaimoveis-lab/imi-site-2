
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { updateSession } from '@/lib/supabase/middleware'

const locales = ['pt', 'en', 'ja', 'ar', 'es']
const defaultLocale = 'pt'

function getLocale(request: Request) {
    const headers = { 'accept-language': request.headers.get('accept-language') || 'pt-BR,pt;q=0.9' }
    const languages = new Negotiator({ headers }).languages()
    return match(languages, locales, defaultLocale)
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 1. Handle API/Backoffice with Supabase Auth (ignore locale)
    if (pathname.startsWith('/backoffice') || pathname.startsWith('/api') || pathname.startsWith('/auth')) {
        return await updateSession(request)
    }

    // 2. Check for public assets/static files to ignore locale
    if (
        pathname.startsWith('/_next') ||
        pathname.includes('.') || // files (favicon.ico, image.png)
        pathname.startsWith('/monitoring')
    ) {
        return NextResponse.next()
    }

    // 3. Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // 4. Redirect to locale if missing
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // Redirect / to /pt (or detected locale)
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        )
    }

    // If locale is present, just continue
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Build matcher to catch everything EXCEPT specific static paths
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
