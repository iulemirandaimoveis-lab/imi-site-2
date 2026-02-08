'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/animations';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

// Esta é uma página client-side, a geração estática é feita pela rota pai

interface Developer {
    id: string;
    name: string;
    slug: string;
    logo_url?: string;
    website?: string;
    city?: string;
    state?: string;
    description?: string;
    development_count?: number;
}

// Dados estáticos para exibição inicial
const staticDevelopers: Developer[] = [
    {
        id: '1',
        name: 'Setai Grupo GP',
        slug: 'setai-grupo-gp',
        logo_url: '/images/logos/setai.png',
        website: 'https://setaigrupogp.com.br',
        city: 'João Pessoa',
        state: 'PB',
        description: 'Referência em empreendimentos de alto padrão no litoral paraibano.',
        development_count: 5
    },
    {
        id: '2',
        name: 'Alliance Incorporadora',
        slug: 'alliance',
        logo_url: '/images/logos/alliance.png',
        website: 'https://alliance.com.br',
        city: 'João Pessoa',
        state: 'PB',
        description: 'Inovação e qualidade em cada empreendimento.',
        development_count: 3
    },
    {
        id: '3',
        name: 'Rio Ave Brasil',
        slug: 'rio-ave',
        logo_url: '/images/logos/rioave.png',
        website: 'https://rioavebrasil.com.br',
        city: 'Recife',
        state: 'PE',
        description: 'Grupo português com forte atuação no Nordeste brasileiro.',
        development_count: 2
    },
    {
        id: '4',
        name: 'Moura Dubeux',
        slug: 'moura-dubeux',
        logo_url: '/images/logos/mouradubeux.svg',
        website: 'https://mouradubeux.com.br',
        city: 'Recife',
        state: 'PE',
        description: 'Uma das maiores incorporadoras do Nordeste.',
        development_count: 4
    },
    {
        id: '5',
        name: 'Cyrela',
        slug: 'cyrela',
        logo_url: '/images/logos/cyrela.svg',
        website: 'https://cyrela.com.br',
        city: 'São Paulo',
        state: 'SP',
        description: 'Líder nacional em alto padrão residencial.',
        development_count: 2
    },
    {
        id: '6',
        name: 'DAMAC Properties',
        slug: 'damac',
        logo_url: '/images/logos/damac.png',
        website: 'https://damacproperties.com',
        city: 'Dubai',
        state: 'UAE',
        description: 'Incorporadora líder em Dubai com projetos icônicos.',
        development_count: 2
    },
    {
        id: '7',
        name: 'Kempinski Hotels',
        slug: 'kempinski',
        logo_url: '/images/logos/kempinski.svg',
        website: 'https://kempinski.com',
        city: 'Miami',
        state: 'FL',
        description: 'Excelência europeia em hospitalidade e residências de luxo.',
        development_count: 2
    }
];

export default function ConstrutoresPage({ params: { lang } }: { params: { lang: string } }) {
    const [developers] = useState<Developer[]>(staticDevelopers);

    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <section className="bg-imi-900 text-white pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-500/5 -skew-x-12 translate-x-1/2" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={slideUp} className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-accent-500" />
                            <span className="text-accent-500 font-bold uppercase tracking-[0.3em] text-xs">Parceiros</span>
                        </motion.div>
                        <motion.h1 variants={slideUp} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                            Nossas <br /><span className="text-accent-500 italic">Construtoras</span>
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Trabalhamos com as incorporadoras mais renomadas do mercado, garantindo qualidade construtiva e solidez nos investimentos.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Grid de Construtoras */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-10 flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-imi-900" />
                        <span className="text-imi-400 font-bold uppercase tracking-widest text-xs">
                            {developers.length} construtoras parceiras
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {developers.map((dev, index) => (
                            <motion.article
                                key={dev.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-3xl overflow-hidden border border-imi-100 hover:border-accent-500/30 hover:shadow-card-hover transition-all duration-500"
                            >
                                {/* Logo Area - Fundo claro para logos em cores originais */}
                                <div className="relative aspect-[3/2] bg-gradient-to-br from-imi-50 via-white to-imi-50 flex items-center justify-center p-6 border-b border-imi-100">
                                    {dev.logo_url ? (
                                        <div className="relative w-full h-full max-w-[70%] max-h-[60%]">
                                            <Image
                                                src={dev.logo_url}
                                                alt={dev.name}
                                                fill
                                                className="object-contain grayscale brightness-0 opacity-80 group-hover:opacity-100 transition-all"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <Building2 className="w-16 h-16 text-imi-400" strokeWidth={1} />
                                            <span className="text-imi-600 font-bold text-sm uppercase tracking-wider">{dev.name}</span>
                                        </div>
                                    )}

                                    {/* Badge de quantidade */}
                                    {dev.development_count && dev.development_count > 0 && (
                                        <div className="absolute top-4 right-4 bg-imi-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            {dev.development_count} {dev.development_count === 1 ? 'empreendimento' : 'empreendimentos'}
                                        </div>
                                    )}
                                </div>

                                {/* Conteúdo */}
                                <div className="p-6">
                                    <h3 className="font-display font-bold text-xl text-imi-900 mb-2 group-hover:text-accent-600 transition-colors">
                                        {dev.name}
                                    </h3>

                                    {(dev.city || dev.state) && (
                                        <div className="flex items-center gap-2 text-imi-500 text-sm mb-4">
                                            <MapPin className="w-4 h-4 text-accent-500" />
                                            <span>{dev.city}, {dev.state}</span>
                                        </div>
                                    )}

                                    {dev.description && (
                                        <p className="text-imi-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                            {dev.description}
                                        </p>
                                    )}

                                    <div className="flex gap-3">
                                        <Button asChild size="sm" className="flex-1 rounded-xl bg-imi-900 hover:bg-imi-800">
                                            <Link href={`/${lang}/imoveis?construtora=${dev.slug}`}>
                                                Ver Imóveis
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </Button>
                                        {dev.website && (
                                            <Button asChild size="sm" variant="outline" className="rounded-xl border-imi-200">
                                                <a href={dev.website} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-imi-50 py-16 md:py-20">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-imi-900 mb-4">
                            Representa uma <span className="text-accent-500 italic">construtora?</span>
                        </h2>
                        <p className="text-imi-500 text-lg mb-8 max-w-xl mx-auto">
                            Estamos sempre em busca de novos parceiros para ampliar nosso portfólio.
                        </p>
                        <Button asChild size="lg" className="bg-imi-900 hover:bg-imi-800 h-14 px-10">
                            <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                Entrar em Contato
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
