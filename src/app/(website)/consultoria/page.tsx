'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import ConsultationForm from '@/components/forms/ConsultationForm'

export default function ConsultoriaPage() {
    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-accent-900 to-accent-800 text-white">
                <div className="container-custom py-16 lg:py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1 variants={slideUp} className="text-display-md md:text-display-lg font-bold mb-6">
                            Consultoria Imobiliária Estratégica
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-accent-100">
                            Decisões de compra, venda e investimento baseadas em análise técnica,
                            dados de mercado e estratégia personalizada.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-12 text-center">
                            Serviços de Consultoria
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <motion.div variants={slideUp} className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8">
                                <div className="w-12 h-12 mb-4 rounded-full bg-accent-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Consultoria para Investidores</h3>
                                <p className="text-neutral-700">
                                    Análise de oportunidades, avaliação de risco-retorno, estratégias de entrada e saída,
                                    e acompanhamento de investimentos imobiliários.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
                                <div className="w-12 h-12 mb-4 rounded-full bg-primary-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Viabilidade de Compra/Venda</h3>
                                <p className="text-neutral-700">
                                    Análise técnica de viabilidade, identificação de riscos, avaliação de documentação,
                                    e recomendações estratégicas para transações seguras.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
                                <div className="w-12 h-12 mb-4 rounded-full bg-primary-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Precificação Estratégica</h3>
                                <p className="text-neutral-700">
                                    Definição de preço de venda ou compra baseada em análise de mercado, comparativos,
                                    tendências e objetivos do cliente.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8">
                                <div className="w-12 h-12 mb-4 rounded-full bg-accent-600 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Análise de Portfólio</h3>
                                <p className="text-neutral-700">
                                    Avaliação estratégica de carteira imobiliária, identificação de oportunidades de
                                    otimização, e recomendações de rebalanceamento.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Approach */}
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
                            Abordagem Estratégica
                        </motion.h2>

                        <div className="space-y-8">
                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Diagnóstico</h3>
                                    <p className="text-neutral-700">
                                        Entendimento profundo do contexto, objetivos e restrições do cliente.
                                        Análise inicial de viabilidade e identificação de oportunidades.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                                        2
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Análise Técnica</h3>
                                    <p className="text-neutral-700">
                                        Pesquisa de mercado, análise comparativa, avaliação de riscos e
                                        modelagem financeira. Dados transformados em insights acionáveis.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                                        3
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Recomendações</h3>
                                    <p className="text-neutral-700">
                                        Estratégias personalizadas, plano de ação detalhado e recomendações
                                        fundamentadas para tomada de decisão segura.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                                        4
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Acompanhamento</h3>
                                    <p className="text-neutral-700">
                                        Suporte na implementação das estratégias e acompanhamento de resultados.
                                        Ajustes conforme necessário.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Form Section */}
            <section id="form" className="section-padding">
                <div className="container-custom max-w-4xl">
                    <ConsultationForm />
                </div>
            </section>
        </div>
    )
}
