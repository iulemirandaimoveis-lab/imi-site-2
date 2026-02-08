'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { slideUp, staggerContainer } from '@/lib/animations'

interface HeroProps {
    dict: {
        hero_title: string
        hero_subtitle: string
        cta_appraisal: string
        cta_whatsapp: string
    }
}

export default function Hero({ dict }: HeroProps) {
    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-imi-900">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-imi-900 via-imi-900/40 to-transparent lg:bg-gradient-to-r lg:from-imi-900 lg:via-imi-900/50 lg:to-transparent opacity-95 lg:opacity-90" />
            </div>

            <div className="container-custom relative z-10 pt-20 pb-20 lg:py-0">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-3xl"
                >
                    <motion.h1
                        variants={slideUp}
                        className="text-white font-display font-bold text-3xl sm:text-5xl lg:text-7xl leading-tight sm:leading-tight lg:leading-[1.1] mb-6 drop-shadow-lg whitespace-pre-line"
                    >
                        {dict.hero_title}
                    </motion.h1>

                    <motion.p
                        variants={slideUp}
                        className="text-base sm:text-xl text-imi-300 mb-10 max-w-lg font-light leading-relaxed drop-shadow-md whitespace-pre-line"
                    >
                        {dict.hero_subtitle}
                    </motion.p>

                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                        <Button asChild size="lg" className="w-full sm:w-auto bg-white text-imi-900 hover:bg-imi-50 border-none shadow-xl h-14 sm:h-14">
                            <Link href="/avaliacoes#form">{dict.cta_appraisal}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white h-14 sm:h-14">
                            <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                {dict.cta_whatsapp}
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
