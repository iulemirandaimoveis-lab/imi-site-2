import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Helper to create a safe mock client that won't crash build
const createMockClient = () => {
    console.warn('⚠️  Supabase env vars missing - using MOCK client for build/SSR')

    const noop = () => {
        return {
            select: noop,
            insert: noop,
            update: noop,
            delete: noop,
            eq: noop,
            neq: noop,
            gt: noop,
            lt: noop,
            in: noop,
            single: () => Promise.resolve({ data: null, error: null }),
            maybeSingle: () => Promise.resolve({ data: null, error: null }),
            limit: noop,
            order: noop,
            range: noop,
            data: null,
            error: null,
            then: (resolve: any) => resolve({ data: [], error: null }) // Default to empty array result
        }
    }

    return new Proxy({}, {
        get: (target, prop) => {
            if (prop === 'auth') {
                return {
                    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                    signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
                    signOut: () => Promise.resolve({ error: null })
                }
            }
            if (prop === 'storage') {
                return {
                    from: () => ({
                        getPublicUrl: () => ({ data: { publicUrl: '' } }),
                        upload: () => {
                            console.error('❌ MOCK SUPABASE CLIENT: Cannot upload because env vars are missing.')
                            return Promise.resolve({ data: null, error: { message: 'Ambiente não configurado (Env Vars). Upload simulado falhou.' } })
                        }
                    })
                }
            }
            // Return a chainable no-op function for any table operation
            return noop
        }
    }) as any
}

// Ensure we have valid consts for the REAL client
const isValidEnv = supabaseUrl && supabaseAnonKey

// Export safe clients
export const supabase = isValidEnv
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockClient()

export const supabaseAdmin = (isValidEnv && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : createMockClient()
