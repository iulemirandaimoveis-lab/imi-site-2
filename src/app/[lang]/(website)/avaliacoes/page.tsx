'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import { ShieldCheck, Home, Landmark, Scale, Briefcase, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import AppraisalForm from '@/components/forms/AppraisalForm'

export default function AppraisalsPage() {
    return (
        <>
            {/* HERO */}
            <section className="bg-imi-900 text-white section-padding relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/5 -skew-x-12 translate-x-1/4" />
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-accent-500" />
                            <span className="text-accent-500 font-semibold uppercase tracking-[0.2em] text-xs">CNAI 53290</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Avaliações Imobiliárias
                        </h1>
                        <p className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Laudos técnicos com metodologia normativa NBR 14653. Decisões seguras baseadas em análise profissional.
                        </p>
                    </div>
                </div>
            </section>

            {/* BADGE CNAI */}
            <section className="bg-imi-50 border-b border-imi-100 py-8">
                <div className="container-custom">
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <div className="flex items-center gap-3 px-6 py-3 bg-accent-500/10 rounded-xl border border-accent-500/20">
                            <ShieldCheck className="w-6 h-6 text-accent-600" strokeWidth={1.5} />
                            <span className="text-imi-900 font-semibold">
                                Avaliador Certificado CNAI Nº 53290
                            </span>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-imi-100" />
                        <span className="text-imi-500 text-sm font-medium">
                            Certificação Nacional de Avaliador Imobiliário
                        </span>
                    </div>
                </div>
            </section>

            {/* TIPOS DE AVALIAÇÃO */}
            <section className="section-padding">
                <div className="container-custom">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-imi-900 mb-4 text-center">
                        Tipos de Avaliação
                    </h2>
                    <p className="text-imi-500 text-lg max-w-2xl mx-auto text-center mb-12">
                        Serviços especializados para diferentes necessidades de mercado e conformidade legal
                    </p>

                    <motion.div
                        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            {
                                icon: Home,
                                title: 'Venda e Compra',
                                description: 'Avaliação técnica para precificação estratégica de imóveis. Análise profunda de mercado e comparativos para determinar o valor justo.'
                            },
                            {
                                icon: Landmark,
                                title: 'Financiamento',
                                description: 'Laudos técnicos aceitos por instituições financeiras para processos de financiamento imobiliário, seguindo rigorosas exigências bancárias.'
                            },
                            {
                                icon: Scale,
                                title: 'Judicial / Extrajudicial',
                                description: 'Perícia técnica para processos judiciais, inventários, partilhas e arbitragens. Fundamentação normativa sólida para uso legal.'
                            },
                            {
                                icon: Briefcase,
                                title: 'Patrimonial',
                                description: 'Avaliação de portfólio imobiliário para fins contábeis, fiscais ou estratégicos. Gestão de ativos baseada em inteligência técnica.'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={slideUp}
                                className="p-8 rounded-xl bg-white border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-imi-900 text-white rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-bold text-imi-900 mb-3 font-display">
                                    {item.title}
                                </h3>
                                <p className="text-imi-500 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* METODOLOGIA */}
            <section className="section-padding bg-imi-50">
                <div className="container-custom">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-imi-900 mb-6 text-center">
                        Nossa Metodologia
                    </h2>
                    <p className="text-imi-500 text-center max-w-2xl mx-auto mb-12">
                        Todas as avaliações seguem rigorosamente a <strong>NBR 14653</strong> e as diretrizes do IBAPE, garantindo segurança técnica absoluta.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Vistoria Técnica', desc: 'Inspeção detalhada do imóvel, acabamentos e análise do entorno imediato.' },
                            { step: '2', title: 'Análise de Dados', desc: 'Pesquisa rigorosa de mercado e tratamento estatístico dos dados coletados.' },
                            { step: '3', title: 'Laudo Técnico', desc: 'Emissão do documento final fundamentado em normas técnicas brasileiras.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="text-center"
                                variants={slideUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-12 h-12 bg-imi-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-imi-900 mb-3 font-display">
                                    {item.title}
                                </h3>
                                <p className="text-imi-500 text-sm leading-relaxed px-4">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FORMULÁRIO */}
            <section className="section-padding" id="form">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-imi-900 mb-12 text-center">
                            Solicitar Avaliação Técnica
                        </h2>
                        <AppraisalForm />
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="bg-imi-900 text-white section-padding text-center relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                        Dúvidas sobre Avaliações?
                    </h2>
                    <p className="text-imi-300 text-lg mb-10 max-w-2xl mx-auto font-light">
                        Nossa equipe técnica está pronta para esclarecer qualquer questão normativa ou processual.
                    </p>
                    <Button asChild size="lg" className="bg-white text-imi-900 hover:bg-imi-50">
                        <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5 mr-3" />
                            Falar com Especialista
                        </a>
                    </Button>
                </div>
            </section>
        </>
    )
}
