'use client';

import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';
import Image from 'next/image';

const locations = [
    {
        name: 'Orlando, FL',
        description: 'Capital mundial do turismo familiar. Alta ocupação o ano todo impulsionada por Short-Term Rentals e parques temáticos.',
        image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Yield médio: 6-8% a.a.'
    },
    {
        name: 'Miami, FL',
        description: 'Luxo supremo, valorização constante e demanda global. O centro financeiro e cultural da América Latina nos EUA.',
        image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Valorização: +12% a.a.'
    },
    {
        name: 'Dubai, UAE',
        description: 'Isenção de impostos (Tax-Free), alto luxo e segurança extrema. O mercado imobiliário mais dinâmico e futurista do mundo.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea936a7d40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Tax-Free Rental Income'
    }
];

export function LocationsSection() {
    return (
        <section id="locations" className="section-padding">
            <div className="container-custom">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-imi-900 mb-6">
                        Mercados Premium Selecionados
                    </h2>
                    <p className="text-lg text-imi-500 font-light">
                        Atuamos apenas onde existem fundamentos sólidos de economia, turismo e potencial de valorização comprovado.
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {locations.map((location, i) => (
                        <motion.article
                            key={location.name}
                            variants={slideUp}
                            className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-soft border border-imi-100 group hover:shadow-card-hover transition-all duration-500"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={location.image}
                                    alt={location.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-imi-900/60 to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6">
                                    <span className="bg-accent-500 text-imi-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                        Internacional
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-imi-900 mb-4 font-display">
                                    {location.name}
                                </h3>
                                <p className="text-imi-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {location.description}
                                </p>
                                <div className="pt-6 border-t border-imi-50">
                                    <span className="text-sm font-bold text-imi-900 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                                        {location.stats}
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
