'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'

export default function ConteudoPage() {
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
                            Conteúdo
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100">
                            Insights, análises de mercado e conhecimento técnico sobre o mercado imobiliário.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Coming Soon */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <motion.div variants={slideUp} className="mb-8">
                            <svg className="w-24 h-24 mx-auto text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                        </motion.div>

                        <motion.h2 variants={slideUp} className="text-3xl font-bold text-neutral-900 mb-4">
                            Em Breve
                        </motion.h2>

                        <motion.p variants={slideUp} className="text-lg text-neutral-700 mb-8">
                            Estamos preparando conteúdo técnico de qualidade sobre avaliações imobiliárias,
                            análises de mercado e estratégias de investimento.
                        </motion.p>

                        <motion.div variants={slideUp} className="bg-primary-50 rounded-xl p-8">
                            <h3 className="font-semibold text-neutral-900 mb-4">Temas que serão abordados:</h3>
                            <ul className="text-left space-y-2 text-neutral-700 max-w-md mx-auto">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Metodologia de avaliação imobiliária</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Análises de mercado e tendências</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Estratégias de investimento imobiliário</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Aspectos legais e documentação</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Casos práticos e estudos de mercado</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
