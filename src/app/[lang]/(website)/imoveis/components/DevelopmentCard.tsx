'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building2, MapPin, Bed, Maximize, Car } from 'lucide-react';
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
        launch: 'bg-navy-900 text-white',
        ready: 'bg-gold-500 text-navy-900',
        under_construction: 'bg-slate-700 text-white'
    };

    const statusLabels = {
        launch: 'Lançamento',
        ready: 'Pronta Entrega',
        under_construction: 'Em Construção'
    };

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-all flex flex-col h-full"
        >
            {/* Imagem */}
            <Link href={`/${lang}/imoveis/${development.slug}`} className="block aspect-[16/10] relative bg-slate-100 group">
                {development.images.main ? (
                    <Image
                        src={development.images.main}
                        alt={development.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
                        <Building2 className="w-16 h-16 text-slate-300 mb-3" />
                        <span className="text-xs text-slate-400 font-medium px-4 text-center uppercase tracking-widest">
                            {development.name}
                        </span>
                    </div>
                )}

                {/* Badge Status */}
                <div className="absolute top-4 left-4">
                    <Badge className={statusColors[development.status]}>
                        {statusLabels[development.status]}
                    </Badge>
                </div>
            </Link>

            {/* Conteúdo */}
            <div className="p-6 flex flex-col flex-grow">
                <Link href={`/${lang}/imoveis/${development.slug}`}>
                    <h3 className="font-display font-bold text-lg text-navy-900 mb-2 hover:text-navy-700 transition-colors">
                        {development.name}
                    </h3>
                </Link>

                <div className="flex items-start gap-2 text-slate-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{development.location.neighborhood}, {development.location.city}/{development.location.state}</span>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                    {development.specs.bedroomsRange && (
                        <div className="flex items-center gap-1.5">
                            <Bed className="w-4 h-4" />
                            <span>{development.specs.bedroomsRange} qtos</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Maximize className="w-4 h-4" />
                        <span>{development.specs.areaRange}</span>
                    </div>
                    {development.specs.parkingRange && (
                        <div className="flex items-center gap-1.5">
                            <Car className="w-4 h-4" />
                            <span>{development.specs.parkingRange} vgs</span>
                        </div>
                    )}
                </div>

                {/* Preço */}
                <div className="mb-6 mt-auto">
                    <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-semibold">A partir de</p>
                    <p className="text-xl font-bold text-navy-900">
                        {formatBRL(development.priceRange.min)}
                    </p>
                </div>

                {/* CTA */}
                <Button asChild className="w-full h-12" variant="primary">
                    <Link href={`/${lang}/imoveis/${development.slug}`}>
                        Ver detalhes
                    </Link>
                </Button>
            </div>
        </motion.article>
    );
}
