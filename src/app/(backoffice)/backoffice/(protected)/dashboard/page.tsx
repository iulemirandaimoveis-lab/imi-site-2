'use client'

import { useState, useEffect } from 'react'
import {
    UsersIcon,
    BuildingOfficeIcon,
    EyeIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        totalProperties: 0,
        totalViews: 0,
        totalRevenue: 0,
        leadsGrowth: 0,
        propertiesGrowth: 0,
        viewsGrowth: 0
    })
    const [recentLeads, setRecentLeads] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadDashboard() {
            try {
                // Fetch Stats
                const statsRes = await fetch('/api/reports?period=30d')
                const statsData = await statsRes.json()
                if (statsData.stats) setStats(statsData.stats)

                // Fetch Recent Leads
                const leadsRes = await fetch('/api/leads')
                const leadsData = await leadsRes.json()
                if (leadsData.clients) {
                    setRecentLeads(leadsData.clients.slice(0, 5))
                }
            } catch (error) {
                console.error('Erro ao carregar dashboard', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadDashboard()
    }, [])

    const statCards = [
        {
            name: 'Total de Leads',
            value: stats.totalLeads,
            change: `${stats.leadsGrowth}%`,
            changeType: stats.leadsGrowth >= 0 ? 'positive' : 'negative',
            icon: UsersIcon,
        },
        {
            name: 'Imóveis Ativos',
            value: stats.totalProperties,
            change: `${stats.propertiesGrowth}%`,
            changeType: stats.propertiesGrowth >= 0 ? 'positive' : 'negative',
            icon: BuildingOfficeIcon,
        },
        {
            name: 'Visualizações (30d)',
            value: stats.totalViews,
            change: `${stats.viewsGrowth}%`,
            changeType: stats.viewsGrowth >= 0 ? 'positive' : 'negative',
            icon: EyeIcon,
        },
        {
            name: 'Valor em Carteira',
            value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: 'compact' }).format(stats.totalRevenue),
            change: 'Total',
            changeType: 'neutral',
            icon: CurrencyDollarIcon,
        },
    ]

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-900">
                        Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-neutral-600 mt-1">
                        Visão geral do sistema
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary-100 rounded-xl">
                                <stat.icon className="h-6 w-6 text-primary-700" />
                            </div>
                            <span
                                className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.changeType === 'positive'
                                    ? 'bg-green-100 text-green-700'
                                    : stat.changeType === 'negative'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-neutral-100 text-neutral-700'
                                    }`}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600 mb-1">{stat.name}</p>
                            <p className="text-3xl font-display font-bold text-neutral-900">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Leads */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold text-neutral-900">
                            Leads Recentes
                        </h2>
                        <a
                            href="/backoffice/leads"
                            className="text-sm text-primary-700 hover:text-primary-900 font-semibold"
                        >
                            Ver todos →
                        </a>
                    </div>
                    {recentLeads.length === 0 ? (
                        <p className="text-neutral-500 text-center py-4">Nenhum lead recente.</p>
                    ) : (
                        <div className="space-y-4">
                            {recentLeads.map((lead, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200 border border-neutral-100"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-semibold">
                                            {lead.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-neutral-900">
                                            {lead.name}
                                        </p>
                                        <p className="text-sm text-neutral-600 truncate">
                                            {lead.email}
                                        </p>
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-display font-bold mb-4">
                    Ações Rápidas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button onClick={() => window.location.href = '/backoffice/leads'} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Adicionar Lead</p>
                        <p className="text-sm text-white/80">Cadastrar novo cliente</p>
                    </button>
                    <button onClick={() => window.location.href = '/backoffice/properties/new'} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Novo Imóvel</p>
                        <p className="text-sm text-white/80">Cadastrar propriedade</p>
                    </button>
                    <button onClick={() => window.location.href = '/backoffice/reports'} className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Gerar Relatório</p>
                        <p className="text-sm text-white/80">Analytics e métricas</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
