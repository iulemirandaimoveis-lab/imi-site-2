'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export function HeroSection() {
    return (
        <div className="relative isolate overflow-hidden bg-neutral-900 py-24 sm:py-32">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Luxury Real Estate"
                    className="h-full w-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl"
                    >
                        Renda em Dólar com <span className="text-primary-400">Imóveis Internacionais</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-neutral-300"
                    >
                        Proteja seu patrimônio e gere dividendos mensais nas moedas mais fortes do mundo. Estruturação jurídica, financeira e tributária completa.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex items-center justify-center gap-x-6"
                    >
                        <Button size="lg" asChild>
                            <Link href="#simulator">
                                Simular Investimento
                            </Link>
                        </Button>
                        <Link href="#locations" className="text-sm font-semibold leading-6 text-white hover:text-primary-400 transition-colors">
                            Ver Localizações <span aria-hidden="true">→</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
