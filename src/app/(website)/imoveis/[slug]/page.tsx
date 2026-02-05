'use client'

import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { mockProperties } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { Property } from '@/types/property'

export default function PropertyDetailPage() {
    const params = useParams()
    const slug = params?.slug as string

    const [property, setProperty] = useState<Property | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)

    useEffect(() => {
        // Buscar imóvel pelo slug
        const found = mockProperties.find(p => p.slug === slug)
        setProperty(found || null)
        setLoading(false)
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700"></div>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">Imóvel não encontrado</h1>
                <p className="text-neutral-600 mb-8">O imóvel que você está procurando não existe ou foi removido.</p>
                <Button asChild>
                    <Link href="/imoveis">Ver todos os imóveis</Link>
                </Button>
            </div>
        )
    }

    const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <div className="bg-neutral-50 border-b border-neutral-200">
                <div className="container-custom py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-neutral-500 hover:text-primary-700">Home</Link>
                        <span className="text-neutral-400">/</span>
                        <Link href="/imoveis" className="text-neutral-500 hover:text-primary-700">Imóveis</Link>
                        <span className="text-neutral-400">/</span>
                        <span className="text-neutral-900">{property.title}</span>
                    </nav>
                </div>
            </div>

            {/* Hero Image */}
            <section className="bg-neutral-100">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Imagem Principal */}
                        <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
                            {primaryImage ? (
                                <Image
                                    src={primaryImage.url}
                                    alt={primaryImage.alt}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                                    <svg className="w-24 h-24 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {property.status === 'lancamento' && (
                                    <Badge variant="info">Lançamento</Badge>
                                )}
                                {property.technicalAnalysisAvailable && (
                                    <Badge variant="success">Análise técnica disponível</Badge>
                                )}
                                {property.isStrategicAsset && (
                                    <Badge variant="warning">Ativo estratégico</Badge>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {property.images.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    className="relative h-[120px] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                    >
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div variants={slideUp}>
                                <h1 className="text-display-sm font-bold text-neutral-900 mb-4">
                                    {property.title}
                                </h1>
                                <p className="text-lg text-neutral-600">
                                    {property.neighborhood}, {property.city}
                                </p>
                            </motion.div>

                            {/* Specs */}
                            <motion.div variants={slideUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {property.bedrooms && (
                                    <div className="bg-neutral-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-primary-700">{property.bedrooms}</p>
                                        <p className="text-sm text-neutral-600">Quartos</p>
                                    </div>
                                )}
                                {property.bathrooms && (
                                    <div className="bg-neutral-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-primary-700">{property.bathrooms}</p>
                                        <p className="text-sm text-neutral-600">Banheiros</p>
                                    </div>
                                )}
                                {property.parkingSpots && (
                                    <div className="bg-neutral-50 rounded-lg p-4 text-center">
                                        <p className="text-2xl font-bold text-primary-700">{property.parkingSpots}</p>
                                        <p className="text-sm text-neutral-600">Vagas</p>
                                    </div>
                                )}
                                <div className="bg-neutral-50 rounded-lg p-4 text-center">
                                    <p className="text-2xl font-bold text-primary-700">{property.area}</p>
                                    <p className="text-sm text-neutral-600">m²</p>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={slideUp}>
                                <h2 className="text-xl font-bold text-neutral-900 mb-4">Descrição</h2>
                                <p className="text-neutral-700 leading-relaxed">
                                    {property.description}
                                </p>
                            </motion.div>

                            {/* Features */}
                            {property.features && property.features.length > 0 && (
                                <motion.div variants={slideUp}>
                                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Características</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {property.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                                <span className="text-neutral-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Market Context */}
                            {property.marketContext && (
                                <motion.div variants={slideUp} className="bg-primary-50 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Contexto de Mercado</h2>
                                    <p className="text-neutral-700 leading-relaxed">
                                        {property.marketContext}
                                    </p>
                                </motion.div>
                            )}

                            {/* Ideal Buyer */}
                            {property.idealBuyerProfile && (
                                <motion.div variants={slideUp} className="bg-neutral-50 rounded-xl p-6">
                                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Perfil Ideal do Comprador</h2>
                                    <p className="text-neutral-700 leading-relaxed">
                                        {property.idealBuyerProfile}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 bg-white border border-neutral-200 rounded-xl p-6 shadow-soft">
                                {/* Price */}
                                <div className="mb-6">
                                    {property.priceOnRequest ? (
                                        <p className="text-3xl font-bold text-primary-900">Sob consulta</p>
                                    ) : (
                                        <>
                                            <p className="text-sm text-neutral-500 mb-1">Valor</p>
                                            <p className="text-3xl font-bold text-primary-900">
                                                {formatCurrency(property.price!)}
                                            </p>
                                        </>
                                    )}
                                </div>

                                {/* Builder */}
                                {property.builderName && (
                                    <div className="mb-6 pb-6 border-b border-neutral-200">
                                        <p className="text-sm text-neutral-500 mb-1">Construtora</p>
                                        <p className="font-semibold text-neutral-900">{property.builderName}</p>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="space-y-3">
                                    <a
                                        href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no imóvel: ${property.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Falar no WhatsApp
                                    </a>

                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/contato">Agendar Visita</Link>
                                    </Button>

                                    {property.technicalAnalysisAvailable && (
                                        <Button asChild variant="secondary" className="w-full">
                                            <Link href="/consultoria">Solicitar Análise Técnica</Link>
                                        </Button>
                                    )}
                                </div>

                                {/* Trust badges */}
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                        <svg className="w-5 h-5 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                        <span>Análise técnica verificada</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Back Button */}
            <section className="pb-16">
                <div className="container-custom">
                    <Button asChild variant="outline">
                        <Link href="/imoveis">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Voltar para lista de imóveis
                        </Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}
