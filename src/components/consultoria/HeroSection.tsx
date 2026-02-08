'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ChevronDown, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export function HeroSection() {
    return (
        <section className="relative min-h-[90dvh] flex items-center bg-imi-900 text-white section-padding overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-500/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

            <div className="container-custom relative z-10 w-full">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-accent-500 text-sm font-semibold mb-8 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                        <span className="uppercase tracking-widest text-xs">Consultoria Estratégica Internacional</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight font-display"
                    >
                        Renda em Dólar com<br />
                        <span className="text-accent-500">Imóveis Internacionais</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-imi-300 mb-12 max-w-2xl leading-relaxed font-light"
                    >
                        Estrutura jurídica sólida, gestão profissional e crédito inteligente para investidores que buscam proteção patrimonial e rentabilidade em USD.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Button asChild size="lg" variant="primary">
                            <a href="#simulator">
                                Simular Estratégia
                                <ArrowRight className="w-5 h-5 ml-3" />
                            </a>
                        </Button>

                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                            <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                Falar com Especialista
                            </a>
                        </Button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-16 flex flex-wrap gap-8 text-imi-400 text-sm"
                    >
                        {[
                            '+$50M Alocados',
                            '200+ Investidores',
                            '15 Anos de Mercado'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-accent-500" strokeWidth={1.5} />
                                <span className="font-medium text-imi-300">{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <ChevronDown className="w-8 h-8 text-white/20" />
            </motion.div>
        </section>
    );
}
