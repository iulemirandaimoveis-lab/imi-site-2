'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import AppraisalForm from '@/components/forms/AppraisalForm'

export default function AvaliacoesPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white">
                <div className="container-custom py-16 lg:py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1 variants={slideUp} className="text-display-md md:text-display-lg font-bold mb-6">
                            Avaliações Imobiliárias
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100">
                            Laudos técnicos com metodologia normativa e conformidade regulatória.
                            Decisões seguras baseadas em análise profissional.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* CNAI Badge */}
            <section className="bg-primary-50 border-b border-primary-100">
                <div className="container-custom py-6">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                            <span className="font-semibold text-primary-900">CNAI 53290</span>
                        </div>
                        <span className="text-primary-400">|</span>
                        <span className="text-primary-700">Certificação Nacional de Avaliador Imobiliário</span>
                    </div>
                </div>
            </section>

            {/* Types of Appraisals */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-12 text-center">
                            Tipos de Avaliação
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <motion.div variants={slideUp} className="bg-neutral-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Venda</h3>
                                <p className="text-neutral-600">
                                    Avaliação técnica para precificação estratégica de imóveis em venda.
                                    Análise de mercado, comparativos e valor justo baseado em metodologia normativa.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-neutral-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Financiamento</h3>
                                <p className="text-neutral-600">
                                    Laudos técnicos aceitos por instituições financeiras para processos de
                                    financiamento imobiliário. Conformidade com exigências bancárias.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-neutral-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Judicial / Extrajudicial</h3>
                                <p className="text-neutral-600">
                                    Avaliações para processos judiciais, inventários, partilhas e arbitragens.
                                    Rigor técnico e fundamentação normativa para uso legal.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-neutral-50 rounded-xl p-8">
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Patrimonial</h3>
                                <p className="text-neutral-600">
                                    Avaliação de portfólio imobiliário para fins contábeis, fiscais ou
                                    estratégicos. Gestão patrimonial baseada em valores técnicos.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Methodology */}
            <section className="section-padding bg-neutral-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-8 text-center">
                            Metodologia
                        </motion.h2>
                        <motion.div variants={slideUp} className="prose-custom">
                            <p className="text-lg text-neutral-700 mb-6">
                                Todas as avaliações seguem rigorosamente a <strong>NBR 14653</strong> (Norma Brasileira
                                de Avaliação de Bens) e as diretrizes do IBAPE (Instituto Brasileiro de Avaliações e
                                Perícias de Engenharia).
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary-700">1</span>
                                    </div>
                                    <h4 className="font-semibold text-neutral-900 mb-2">Vistoria Técnica</h4>
                                    <p className="text-sm text-neutral-600">Inspeção detalhada do imóvel e entorno</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary-700">2</span>
                                    </div>
                                    <h4 className="font-semibold text-neutral-900 mb-2">Análise de Dados</h4>
                                    <p className="text-sm text-neutral-600">Pesquisa de mercado e tratamento estatístico</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary-700">3</span>
                                    </div>
                                    <h4 className="font-semibold text-neutral-900 mb-2">Laudo Técnico</h4>
                                    <p className="text-sm text-neutral-600">Documento fundamentado e normativo</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section id="form" className="section-padding">
                <div className="container-custom max-w-4xl">
                    <AppraisalForm />
                </div>
            </section>
        </div>
    )
}
