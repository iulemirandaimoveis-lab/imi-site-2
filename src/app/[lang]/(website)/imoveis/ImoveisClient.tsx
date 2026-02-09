'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/lib/animations';
import { Development } from './types/development';
import DevelopmentCard from './components/DevelopmentCard';
import AdvancedFilter, { FilterState } from './components/AdvancedFilter';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MessageCircle, Search } from 'lucide-react';

interface ImoveisClientProps {
    initialDevelopments: Development[];
    lang: string;
}

export default function ImoveisClient({ initialDevelopments, lang }: ImoveisClientProps) {
    if (!initialDevelopments || initialDevelopments.length === 0) {
        return (
            <main className="bg-white min-h-screen pt-32 pb-20">
                <div className="container-custom text-center max-w-3xl mx-auto py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-imi-50 rounded-[2rem] p-12 border border-imi-100 shadow-soft"
                    >
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <span className="text-4xl">🏗️</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-imi-900 mb-6 tracking-tight">
                            Portfólio em <span className="text-accent-500 italic">Curadoria</span>
                        </h1>
                        <p className="text-imi-600 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
                            Estamos selecionando tecnicamente os melhores ativos do mercado para compor este catálogo exclusivo.
                            <br /><br />
                            Aguarde novidades em breve ou fale conosco para oportunidades off-market.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="bg-imi-900 text-white hover:bg-imi-800 px-10 h-14 font-bold uppercase tracking-widest text-xs"
                        >
                            <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-5 h-5 mr-3" />
                                Consultar Off-Market
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </main>
        );
    }

    const [filters, setFilters] = useState<FilterState>({
        status: [],
        type: [],
        bedrooms: null,
        priceRange: [0, 10000000],
        location: null,
        sort: 'relevant'
    });

    // Extract unique locations for the filter dropdown based on REAL data
    const availableLocations = useMemo(() => {
        const locs = new Set<string>();
        initialDevelopments.forEach(dev => {
            if (dev.region === 'internacional') {
                // Para internacionais, mostrar o país
                locs.add(dev.location.country || dev.location.city);
            } else {
                // Para nacionais, mostrar a cidade
                locs.add(dev.location.city);
            }
        });
        return Array.from(locs).sort();
    }, [initialDevelopments]);

    const filteredDevelopments = useMemo(() => {
        return initialDevelopments.filter((dev) => {
            // Location
            if (filters.location) {
                const matchCity = dev.location.city === filters.location;
                const matchCountry = dev.location.country === filters.location;
                const matchRegion = dev.region === filters.location.toLowerCase().replace(' ', '-'); // Fallback for region matching
                if (!matchCity && !matchCountry && !matchRegion) return false;
            }

            // Price - Check if development starts within budget
            if (dev.priceRange.min > filters.priceRange[1]) return false;

            // Bedrooms - Check if development has units with at least requested bedrooms
            if (filters.bedrooms) {
                // Parse "2-4" or "3"
                const parts = dev.specs.bedroomsRange.split('-').map(p => parseInt(p));
                const maxBeds = parts.length > 1 ? parts[1] : parts[0];
                if (maxBeds < filters.bedrooms) return false;
            }

            // Type
            if (filters.type.length > 0) {
                const typeMatches = filters.type.some(t => {
                    const type = t.toLowerCase();
                    if (type === 'casa') return dev.tags.includes('casas');
                    if (type === 'flat') return dev.tags.includes('flat') || dev.tags.includes('compacto') || dev.tags.includes('studio');
                    if (type === 'garden') return dev.units.some(u => u.type?.toLowerCase().includes('garden'));
                    if (type === 'cobertura') return dev.units.some(u => u.type?.toLowerCase().includes('cobertura'));
                    if (type === 'apto') return !dev.tags.includes('casas') && !dev.tags.includes('flat');
                    return false;
                });
                if (!typeMatches) return false;
            }

            return true;
        }).sort((a, b) => {
            // Sort Logic
            if (filters.sort === 'price-asc') return a.priceRange.min - b.priceRange.min;
            if (filters.sort === 'price-desc') return b.priceRange.min - a.priceRange.min;
            if (filters.sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return a.order - b.order; // Default 'relevant'
        });
    }, [filters, initialDevelopments]);

    // Separar Pronta Entrega para seção especial (apenas se filtros estiverem limpos ou compatíveis)
    const showReadySection = !filters.location && !filters.bedrooms && filters.type.length === 0;
    const readyDevelopments = showReadySection
        ? initialDevelopments.filter(dev => dev.status === 'ready' && dev.region === 'paraiba')
        : [];

    // Dedup: Don't show in main grid if shown in special section
    const mainGridDevelopments = showReadySection
        ? filteredDevelopments.filter(dev => !readyDevelopments.find(r => r.id === dev.id))
        : filteredDevelopments;

    return (
        <main className="bg-white min-h-screen">
            {/* Hero Minimalista */}
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

            {/* Advanced Filters */}
            <AdvancedFilter
                filters={filters}
                onFilterChange={setFilters}
                locations={availableLocations}
            />

            {/* Seção Especial Pronta Entrega */}
            {readyDevelopments.length > 0 && (
                <section className="py-16 bg-imi-50 overflow-hidden border-b border-imi-100">
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-10 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-imi-900" />
                            <span className="text-imi-400 font-bold uppercase tracking-widest text-xs">
                                {mainGridDevelopments.length} {mainGridDevelopments.length === 1 ? 'resultado' : 'resultados'} encontrados
                            </span>
                        </div>
                    </motion.div>

                    {mainGridDevelopments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {mainGridDevelopments.map((dev, index) => (
                                <DevelopmentCard key={dev.id} development={dev} index={index} lang={lang} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-24 bg-imi-50 rounded-[2rem] border border-dashed border-imi-200"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft">
                                <Search className="w-8 h-8 text-imi-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-imi-900 mb-2">Nenhum ativo encontrado</h3>
                            <p className="text-imi-500 max-w-xs mx-auto mb-8">
                                Não encontramos imóveis com esses filtros exatos. Tente remover alguns filtros para ver mais opções.
                            </p>
                            <Button
                                onClick={() => setFilters({
                                    status: [],
                                    type: [],
                                    bedrooms: null,
                                    priceRange: [0, 10000000],
                                    location: null,
                                    sort: 'relevant'
                                })}
                                variant="outline"
                            >
                                Limpar filtros
                            </Button>
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
