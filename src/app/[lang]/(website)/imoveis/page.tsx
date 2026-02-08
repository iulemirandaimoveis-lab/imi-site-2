'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/animations';
import { developments } from './data/developments';
import DevelopmentCard from './components/DevelopmentCard';
import DevelopmentFilters from './components/DevelopmentFilters';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MessageCircle, Search } from 'lucide-react';

export default function ImoveisPage({ params: { lang } }: { params: { lang: string } }) {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredDevelopments = developments.filter((dev) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'launch') return dev.status === 'launch';
        if (activeFilter === 'ready') return dev.status === 'ready';
        if (activeFilter === 'frente-mar') return dev.tags.includes('frente-mar');
        if (activeFilter === 'casas') return dev.tags.includes('casas');
        if (activeFilter === 'luxo') return dev.tags.includes('luxo');
        if (activeFilter === 'paraiba') return dev.region === 'paraiba';
        if (activeFilter === 'pernambuco') return dev.region === 'pernambuco';
        if (activeFilter === 'sao-paulo') return dev.region === 'sao-paulo';
        return true;
    }).sort((a, b) => a.order - b.order);

    // Separar Pronta Entrega para seção especial (quando filtro é 'all')
    const readyDevelopments = developments.filter(dev => dev.status === 'ready' && dev.region === 'paraiba');
    const otherDevelopments = filteredDevelopments.filter(dev => (dev.status !== 'ready' || activeFilter !== 'all') || dev.region !== 'paraiba');

    return (
        <main className="bg-white">
            {/* Hero Minimalista */}
            <section className="bg-imi-900 text-white pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-500/5 -skew-x-12 translate-x-1/2" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.div variants={slideUp} className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-accent-500" />
                            <span className="text-accent-500 font-bold uppercase tracking-[0.3em] text-xs">Portfólio 2026</span>
                        </motion.div>
                        <motion.h1 variants={slideUp} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                            Curadoria de <br /><span className="text-accent-500 italic">Empreendimentos</span>
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Seleção técnica dos melhores ativos imobiliários. Do luxo absoluto à alta rentabilidade em compactos, nos principais hubs de valorização.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Filtros Sticky Chips */}
            <DevelopmentFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Seção Especial Pronta Entrega (Apenas no 'all') */}
            {activeFilter === 'all' && readyDevelopments.length > 0 && (
                <section className="py-16 bg-imi-50 overflow-hidden">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-10"
                        >
                            <Badge className="bg-accent-500 text-white px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                                Pronta Entrega
                            </Badge>
                            <h2 className="font-display text-2xl md:text-3xl text-imi-900 font-bold">Oportunidades Imediatas</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {readyDevelopments.map((dev, idx) => (
                                <DevelopmentCard key={dev.id} development={dev} index={idx} lang={lang} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Grid Principal */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    {activeFilter !== 'all' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-10 flex items-center gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-imi-900" />
                            <span className="text-imi-400 font-bold uppercase tracking-widest text-xs">
                                Exibindo {filteredDevelopments.length} resultados para "{activeFilter}"
                            </span>
                        </motion.div>
                    )}

                    {otherDevelopments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {otherDevelopments.map((dev, index) => (
                                <DevelopmentCard key={dev.id} development={dev} index={index} lang={lang} />
                            ))}
                        </div>
                    ) : activeFilter !== 'all' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20 bg-imi-50 rounded-3xl border border-dashed border-imi-200"
                        >
                            <Search className="w-16 h-16 mx-auto mb-6 text-imi-200" strokeWidth={1} />
                            <h3 className="font-display text-2xl font-bold text-imi-900 mb-2">Nenhum ativo encontrado</h3>
                            <p className="text-imi-500 max-w-xs mx-auto">Tente ajustar seus critérios ou fale com um consultor para uma busca personalizada.</p>
                            <Button onClick={() => setActiveFilter('all')} variant="outline" className="mt-8">Ver todos os ativos</Button>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-imi-900 text-white py-20 md:py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-imi-900 via-imi-900 to-accent-950 opacity-90" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h3 variants={slideUp} className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Não encontrou o <span className="text-accent-500 italic">imóvel ideal?</span>
                        </motion.h3>
                        <motion.p variants={slideUp} className="text-imi-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Nossa curadoria vai além do catálogo. Fale com nossos especialistas para uma prospecção off-market personalizada.
                        </motion.p>
                        <motion.div variants={slideUp}>
                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-imi-900 hover:bg-imi-50 h-16 px-12 font-bold uppercase tracking-[0.2em] text-sm shadow-2xl"
                            >
                                <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-5 h-5 mr-3 text-imi-700" />
                                    Iniciar Consultoria
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
