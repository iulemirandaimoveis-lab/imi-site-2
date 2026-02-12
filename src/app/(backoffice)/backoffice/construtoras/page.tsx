'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'

interface Developer {
    id: string
    name: string
    initials: string
    location: string
    activeProperties: number
    leadsGenerated: number
    lastUpdate: string
    isPremium: boolean
}

const mockDevelopers: Developer[] = [
    {
        id: '1',
        name: 'Cyrela',
        initials: 'Cy',
        location: 'São Paulo, SP',
        activeProperties: 42,
        leadsGenerated: 1284,
        lastUpdate: '2h atrás',
        isPremium: true,
    },
    {
        id: '2',
        name: 'EZTEC',
        initials: 'Ez',
        location: 'Zona Sul, SP',
        activeProperties: 28,
        leadsGenerated: 892,
        lastUpdate: '5h atrás',
        isPremium: true,
    },
    {
        id: '3',
        name: 'Gafisa',
        initials: 'Ga',
        location: 'Jardins, SP',
        activeProperties: 15,
        leadsGenerated: 450,
        lastUpdate: '1d atrás',
        isPremium: false,
    },
    {
        id: '4',
        name: 'Moura Dubeux',
        initials: 'Md',
        location: 'Nordeste',
        activeProperties: 33,
        leadsGenerated: 672,
        lastUpdate: '3d atrás',
        isPremium: false,
    },
]

export default function DevelopersPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('Todas')

    const filters = ['Todas', 'Alta Performance', 'Residencial', 'Comercial']

    const filteredDevelopers = mockDevelopers.filter((dev) => {
        const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = activeFilter === 'Todas' || 
            (activeFilter === 'Alta Performance' && dev.isPremium)
        return matchesSearch && matchesFilter
    })

    return (
        <div className="max-w-2xl mx-auto space-y-4 pb-4">
            {/* Search Bar + Filters */}
            <div className="sticky top-16 z-40 bg-background-light dark:bg-background-dark pb-2 pt-0">
                <div className="relative mb-3">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="search" className="text-gray-400" />
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border-none rounded-xl leading-5 bg-white dark:bg-card-dark text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary shadow-soft"
                        placeholder="Buscar construtora..."
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                                activeFilter === filter
                                    ? 'bg-imi-dark-blue dark:bg-primary text-white shadow-md'
                                    : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Parceiros Premium
                </h2>
                <span className="text-xs text-primary font-medium">
                    {filteredDevelopers.length} encontrados
                </span>
            </div>

            {/* Developer Cards */}
            <div className="space-y-4">
                {filteredDevelopers.map((developer) => (
                    <div
                        key={developer.id}
                        className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-card border border-gray-100 dark:border-gray-800 relative group transition-transform active:scale-[0.98] hover:shadow-card-hover cursor-pointer"
                    >
                        {/* Premium Badge */}
                        {developer.isPremium && (
                            <div className="absolute top-4 right-4 bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1">
                                <Icon name="star" size={14} filled />
                                <span className="text-[10px] font-bold uppercase tracking-wide">
                                    High Performance
                                </span>
                            </div>
                        )}

                        {/* Header: Logo + Name */}
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center p-2">
                                <div className="text-2xl font-display font-bold text-imi-dark-blue dark:text-white">
                                    {developer.initials}
                                </div>
                            </div>
                            <div className="pt-1">
                                <h3 className="text-lg font-bold text-text-header-light dark:text-white leading-tight">
                                    {developer.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                                    <Icon name="location_on" size={14} />
                                    {developer.location}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 uppercase font-medium">
                                    Imóveis Ativos
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <Icon
                                        name="apartment"
                                        size={16}
                                        className="text-imi-dark-blue dark:text-gray-300"
                                    />
                                    <span className="text-sm font-bold text-imi-dark-blue dark:text-white">
                                        {developer.activeProperties} Empreendimentos
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col border-l border-gray-200 dark:border-gray-700 pl-3">
                                <span className="text-[10px] text-gray-500 uppercase font-medium">
                                    Leads Gerados
                                </span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <Icon name="groups" size={16} className="text-primary" />
                                    <span className="text-sm font-bold text-imi-dark-blue dark:text-white">
                                        {developer.leadsGenerated.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                Última atualização: {developer.lastUpdate}
                            </span>
                            <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:text-yellow-600 transition-colors">
                                Ver Detalhes
                                <Icon name="chevron_right" size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredDevelopers.length === 0 && (
                <div className="bg-white dark:bg-card-dark rounded-xl p-8 text-center shadow-soft border border-gray-100 dark:border-gray-800">
                    <Icon name="search_off" size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Nenhuma construtora encontrada
                    </p>
                </div>
            )}
        </div>
    )
}
