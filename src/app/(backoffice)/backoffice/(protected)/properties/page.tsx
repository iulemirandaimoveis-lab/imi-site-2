'use client'

import { useState, useEffect } from 'react'
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    BuildingOfficeIcon,
    EyeIcon
} from '@heroicons/react/24/outline'

interface Property {
    id: string
    title: string
    slug: string
    price: number
    area: number
    bedrooms: number
    bathrooms: number
    parkingSpots: number
    neighborhood: string
    city: string
    status: string
    isFeatured: boolean
    viewCount: number
    createdAt: string
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState<string>('ALL')

    useEffect(() => {
        fetchProperties()
    }, [])

    const [error, setError] = useState('')

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        setIsLoading(true)
        setError('')
        try {
            const response = await fetch('/api/properties')
            if (!response.ok) {
                throw new Error('Falha ao carregar imóveis')
            }
            const data = await response.json()
            setProperties(data.properties || [])
        } catch (error) {
            console.error('Erro ao buscar imóveis:', error)
            setError('Não foi possível carregar a lista de imóveis. Tente recarregar a página.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.')) return

        try {
            const response = await fetch(`/api/properties/${id}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('Erro ao excluir')

            // Optimistic update or refetch
            setProperties(prev => prev.filter(p => p.id !== id))
            alert('Imóvel excluído com sucesso!')
        } catch (error) {
            console.error('Erro ao excluir imóvel:', error)
            alert('Erro ao excluir o imóvel. Tente novamente.')
        }
    }

    const filteredProperties = properties.filter(property => {
        const matchesSearch =
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === 'ALL' || property.status === filterStatus

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        const badges = {
            AVAILABLE: { label: 'Disponível', class: 'bg-green-100 text-green-700' },
            RESERVED: { label: 'Reservado', class: 'bg-yellow-100 text-yellow-700' },
            SOLD: { label: 'Vendido', class: 'bg-red-100 text-red-700' },
            ANALYSIS: { label: 'Em Análise', class: 'bg-blue-100 text-blue-700' },
        }
        return badges[status as keyof typeof badges] || badges.AVAILABLE
    }

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="px-4 py-4 md:px-8 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-3xl font-display font-bold text-neutral-900">
                                Gestão de Imóveis
                            </h1>
                            <p className="text-sm md:text-base text-neutral-600 mt-1">
                                {properties.length} {properties.length === 1 ? 'imóvel cadastrado' : 'imóveis cadastrados'}
                            </p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/backoffice/properties/new'}
                            className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Novo Imóvel
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Buscar por título, bairro ou cidade..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none bg-white"
                        >
                            <option value="ALL">Todos os Status</option>
                            <option value="AVAILABLE">Disponível</option>
                            <option value="RESERVED">Reservado</option>
                            <option value="SOLD">Vendido</option>
                            <option value="ANALYSIS">Em Análise</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
                        <p className="text-neutral-600 mt-4">Carregando imóveis...</p>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BuildingOfficeIcon className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {searchTerm || filterStatus !== 'ALL' ? 'Nenhum imóvel encontrado' : 'Nenhum imóvel cadastrado'}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            {searchTerm || filterStatus !== 'ALL'
                                ? 'Tente ajustar os filtros de busca'
                                : 'Comece adicionando seu primeiro imóvel'
                            }
                        </p>
                        {!searchTerm && filterStatus === 'ALL' && (
                            <button
                                onClick={() => window.location.href = '/backoffice/properties/new'}
                                className="px-6 py-3 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors"
                            >
                                Adicionar Primeiro Imóvel
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => {
                            const statusBadge = getStatusBadge(property.status)
                            return (
                                <div
                                    key={property.id}
                                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    {/* Image Placeholder */}
                                    <div className="h-48 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center relative">
                                        <BuildingOfficeIcon className="w-16 h-16 text-primary-300" />
                                        {property.isFeatured && (
                                            <div className="absolute top-4 right-4 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                Destaque
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="font-display font-bold text-lg text-neutral-900 line-clamp-2">
                                                {property.title}
                                            </h3>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusBadge.class} whitespace-nowrap ml-2`}>
                                                {statusBadge.label}
                                            </span>
                                        </div>

                                        <p className="text-sm text-neutral-600 mb-4">
                                            {property.neighborhood}, {property.city}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                                            <span>{property.bedrooms} 🛏️</span>
                                            <span>{property.bathrooms} 🚿</span>
                                            <span>{property.parkingSpots} 🚗</span>
                                            <span>{property.area}m²</span>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-2xl font-display font-bold text-primary-700">
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(property.price)}
                                            </p>
                                            <div className="flex items-center gap-1 text-sm text-neutral-500">
                                                <EyeIcon className="w-4 h-4" />
                                                {property.viewCount}
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => window.location.href = `/backoffice/properties/${property.id}`}
                                                className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors text-sm font-medium"
                                            >
                                                <PencilIcon className="w-4 h-4 inline mr-1" />
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                className="px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}
