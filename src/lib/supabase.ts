import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validação defensiva para build time
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️  Supabase env vars missing - using placeholder client')
    // Durante build sem env vars, cria cliente dummy
    const dummyUrl = 'https://placeholder.supabase.co'
    const dummyKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
}

const finalUrl = supabaseUrl || 'https://placeholder.supabase.co'
const finalAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder'
const finalServiceKey = supabaseServiceRoleKey || finalAnonKey

export const supabase = createClient(finalUrl, finalAnonKey)

// Client com service role para operações admin
export const supabaseAdmin = createClient(finalUrl, finalServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
