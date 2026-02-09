'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Building2, Users, FileText, Calendar, Settings, LogOut } from 'lucide-react'

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser() {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            router.push('/login')
            return
        }

        setUser(session.user)
        setIsLoading(false)
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/login')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-navy-900 font-semibold">Carregando...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex">
                <aside className="w-64 min-h-screen bg-navy-900 text-white">
                    <div className="p-6">
                        <h1 className="font-display text-2xl font-bold">IMI Admin</h1>
                    </div>

                    <nav className="px-4 space-y-2">
                        <Link
                            href="/backoffice"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Dashboard
                        </Link>

                        <Link
                            href="/backoffice/imoveis"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Building2 className="w-5 h-5" />
                            Imóveis
                        </Link>

                        <Link
                            href="/backoffice/construtoras"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Users className="w-5 h-5" />
                            Construtoras
                        </Link>

                        <Link
                            href="/backoffice/conteudos"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <FileText className="w-5 h-5" />
                            Conteúdos
                        </Link>

                        <Link
                            href="/backoffice/consultoria"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <Calendar className="w-5 h-5" />
                            Consultoria
                        </Link>
                    </nav>

                    <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            Sair
                        </button>
                    </div>
                </aside>

                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
