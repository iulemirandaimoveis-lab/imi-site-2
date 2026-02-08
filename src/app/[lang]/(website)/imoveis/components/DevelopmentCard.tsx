'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, MapPin, Bed, Maximize, Car, Map } from 'lucide-react';
import { Development } from '../types/development';
import { formatBRL } from '../data/developments';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface DevelopmentCardProps {
    development: Development;
    index: number;
    lang: string;
}

export default function DevelopmentCard({ development, index, lang }: DevelopmentCardProps) {
    const statusColors = {
        launch: 'bg-imi-900 text-white',
        ready: 'bg-accent-500 text-white',
        under_construction: 'bg-imi-600 text-white'
    };

    const statusLabels = {
        launch: 'Lançamento',
        ready: 'Pronta Entrega',
        under_construction: 'Em Construção'
    };

    const regionLabels = {
        paraiba: 'Paraíba',
        pernambuco: 'Pernambuco',
        'sao-paulo': 'São Paulo'
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden border border-imi-100 hover:border-accent-500/30 hover:shadow-card-hover transition-all duration-500 flex flex-col h-full"
        >
            {/* Imagem */}
            <Link href={`/${lang}/imoveis/${development.slug}`} className="block aspect-[16/11] relative bg-imi-100 overflow-hidden">
                {development.images.main ? (
                    <Image
                        src={development.images.main}
                        alt={development.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-imi-50 to-imi-100 flex flex-col items-center justify-center p-8">
                        {development.developerLogo ? (
                            <div className="relative w-32 h-16 mb-4 filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                <Image src={development.developerLogo} alt={development.developer} fill className="object-contain" />
                            </div>
                        ) : (
                            <Building2 className="w-16 h-16 text-imi-200 mb-3" strokeWidth={1} />
                        )}
                        <span className="text-[10px] text-imi-400 font-bold px-4 text-center uppercase tracking-[0.2em] leading-relaxed">
                            {development.name}
                        </span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-imi-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges Frontais */}
                <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <Badge className={statusColors[development.status]}>
                        {statusLabels[development.status]}
                    </Badge>
                    <Badge className="bg-white/90 backdrop-blur-md text-imi-900 border-none shadow-sm capitalize">
                        <MapPin size={10} className="mr-1" />
                        {regionLabels[development.region]}
                    </Badge>
                </div>
            </Link>

            {/* Conteúdo */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <Link href={`/${lang}/imoveis/${development.slug}`}>
                        <h3 className="font-display font-bold text-xl text-imi-900 leading-tight group-hover:text-accent-600 transition-colors">
                            {development.name}
                        </h3>
                    </Link>
                    {development.developerLogo && (
                        <div className="relative w-12 h-6 flex-shrink-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                            <Image src={development.developerLogo} alt={development.developer} fill className="object-contain" />
                        </div>
                    )}
                </div>

                <div className="flex items-start gap-2 text-imi-500 text-sm mb-6 font-light">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent-500" />
                    <span>{development.location.neighborhood}, {development.location.city}/{development.location.state}</span>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-imi-50 mb-8">
                    {development.specs.bedroomsRange && (
                        <div className="flex flex-col gap-1">
                            <Bed className="w-4 h-4 text-imi-400" />
                            <span className="text-[10px] font-bold text-imi-900 uppercase tracking-tighter">{development.specs.bedroomsRange} dorms</span>
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        <Maximize className="w-4 h-4 text-imi-400" />
                        <span className="text-[10px] font-bold text-imi-900 uppercase tracking-tighter">{development.specs.areaRange}</span>
                    </div>
                    {development.specs.parkingRange && (
                        <div className="flex flex-col gap-1">
                            <Car className="w-4 h-4 text-imi-400" />
                            <span className="text-[10px] font-bold text-imi-900 uppercase tracking-tighter">{development.specs.parkingRange} vagas</span>
                        </div>
                    )}
                </div>

                {/* Preço e CTA */}
                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <p className="text-[10px] text-imi-400 mb-1 uppercase tracking-widest font-bold">Investimento de</p>
                        <p className="text-2xl font-bold text-imi-900 font-display">
                            <span className="text-xs mr-1 font-sans text-imi-400">R$</span>
                            {development.priceRange.min.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <Button asChild size="sm" className="rounded-2xl h-11 px-6 bg-imi-900 hover:bg-imi-800">
                        <Link href={`/${lang}/imoveis/${development.slug}`}>
                            Explorar
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.article>
    );
}
