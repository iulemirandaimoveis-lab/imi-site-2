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
        <section className="relative min-h-[100dvh] flex items-end overflow-hidden bg-imi-900">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-top bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg.jpg')" }}
            >
                {/* Mobile: gradient from bottom to keep face visible at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-imi-900 via-imi-900/70 to-imi-900/10 md:bg-gradient-to-r md:from-imi-900 md:via-imi-900/80 md:to-transparent" />
            </div>

            <div className="container-custom relative z-10 pb-16 sm:pb-20 md:pb-24 lg:pb-28 pt-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-2xl"
                >
                    <motion.h1
                        variants={slideUp}
                        className="text-white font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-6 drop-shadow-lg whitespace-pre-line"
                    >
                        {dict.hero_title}
                    </motion.h1>

                    <motion.p
                        variants={slideUp}
                        className="text-base sm:text-lg text-imi-300 mb-10 max-w-md font-light leading-relaxed drop-shadow-md whitespace-pre-line"
                    >
                        {dict.hero_subtitle}
                    </motion.p>

                    <motion.div
                        variants={slideUp}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                        <Button asChild size="lg" className="w-full sm:w-auto bg-white text-imi-900 hover:bg-imi-50 border-none shadow-xl h-14">
                            <Link href="/avaliacoes#form">{dict.cta_appraisal}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:border-white h-14">
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
