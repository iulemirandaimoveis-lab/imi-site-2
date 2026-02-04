'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations'

export default function HomePage() {
    return (
        <div className="bg-neutral-50">
            {/* Hero Section - Mobile First Authority */}
            <section className="relative h-[95dvh] lg:h-[90vh] flex items-end lg:items-center overflow-hidden">
                {/* Background Image (User Photo) */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/hero-bg.jpg')" }}
                >
                    {/* Modern Overlay - Gradient from bottom (Mobile) and left (Desktop) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent lg:bg-gradient-to-r lg:from-neutral-900 lg:via-neutral-900/50 lg:to-transparent opacity-95 lg:opacity-90" />
                </div>

                <div className="relative container-custom w-full pb-16 lg:pb-0 pt-32 lg:pt-0">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-2xl text-left"
                    >
                        <motion.h1
                            variants={slideUp}
                            className="text-white font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 drop-shadow-lg"
                        >
                            Inteligência Imobiliária Premium,<br />
                            método e segurança<br />
                            <span className="text-primary-200">em decisões imobiliárias</span>
                        </motion.h1>

                        <motion.p
                            variants={slideUp}
                            className="text-lg sm:text-xl text-neutral-200 mb-8 max-w-lg font-light leading-relaxed drop-shadow-md"
                        >
                            Consultoria estratégica e avaliações técnicas.
                            Transformamos incerteza em capital seguro.
                        </motion.p>

                        <motion.div
                            variants={slideUp}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button asChild size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 border-none shadow-xl text-base h-14 px-8">
                                <Link href="/avaliacoes#form">Solicitar Avaliação</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Value Pillars - Stacked Cards */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {/* Card 1 */}
                        <div className="group p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3 font-display">Avaliações Técnicas</h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Laudos com rigor normativo (NBR 14653) para fins judiciais, garantia bancária e inventários. Precisão técnica acima de tudo.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3 font-display">Consultoria Estratégica</h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Análise de viabilidade e inteligência de mercado para investidores. Decisões pautadas em dados, não em "feeling".
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group p-8 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-3 font-display">Corretagem Curada</h3>
                            <p className="text-neutral-600 leading-relaxed text-sm">
                                Venda e aluguel de imóveis selecionados. Foco na qualidade do ativo e na segurança jurídica da transação.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Institutional / Authority Statement */}
            <section className="py-24 bg-neutral-900 text-white text-center">
                <div className="container-custom max-w-3xl">
                    <p className="text-sm tracking-widest uppercase text-neutral-400 mb-6 font-medium">Método IMI</p>
                    <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-8">
                        "O mercado imobiliário não aceita amadorismo. Transformamos dados complexos em decisões de capital seguras."
                    </h2>
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white">
                        <Link href="/sobre">Conheça Nossa Trajetória</Link>
                    </Button>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-white border-t border-neutral-100">
                <div className="container-custom text-center">
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                        Precisa de uma avaliação técnica?
                    </h2>
                    <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                        Entre em contato hoje para agendar uma consulta inicial ou solicitar um orçamento de avaliação.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contato">Falar pelo WhatsApp</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}
