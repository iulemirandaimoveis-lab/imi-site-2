'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Building2, Users, FileText, Calendar } from 'lucide-react'

export default function DashboardPage() {
    const supabase = createClient()
    const [stats, setStats] = useState({
        developments: 0,
        developers: 0,
        content: 0,
        consultations: 0
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    async function fetchStats() {
        setIsLoading(true)
        try {
            const [devCount, developerCount, contentCount, consultationCount] = await Promise.all([
                supabase.from('developments').select('*', { count: 'exact', head: true }),
                supabase.from('developers').select('*', { count: 'exact', head: true }),
                supabase.from('content').select('*', { count: 'exact', head: true }),
                supabase.from('consultations').select('*', { count: 'exact', head: true })
            ])

            if (devCount.error) {
                console.error('Error fetching developments count:', devCount.error)
            }
            if (developerCount.error) {
                console.error('Error fetching developers count:', developerCount.error)
            }
            if (contentCount.error) {
                console.error('Error fetching content count:', contentCount.error)
            }
            if (consultationCount.error) {
                console.error('Error fetching consultations count:', consultationCount.error)
            }

            setStats({
                developments: devCount.count || 0,
                developers: developerCount.count || 0,
                content: contentCount.count || 0,
                consultations: consultationCount.count || 0
            })
        } catch (err: any) {
            console.error('Caught error in Dashboard:', err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className="p-8">Carregando...</div>
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-imi-900 mb-8">Dashboard</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-imi-900">{stats.developments}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">Imóveis</h3>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-imi-900">{stats.developers}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">Construtoras</h3>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-imi-900">{stats.content}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">Conteúdos</h3>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-imi-900">{stats.consultations}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">Consultorias</h3>
                </div>
            </div>
        </div>
    )
}
