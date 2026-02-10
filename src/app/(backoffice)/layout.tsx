'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import BackofficeShell from '@/components/backoffice/Shell'
import Header from '@/components/backoffice/Header'

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        try {
            // Add timeout race condition
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Auth check timeout')), 10000)
            )

            const authPromise = supabase.auth.getSession()

            const { data: { session }, error } = await Promise.race([
                authPromise,
                timeoutPromise
            ]) as any

            if (error) {
                console.error('Auth check error:', error)
                throw error
            }

            if (!session && pathname !== '/login') {
                router.push('/login')
                return
            }
        } catch (error) {
            console.error('Failed to check auth:', error)
            // On error, redirect to login as safety measure
            if (pathname !== '/login') {
                router.push('/login')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-imi-900 font-semibold animate-pulse">Carregando...</div>
            </div>
        )
    }

    return (
        <BackofficeShell>
            <div className="flex flex-col h-full">
                <Header />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </BackofficeShell>
    )
}
