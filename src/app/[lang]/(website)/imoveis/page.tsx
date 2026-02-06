'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import PropertyCard from '@/components/ui/PropertyCard'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { mockProperties } from '@/lib/mock-data'
import { PropertyType, PropertyStatus, PropertyPurpose } from '@/types/property'
import { Search } from 'lucide-react'

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
            {/* Hero - Premium Style */}
            <section className="bg-navy-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-10" />
                <div className="container-custom py-16 md:py-24 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1 variants={slideUp} className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Imóveis
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-slate-300 font-light leading-relaxed">
                            Corretagem com curadoria técnica. Lançamentos e usados selecionados
                            com análise de mercado e viabilidade jurídica total.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Filters - Standardized with Audit UI */}
            <section className="bg-slate-50 border-b border-slate-200 sticky top-16 lg:top-20 z-40 shadow-sm">
                <div className="container-custom py-6">
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

            {/* Properties Grid - Apple-like Spacing */}
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
                                <motion.div variants={slideUp} className="mb-8 flex items-center justify-between">
                                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">
                                        {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}
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
                            <motion.div variants={slideUp} className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" strokeWidth={1.5} />
                                <h3 className="text-xl font-display font-semibold text-navy-900 mb-2">
                                    Nenhum imóvel encontrado
                                </h3>
                                <p className="text-slate-500 max-w-xs mx-auto">
                                    Tente ajustar seus critérios de busca para encontrar o que procura.
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section >

            {/* CTA Section - Specialized */}
            < section className="section-padding bg-navy-900 text-white" >
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.h2 variants={slideUp} className="text-3xl md:text-5xl font-display font-bold mb-6">
                            Inteligência na busca do seu próximo ativo
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-slate-300 mb-10 font-light">
                            Nossa corretagem não é sobre "mostrar casas", é sobre curadoria técnica e segurança jurídica.
                            Fale com um especialista para uma busca personalizada.
                        </motion.p>
                        <motion.div variants={slideUp}>
                            <Button asChild size="lg" className="bg-white text-navy-900 hover:bg-slate-100 h-16 px-12">
                                <Link href="/contato">Falar com Especialista</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section >
        </div >
    )
}
