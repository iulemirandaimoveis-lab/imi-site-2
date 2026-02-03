'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import PropertyCard from '@/components/ui/PropertyCard'
import Select from '@/components/ui/Select'
import { mockProperties } from '@/lib/mock-data'
import { PropertyType, PropertyStatus, PropertyPurpose } from '@/types/property'

export default function ImoveisPage() {
    const [filters, setFilters] = useState({
        type: '' as PropertyType | '',
        status: '' as PropertyStatus | '',
        city: '',
        purpose: '' as PropertyPurpose | '',
    })

    const filteredProperties = mockProperties.filter((property) => {
        if (filters.type && property.type !== filters.type) return false
        if (filters.status && property.status !== filters.status) return false
        if (filters.city && property.city !== filters.city) return false
        if (filters.purpose && property.purpose !== filters.purpose) return false
        return true
    })

    const cities = Array.from(new Set(mockProperties.map(p => p.city)))

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white">
                <div className="container-custom py-16 lg:py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1 variants={slideUp} className="text-display-md md:text-display-lg font-bold mb-6">
                            Imóveis
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100">
                            Corretagem com curadoria técnica. Lançamentos e usados selecionados
                            com análise de mercado e viabilidade.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="bg-neutral-50 border-b border-neutral-200">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Select
                            label="Tipo"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value as PropertyType | '' })}
                            options={[
                                { value: '', label: 'Todos os tipos' },
                                { value: 'apartment', label: 'Apartamento' },
                                { value: 'house', label: 'Casa' },
                                { value: 'commercial', label: 'Comercial' },
                                { value: 'land', label: 'Terreno' },
                            ]}
                        />

                        <Select
                            label="Status"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value as PropertyStatus | '' })}
                            options={[
                                { value: '', label: 'Todos' },
                                { value: 'lancamento', label: 'Lançamento' },
                                { value: 'usado', label: 'Usado' },
                            ]}
                        />

                        <Select
                            label="Cidade"
                            value={filters.city}
                            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                            options={[
                                { value: '', label: 'Todas as cidades' },
                                ...cities.map(city => ({ value: city, label: city })),
                            ]}
                        />

                        <Select
                            label="Finalidade"
                            value={filters.purpose}
                            onChange={(e) => setFilters({ ...filters, purpose: e.target.value as PropertyPurpose | '' })}
                            options={[
                                { value: '', label: 'Todas' },
                                { value: 'moradia', label: 'Moradia' },
                                { value: 'investimento', label: 'Investimento' },
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Properties Grid */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {filteredProperties.length > 0 ? (
                            <>
                                <motion.div variants={slideUp} className="mb-6">
                                    <p className="text-neutral-600">
                                        {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProperties.map((property) => (
                                        <motion.div key={property.id} variants={slideUp}>
                                            <PropertyCard property={property} />
                                        </motion.div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <motion.div variants={slideUp} className="text-center py-16">
                                <svg className="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                    Nenhum imóvel encontrado
                                </h3>
                                <p className="text-neutral-600">
                                    Tente ajustar os filtros para ver mais resultados.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-primary-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-6">
                            Não encontrou o que procura?
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-neutral-700 mb-8">
                            Entre em contato conosco. Podemos ajudar a encontrar o imóvel ideal
                            ou avaliar oportunidades específicas para seu perfil.
                        </motion.p>
                        <motion.div variants={slideUp}>
                            <a
                                href="/contato"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 transition-colors"
                            >
                                Falar com Especialista
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Floating Backoffice Button */}
            <Link
                href="/backoffice"
                className="fixed bottom-6 right-6 z-50 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-lg shadow-2xl transition-all duration-200 flex items-center gap-2 text-sm font-medium border border-slate-600 hover:scale-105"
                title="Acessar Backoffice"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
            </Link>
        </div>
    )
}
