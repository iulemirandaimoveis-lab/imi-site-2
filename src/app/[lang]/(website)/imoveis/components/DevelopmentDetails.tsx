'use client';

import { motion } from 'framer-motion';
import { Bed, Maximize, Bath, Car, Check } from 'lucide-react';
import { Development } from '../types/development';
import { slideUp, staggerContainer } from '@/lib/animations';

interface DevelopmentDetailsProps {
    development: Development;
}

export default function DevelopmentDetails({ development }: DevelopmentDetailsProps) {
    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
                >
                    {/* Coluna Esquerda - Texto */}
                    <div className="lg:col-span-7">
                        <motion.div variants={slideUp} className="mb-12">
                            <h2 className="font-display text-3xl md:text-4xl text-navy-900 mb-6 font-bold">Sobre o empreendimento</h2>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg font-light">
                                {development.description}
                            </div>
                        </motion.div>

                        <motion.div variants={slideUp}>
                            <h3 className="font-display text-2xl text-navy-900 mb-6 font-bold">Diferenciais e Lazer</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {development.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group">
                                        <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors">
                                            <Check className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-slate-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Coluna Direita - Specs Card */}
                    <div className="lg:col-span-5">
                        <motion.div
                            variants={slideUp}
                            className="sticky top-32 bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-soft"
                        >
                            <h3 className="font-display text-xl text-navy-900 mb-8 font-bold border-b border-slate-200 pb-4 uppercase tracking-wider text-sm">Resumo do Ativo</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                                    <div className="flex items-center gap-3">
                                        <Maximize className="w-5 h-5 text-gold-600" />
                                        <span className="text-slate-500 font-medium">Área Privativa</span>
                                    </div>
                                    <span className="text-navy-900 font-bold">{development.specs.areaRange}</span>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                                    <div className="flex items-center gap-3">
                                        <Bed className="w-5 h-5 text-gold-600" />
                                        <span className="text-slate-500 font-medium">Quartos/Suítes</span>
                                    </div>
                                    <span className="text-navy-900 font-bold">{development.specs.bedroomsRange}</span>
                                </div>

                                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50">
                                    <div className="flex items-center gap-3">
                                        <Bath className="w-5 h-5 text-gold-600" />
                                        <span className="text-slate-500 font-medium">Banheiros</span>
                                    </div>
                                    <span className="text-navy-900 font-bold">{development.specs.bathroomsRange || '-'}</span>
                                </div>

                                <div className="flex items-center justify-between pb-4">
                                    <div className="flex items-center gap-3">
                                        <Car className="w-5 h-5 text-gold-600" />
                                        <span className="text-slate-500 font-medium">Vagas</span>
                                    </div>
                                    <span className="text-navy-900 font-bold">{development.specs.parkingRange || '-'}</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-gold-500" />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Incorporação</span>
                                </div>
                                <p className="text-navy-900 font-bold">{development.developer}</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
