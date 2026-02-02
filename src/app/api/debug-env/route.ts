import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const dbUrl = process.env.DATABASE_URL
    const directUrl = process.env.DIRECT_URL

    // Mascarar credenciais para segurança
    const mask = (str: string | undefined) => {
        if (!str) return 'MISSING ❌'
        try {
            const url = new URL(str)
            return `PRESENT ✅ (Host: ${url.hostname}, User: ${url.username})`
        } catch {
            return 'INVALID FORMAT ⚠️'
        }
    }

    return NextResponse.json({
        environment: process.env.NODE_ENV,
        vars: {
            DATABASE_URL: mask(dbUrl),
            DIRECT_URL: mask(directUrl),
            NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'PRESENT ✅' : 'MISSING ❌'
        },
        timestamp: new Date().toISOString()
    })
}
