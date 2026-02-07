'use client';

import Image from 'next/image';
import { Building2, MapPin, Calendar, FileText } from 'lucide-react';
import { Development } from '../types/development';
import { formatBRL } from '../data/developments';
import Badge from '@/components/ui/Badge';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';

interface DevelopmentHeroProps {
    development: Development;
}

export default function DevelopmentHero({ development }: DevelopmentHeroProps) {
    return (
        <section className="relative min-h-[60vh] flex items-end overflow-hidden group">
            {/* Hero Image Container */}
            <div className="absolute inset-0 bg-slate-900">
                {development.images.main ? (
                    <Image
                        src={development.images.main}
                        alt={development.name}
                        fill
                        priority
                        className="object-cover opacity-80"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 flex items-center justify-center">
                        <Building2 className="w-24 h-24 text-white/10" />
                    </div>
                )}

                {/* Overlay gradient - Premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent" />
            </div>

            {/* Conteúdo sobre a imagem */}
            <div className="relative w-full pb-12 md:pb-20 pt-32">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={slideUp} className="mb-6">
                            <Badge className={
                                development.status === 'launch' ? 'bg-gold-500 text-navy-900' : 'bg-white/10 text-white backdrop-blur-md'
                            }>
                                {development.status === 'launch' && 'Lançamento'}
                                {development.status === 'ready' && 'Pronta Entrega'}
                                {development.status === 'under_construction' && 'Em Construção'}
                            </Badge>
                        </motion.div>

                        <motion.h1 variants={slideUp} className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 leading-[1.1]">
                            {development.name}
                        </motion.h1>

                        <motion.div variants={slideUp} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-white/80 text-sm md:text-base border-l border-white/20 pl-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gold-500" />
                                <span>
                                    {development.location.neighborhood}, {development.location.city}/{development.location.state}
                                </span>
                            </div>

                            {development.deliveryDate && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gold-500" />
                                    <span>Previsão: {development.deliveryDate}</span>
                                </div>
                            )}

                            {development.registrationNumber && (
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-gold-500" />
                                    <span>R.I: {development.registrationNumber}</span>
                                </div>
                            )}
                        </motion.div>

                        <motion.div variants={slideUp} className="mt-8 pt-8">
                            <p className="text-[10px] text-white/50 mb-1 uppercase tracking-[0.2em] font-bold">Investimento a partir de</p>
                            <p className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                {formatBRL(development.priceRange.min)}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
