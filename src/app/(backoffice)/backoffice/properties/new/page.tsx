'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BackofficeSidebar from '@/components/backoffice/Sidebar'
import ImageUpload from '@/components/forms/ImageUpload'
import {
    ArrowLeftIcon,
    PhotoIcon,
    CurrencyDollarIcon,
    HomeIcon,
    MapPinIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline'

interface PropertyFormData {
    title: string
    description: string
    price: string
    area: string
    bedrooms: string
    bathrooms: string
    parkingSpots: string
    address: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    status: 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'ANALYSIS'
    isFeatured: boolean
    isExclusive: boolean
    images: { url: string; alt: string }[]
}

const initialForm: PropertyFormData = {
    title: '',
    description: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpots: '',
    address: '',
    neighborhood: '',
    city: 'Rio de Janeiro',
    state: 'RJ',
    zipCode: '',
    status: 'AVAILABLE',
    isFeatured: false,
    isExclusive: false,
    images: []
}

export default function NewPropertyPage() {
    const router = useRouter()
    const [formData, setFormData] = useState<PropertyFormData>(initialForm)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleImagesChange = (newImages: { url: string; alt: string }[]) => {
        setFormData(prev => ({ ...prev, images: newImages }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            // Validation logic before submit
            if (!formData.title || !formData.price || !formData.neighborhood) {
                throw new Error('Preencha os campos obrigatórios (Título, Preço, Bairro)')
            }

            // Require at least 1 image unless it's just an analysis
            if (formData.images.length === 0 && formData.status !== 'ANALYSIS') {
                throw new Error('Adicione pelo menos uma imagem do imóvel')
            }

            const payload = {
                ...formData,
                price: parseFloat(formData.price.replace(/[^\d.,]/g, '').replace(',', '.')),
                area: parseInt(formData.area) || 0,
                bedrooms: parseInt(formData.bedrooms) || 0,
                bathrooms: parseInt(formData.bathrooms) || 0,
                parkingSpots: parseInt(formData.parkingSpots) || 0,
                // Using real images
                images: formData.images
            }

            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar imóvel')
            }

            // Success
            router.push('/backoffice/properties')
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro ao salvar.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex h-screen bg-neutral-50">
            <BackofficeSidebar />

            <div className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto px-8 py-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-neutral-200"
                            >
                                <ArrowLeftIcon className="w-5 h-5 text-neutral-600" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-display font-bold text-neutral-900">
                                    Cadastrar Novo Imóvel
                                </h1>
                                <p className="text-neutral-600">
                                    Preencha os dados do imóvel para publicação
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center gap-2">
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section 1: Basic Info */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                                <HomeIcon className="w-5 h-5 text-primary-700" />
                                Informações Principais
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Título do Anúncio *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50/50 outline-none transition-all"
                                        placeholder="Ex: Apartamento de Luxo no Leblon"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Descrição Completa</label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50/50 outline-none transition-all"
                                        placeholder="Descreva os detalhes do imóvel..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Valor de Venda (R$) *</label>
                                    <div className="relative">
                                        <CurrencyDollarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                        <input
                                            type="text" // Using text to handle potential dots/commas input manually if needed
                                            name="price"
                                            required
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50/50 outline-none transition-all"
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Área (m²)</label>
                                    <input
                                        type="number"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-50/50 outline-none transition-all"
                                        placeholder="120"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 1.5: Media */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                                <PhotoIcon className="w-5 h-5 text-primary-700" />
                                Fotos do Imóvel
                            </h2>
                            <ImageUpload
                                images={formData.images}
                                onChange={handleImagesChange}
                            />
                        </div>

                        {/* Section 2: Details */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-primary-700" />
                                Detalhes e Características
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Quartos</label>
                                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Banheiros</label>
                                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Vagas</label>
                                    <input type="number" name="parkingSpots" value={formData.parkingSpots} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" placeholder="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none bg-white">
                                        <option value="AVAILABLE">Disponível</option>
                                        <option value="RESERVED">Reservado</option>
                                        <option value="SOLD">Vendido</option>
                                        <option value="ANALYSIS">Em Análise</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Address */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-primary-700" />
                                Localização
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Endereço</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" placeholder="Rua..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bairro *</label>
                                    <input type="text" name="neighborhood" required value={formData.neighborhood} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" placeholder="Ex: Ipanema" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Cidade</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Validation */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-neutral-700 font-medium">Imóvel em Destaque</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" name="isExclusive" checked={formData.isExclusive} onChange={handleChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-neutral-700 font-medium">Exclusividade IMI</span>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-6">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-primary-700 text-white font-medium rounded-xl hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Salvando...' : 'Cadastrar Imóvel'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
