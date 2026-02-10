import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        console.error('Supabase Client Error: Missing environment variables', { url: !!url, key: !!key })
        throw new Error('Supabase URL or Key is missing. Check .env.local')
    }

    return createBrowserClient(url, key)
}
