'use client'

import { useState, useEffect } from 'react'
import BackofficeSidebar from '@/components/backoffice/Sidebar'
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    EyeIcon,
    UsersIcon,
    BuildingOfficeIcon,
    CalendarIcon
} from '@heroicons/react/24/outline'

interface Stats {
    totalLeads: number
    totalProperties: number
    totalViews: number
    totalRevenue: number
    leadsGrowth: number
    propertiesGrowth: number
    viewsGrowth: number
    revenueGrowth: number
}

export default function ReportsPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [period, setPeriod] = useState('30d')

    useEffect(() => {
        fetchStats()
    }, [period])

    const fetchStats = async () => {
        try {
            const response = await fetch(`/api/reports?period=${period}`)
            const data = await response.json()
            setStats(data.stats)
        } catch (error) {
            console.error('Erro ao buscar relatórios:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const statCards = stats ? [
        {
            name: 'Total de Leads',
            value: stats.totalLeads,
            change: stats.leadsGrowth,
            icon: UsersIcon,
            color: 'blue',
        },
        {
            name: 'Imóveis Ativos',
            value: stats.totalProperties,
            change: stats.propertiesGrowth,
            icon: BuildingOfficeIcon,
            color: 'green',
        },
        {
            name: 'Visualizações',
            value: stats.totalViews.toLocaleString('pt-BR'),
            change: stats.viewsGrowth,
            icon: EyeIcon,
            color: 'purple',
        },
        {
            name: 'Receita Potencial',
            value: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
            }).format(stats.totalRevenue),
            change: stats.revenueGrowth,
            icon: ChartBarIcon,
            color: 'orange',
        },
    ] : []

    return (
        <div className="flex h-screen bg-neutral-50">
            <BackofficeSidebar />

            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                    <div className="px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-neutral-900">
                                    Relatórios e Analytics
                                </h1>
                                <p className="text-neutral-600 mt-1">
                                    Visão geral do desempenho do negócio
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none bg-white"
                                >
                                    <option value="7d">Últimos 7 dias</option>
                                    <option value="30d">Últimos 30 dias</option>
                                    <option value="90d">Últimos 90 dias</option>
                                    <option value="1y">Último ano</option>
                                </select>
                                <button className="px-4 py-2 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors font-medium">
                                    Exportar PDF
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
                            <p className="text-neutral-600 mt-4">Carregando relatórios...</p>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {statCards.map((stat) => (
                                    <div
                                        key={stat.name}
                                        className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                                                <stat.icon className={`h-6 w-6 text-${stat.color}-700`} />
                                            </div>
                                            <div className={`flex items-center gap-1 text-sm font-semibold ${stat.change >= 0 ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                {stat.change >= 0 ? (
                                                    <ArrowTrendingUpIcon className="w-4 h-4" />
                                                ) : (
                                                    <ArrowTrendingDownIcon className="w-4 h-4" />
                                                )}
                                                {Math.abs(stat.change)}%
                                            </div>
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

                            {/* Charts Placeholder */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                                    <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
                                        Leads por Origem
                                    </h3>
                                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-xl">
                                        <p className="text-neutral-500">Gráfico de pizza será implementado</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                                    <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
                                        Visualizações ao Longo do Tempo
                                    </h3>
                                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-xl">
                                        <p className="text-neutral-500">Gráfico de linha será implementado</p>
                                    </div>
                                </div>
                            </div>

                            {/* Top Properties */}
                            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                                <h3 className="text-lg font-display font-bold text-neutral-900 mb-4">
                                    Imóveis Mais Visualizados
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                                                    <BuildingOfficeIcon className="w-8 h-8 text-primary-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-900">
                                                        Apartamento {i} - Exemplo
                                                    </p>
                                                    <p className="text-sm text-neutral-600">
                                                        Boa Viagem, Recife
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-display font-bold text-primary-700">
                                                    {(1000 - i * 100).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-neutral-600">visualizações</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
