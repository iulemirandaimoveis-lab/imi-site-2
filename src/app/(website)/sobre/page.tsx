'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'

export default function SobrePage() {
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
                            Sobre a IMI
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100">
                            Inteligência, método e segurança em decisões imobiliárias.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-8 text-center">
                            Nossa Missão
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-xl text-neutral-700 text-center mb-12">
                            Transformar decisões imobiliárias em processos seguros, fundamentados e estratégicos,
                            utilizando inteligência de mercado, metodologia técnica e análise de dados.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Inteligência</h3>
                                <p className="text-neutral-600">
                                    Análise de dados e mercado para decisões fundamentadas
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Método</h3>
                                <p className="text-neutral-600">
                                    Processos técnicos e conformidade normativa
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">Segurança</h3>
                                <p className="text-neutral-600">
                                    Redução de risco e transparência em todas as etapas
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Professional Profile */}
            <section className="section-padding bg-neutral-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                            <motion.div variants={slideUp} className="md:col-span-1">
                                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                                    <svg className="w-32 h-32 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="md:col-span-2">
                                <h2 className="text-display-sm font-bold text-neutral-900 mb-4">
                                    Iule Miranda
                                </h2>
                                <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-6">
                                    <span className="font-semibold">CRECI 17933</span>
                                    <span className="text-neutral-400">|</span>
                                    <span className="font-semibold">CNAI 53290</span>
                                </div>
                                <div className="prose-custom">
                                    <p className="text-lg text-neutral-700 mb-4">
                                        Especialista em avaliações imobiliárias e consultoria estratégica, com
                                        certificação CNAI (Certificação Nacional de Avaliador Imobiliário) e registro
                                        ativo no CRECI.
                                    </p>
                                    <p className="text-neutral-700 mb-4">
                                        Atuação focada em transformar dados de mercado em decisões seguras,
                                        utilizando metodologia técnica normativa e análise fundamentada.
                                    </p>
                                    <p className="text-neutral-700">
                                        Experiência em avaliações para venda, financiamento, processos judiciais
                                        e gestão patrimonial, além de consultoria para investidores e análise
                                        de viabilidade de empreendimentos.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-12 text-center">
                            Nossos Valores
                        </motion.h2>

                        <div className="space-y-8">
                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                                        1
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Transparência</h3>
                                    <p className="text-neutral-700">
                                        Processos claros, informações acessíveis e comunicação direta.
                                        Sem promessas vazias ou marketing agressivo.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                                        2
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Rigor Técnico</h3>
                                    <p className="text-neutral-700">
                                        Metodologia normativa, conformidade regulatória e fundamentação
                                        técnica em todas as análises e recomendações.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                                        3
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Foco no Cliente</h3>
                                    <p className="text-neutral-700">
                                        Soluções personalizadas baseadas em objetivos reais.
                                        Cada cliente tem necessidades únicas que merecem atenção específica.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={slideUp} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                                        4
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Ética Profissional</h3>
                                    <p className="text-neutral-700">
                                        Compromisso com as melhores práticas do mercado, respeito às normas
                                        e atuação sempre em benefício do cliente.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
