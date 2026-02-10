'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import { MapPin, Building2, Calendar, Phone, Mail, Globe, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface Development {
    id: string
    name: string
    slug: string
    description: string | null
    neighborhood: string
    city: string
    state: string
    price_from: number
    units: number
    status: string
    delivery: string | null
    image: string | null
    gallery_images: string[] | null
    floor_plans: string[] | null
    videos: string[] | null
    virtual_tour_url: string | null
    developer_id: string | null
    developers?: {
        name: string
        logo_url: string | null
        website: string | null
        phone: string | null
        email: string | null
    }
}

export default function DevelopmentDetailPage({ params }: { params: { slug: string } }) {
    const supabase = createClient()
    const [development, setDevelopment] = useState<Development | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState<string>('')

    useEffect(() => {
        fetchDevelopment()
    }, [params.slug])

    async function fetchDevelopment() {
        const { data, error } = await supabase
            .from('developments')
            .select(`
        *,
        developers (
          name,
          logo_url,
          website,
          phone,
          email
        )
      `)
            .eq('slug', params.slug)
            .single()

        if (error || !data) {
            notFound()
        }

        setDevelopment(data)
        setSelectedImage(data.image || '')
        setIsLoading(false)
    }

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando...</div>
    }

    if (!development) {
        notFound()
    }

    const allImages = [
        development.image,
        ...(development.gallery_images || [])
    ].filter(Boolean) as string[]

    return (
        <>
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                                {selectedImage ? (
                                    <Image
                                        src={selectedImage}
                                        alt={development.name}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                        <Building2 className="w-16 h-16 text-slate-400" />
                                    </div>
                                )}
                            </div>

                            {allImages.length > 1 && (
                                <div className="grid grid-cols-4 gap-3">
                                    {allImages.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImage(img)}
                                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-imi-900' : 'border-transparent'
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Imagem ${i + 1}`}
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                {development.status && (
                                    <span className="px-3 py-1 bg-imi-900 text-white text-xs font-semibold rounded-full">
                                        {development.status}
                                    </span>
                                )}
                                {development.delivery && (
                                    <span className="px-3 py-1 bg-accent-500 text-imi-900 text-xs font-bold rounded-full">
                                        <Calendar className="w-3 h-3 inline mr-1" />
                                        {development.delivery}
                                    </span>
                                )}
                            </div>

                            <h1 className="font-display text-3xl md:text-4xl font-bold text-imi-900 mb-4">
                                {development.name}
                            </h1>

                            <p className="text-slate-600 flex items-center gap-2 mb-6">
                                <MapPin className="w-5 h-5" />
                                {development.neighborhood}, {development.city} - {development.state}
                            </p>

                            <div className="mb-6">
                                <div className="text-sm text-slate-500 mb-1">A partir de</div>
                                <div className="font-display text-4xl font-bold text-imi-900">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                        minimumFractionDigits: 0
                                    }).format(development.price_from)}
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                                <div>
                                    <div className="text-sm text-slate-500">Unidades</div>
                                    <div className="text-2xl font-bold text-imi-900">{development.units}</div>
                                </div>
                            </div>

                            {development.description && (
                                <div className="mb-8">
                                    <h2 className="font-display text-2xl font-bold text-imi-900 mb-4">Sobre o Empreendimento</h2>
                                    <p className="text-slate-600 leading-relaxed">{development.description}</p>
                                </div>
                            )}

                            <Button asChild size="lg" className="w-full">
                                <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Falar com Especialista
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {development.floor_plans && development.floor_plans.length > 0 && (
                <section className="section-padding">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-bold text-imi-900 mb-8">Plantas</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {development.floor_plans.map((plan, i) => (
                                <div key={i} className="rounded-xl overflow-hidden border border-slate-200">
                                    <Image
                                        src={plan}
                                        alt={`Planta ${i + 1}`}
                                        width={600}
                                        height={800}
                                        className="w-full h-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {development.developers && (
                <section className="section-padding bg-slate-50">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl font-bold text-imi-900 mb-8">Construtora</h2>
                        <div className="bg-white rounded-xl p-8 border border-slate-200">
                            <div className="flex items-start gap-6">
                                {development.developers.logo_url && (
                                    <Image
                                        src={development.developers.logo_url}
                                        alt={development.developers.name}
                                        width={120}
                                        height={120}
                                        className="object-contain"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-display text-2xl font-bold text-imi-900 mb-4">
                                        {development.developers.name}
                                    </h3>
                                    <div className="space-y-2 text-slate-600">
                                        {development.developers.phone && (
                                            <p className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                {development.developers.phone}
                                            </p>
                                        )}
                                        {development.developers.email && (
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                {development.developers.email}
                                            </p>
                                        )}
                                        {development.developers.website && (
                                            <p className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                <a
                                                    href={development.developers.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-imi-900 hover:underline"
                                                >
                                                    {development.developers.website}
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section className="bg-imi-900 text-white section-padding">
                <div className="container-custom text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                        Interessado neste Empreendimento?
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Fale com nossos especialistas e agende uma visita
                    </p>
                    <Button asChild size="lg" className="bg-white text-imi-900 hover:bg-slate-100">
                        <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Entrar em Contato
                        </a>
                    </Button>
                </div>
            </section>
        </>
    )
}
