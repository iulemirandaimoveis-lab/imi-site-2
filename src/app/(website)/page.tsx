'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations'

export default function HomePage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="relative container-custom section-padding">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.h1
                            variants={slideUp}
                            className="text-display-lg md:text-display-xl font-bold mb-6 text-balance"
                        >
                            Inteligência, método e segurança em decisões imobiliárias
                        </motion.h1>
                        <motion.p
                            variants={slideUp}
                            className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto text-balance"
                        >
                            Avaliações técnicas, consultoria estratégica e corretagem com curadoria.
                            Transformamos dados em decisões seguras.
                        </motion.p>
                        <motion.div
                            variants={slideUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button asChild size="lg" variant="secondary">
                                <Link href="/avaliacoes#form">Solicitar Avaliação</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                                <Link href="/consultoria#form">Agendar Conversa</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Three Service Pillars */}
            <section className="section-padding bg-neutral-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Avaliações */}
                        <motion.div variants={slideUp}>
                            <Card hover className="h-full p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    Avaliações Imobiliárias
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Laudos técnicos com metodologia normativa para venda, financiamento,
                                    judicial e patrimonial. CNAI 53290.
                                </p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/avaliacoes">Saiba mais</Link>
                                </Button>
                            </Card>
                        </motion.div>

                        {/* Consultoria */}
                        <motion.div variants={slideUp}>
                            <Card hover className="h-full p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-accent-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    Consultoria Estratégica
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Análise de viabilidade, precificação estratégica e consultoria para
                                    investidores. Decisões baseadas em dados.
                                </p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/consultoria">Saiba mais</Link>
                                </Button>
                            </Card>
                        </motion.div>

                        {/* Imóveis */}
                        <motion.div variants={slideUp}>
                            <Card hover className="h-full p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    Imóveis
                                </h3>
                                <p className="text-neutral-600 mb-6">
                                    Corretagem com curadoria técnica. Lançamentos e usados selecionados
                                    com análise de mercado e viabilidade.
                                </p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/imoveis">Ver Imóveis</Link>
                                </Button>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                <div>
                                    <div className="text-4xl font-bold text-primary-900 mb-2">CNAI 53290</div>
                                    <div className="text-neutral-600">Certificação Nacional de Avaliador Imobiliário</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary-900 mb-2">CRECI 17933</div>
                                    <div className="text-neutral-600">Registro profissional ativo</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-primary-900 mb-2">Metodologia</div>
                                    <div className="text-neutral-600">Conformidade normativa NBR 14653</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-primary-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.h2 variants={slideUp} className="text-display-md font-bold mb-6">
                            Pronto para tomar decisões mais seguras?
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-xl text-primary-100 mb-8">
                            Entre em contato e descubra como a inteligência imobiliária pode
                            transformar suas decisões de compra, venda ou investimento.
                        </motion.p>
                        <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" variant="secondary">
                                <Link href="/avaliacoes#form">Solicitar Avaliação</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                                <Link href="/contato">Falar com Especialista</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
