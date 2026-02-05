'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer, fadeIn } from '@/lib/animations'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'

const creditTypes = [
    {
        id: 'consorcio',
        title: 'Consórcio Imobiliário',
        description: 'Planeje a compra do seu imóvel sem juros, apenas taxa de administração.',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
        benefits: [
            'Sem juros, apenas taxa de administração',
            'Parcelas que cabem no bolso',
            'Possibilidade de antecipar contemplação',
            'Use seu FGTS para dar lance',
        ],
    },
    {
        id: 'financiamento',
        title: 'Financiamento Bancário',
        description: 'Acesso imediato ao imóvel com as melhores taxas do mercado.',
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
        ),
        benefits: [
            'Posse imediata do imóvel',
            'Taxas competitivas',
            'Prazos de até 35 anos',
            'Parceria com principais bancos',
        ],
    },
]

const consortiumPlans = [
    { value: 150000, parcels: 180, monthly: 1050 },
    { value: 250000, parcels: 180, monthly: 1750 },
    { value: 400000, parcels: 200, monthly: 2600 },
    { value: 600000, parcels: 200, monthly: 3900 },
    { value: 800000, parcels: 220, monthly: 4800 },
    { value: 1000000, parcels: 220, monthly: 6000 },
]

const partners = [
    { name: 'Caixa Consórcios', logo: '/images/partners/caixa.png' },
    { name: 'Bradesco Consórcios', logo: '/images/partners/bradesco.png' },
    { name: 'Itaú Consórcios', logo: '/images/partners/itau.png' },
    { name: 'Porto Seguro', logo: '/images/partners/porto.png' },
]

const faqs = [
    {
        question: 'O que é consórcio imobiliário?',
        answer: 'O consórcio imobiliário é uma modalidade de compra coletiva onde um grupo de pessoas se une para formar uma poupança comum. Mensalmente, um ou mais participantes são contemplados por sorteio ou lance e recebem a carta de crédito para comprar o imóvel.',
    },
    {
        question: 'Quais as vantagens do consórcio?',
        answer: 'As principais vantagens são: ausência de juros (apenas taxa de administração), parcelas menores comparadas ao financiamento, possibilidade de usar FGTS para dar lances, e planejamento financeiro a longo prazo.',
    },
    {
        question: 'Posso usar o FGTS no consórcio?',
        answer: 'Sim! Você pode usar o FGTS para dar lances e aumentar suas chances de contemplação, ou para complementar o valor da carta de crédito na hora da compra.',
    },
    {
        question: 'Quanto tempo demora para ser contemplado?',
        answer: 'A contemplação pode ocorrer já no primeiro mês por sorteio. Com lances, você pode acelerar esse processo. Em média, consórcios imobiliários têm prazo de 120 a 220 meses.',
    },
    {
        question: 'A IMI vende consórcio diretamente?',
        answer: 'Estamos em processo de nos tornarmos correspondentes bancários. Atualmente, conectamos você com as melhores administradoras parceiras, garantindo condições especiais e suporte completo.',
    },
]

export default function CreditoPage() {
    const [selectedPlan, setSelectedPlan] = useState(consortiumPlans[1])
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-10"></div>
                <div className="container-custom py-20 lg:py-28 relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.span
                            variants={slideUp}
                            className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-6"
                        >
                            Crédito Imobiliário
                        </motion.span>
                        <motion.h1 variants={slideUp} className="text-display-md md:text-display-lg font-bold mb-6">
                            Realize o sonho do imóvel próprio
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100 mb-8">
                            Consórcio ou financiamento? A IMI ajuda você a encontrar a melhor
                            solução de crédito para seu perfil e momento de vida.
                        </motion.p>
                        <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4">
                            <Button asChild size="lg" variant="secondary">
                                <a href="#simulador">Simular Consórcio</a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                <Link href="/contato">Falar com Especialista</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Credit Types */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-4">
                            Modalidades de Crédito
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-lg text-neutral-600 max-w-2xl mx-auto">
                            Entenda as diferenças e escolha a melhor opção para você
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {creditTypes.map((type, index) => (
                            <motion.div
                                key={type.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full p-8">
                                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700 mb-6">
                                        {type.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                        {type.title}
                                    </h3>
                                    <p className="text-neutral-600 mb-6">
                                        {type.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {type.benefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                                <span className="text-neutral-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simulator */}
            <section id="simulador" className="section-padding bg-neutral-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-4">
                                Simule seu Consórcio
                            </motion.h2>
                            <motion.p variants={slideUp} className="text-lg text-neutral-600">
                                Escolha o valor da carta de crédito e veja as condições
                            </motion.p>
                        </div>

                        <motion.div variants={slideUp}>
                            <Card className="p-8">
                                {/* Plan Selection */}
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-neutral-700 mb-4">
                                        Valor da Carta de Crédito
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {consortiumPlans.map((plan) => (
                                            <button
                                                key={plan.value}
                                                onClick={() => setSelectedPlan(plan)}
                                                className={`p-4 rounded-xl border-2 transition-all text-center ${selectedPlan.value === plan.value
                                                        ? 'border-primary-700 bg-primary-50'
                                                        : 'border-neutral-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <p className="font-bold text-lg text-neutral-900">
                                                    {formatCurrency(plan.value)}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Result */}
                                <div className="bg-primary-900 text-white rounded-xl p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                        <div>
                                            <p className="text-primary-200 text-sm mb-1">Carta de Crédito</p>
                                            <p className="text-3xl font-bold">{formatCurrency(selectedPlan.value)}</p>
                                        </div>
                                        <div>
                                            <p className="text-primary-200 text-sm mb-1">Parcela Mensal*</p>
                                            <p className="text-3xl font-bold">{formatCurrency(selectedPlan.monthly)}</p>
                                        </div>
                                        <div>
                                            <p className="text-primary-200 text-sm mb-1">Prazo</p>
                                            <p className="text-3xl font-bold">{selectedPlan.parcels} meses</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-primary-300 mt-6 text-center">
                                        *Valores aproximados. A parcela pode variar conforme a administradora e condições do plano.
                                    </p>
                                </div>

                                {/* CTA */}
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg">
                                        <a
                                            href={`https://wa.me/5511999999999?text=Olá! Tenho interesse em um consórcio de ${formatCurrency(selectedPlan.value)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Quero esse plano
                                        </a>
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="/contato">Solicitar proposta detalhada</Link>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Why IMI */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <div className="text-center mb-16">
                            <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-4">
                                Por que fazer seu crédito com a IMI?
                            </motion.h2>
                            <motion.p variants={slideUp} className="text-lg text-neutral-600 max-w-2xl mx-auto">
                                Mais do que vender crédito, oferecemos inteligência imobiliária
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 mx-auto mb-6">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Análise Técnica</h3>
                                <p className="text-neutral-600">
                                    Avaliamos qual modalidade de crédito é mais adequada para seu perfil financeiro e objetivos.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 mx-auto mb-6">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Parceiros Confiáveis</h3>
                                <p className="text-neutral-600">
                                    Trabalhamos apenas com administradoras e instituições financeiras de primeira linha.
                                </p>
                            </motion.div>

                            <motion.div variants={slideUp} className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 mx-auto mb-6">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Do Crédito ao Imóvel</h3>
                                <p className="text-neutral-600">
                                    Ajudamos você desde a escolha do crédito até encontrar o imóvel ideal quando for contemplado.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding bg-neutral-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="text-center mb-12">
                            <motion.h2 variants={slideUp} className="text-display-sm font-bold text-neutral-900 mb-4">
                                Perguntas Frequentes
                            </motion.h2>
                        </div>

                        <motion.div variants={slideUp} className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                                    >
                                        <span className="font-semibold text-neutral-900">{faq.question}</span>
                                        <svg
                                            className={`w-5 h-5 text-neutral-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-neutral-600">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="section-padding bg-primary-900 text-white">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <motion.h2 variants={slideUp} className="text-display-sm font-bold mb-6">
                            Pronto para dar o primeiro passo?
                        </motion.h2>
                        <motion.p variants={slideUp} className="text-xl text-primary-100 mb-8">
                            Fale com um especialista IMI e descubra a melhor solução de crédito para realizar seu sonho imobiliário.
                        </motion.p>
                        <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" variant="secondary">
                                <a
                                    href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre crédito imobiliário."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Falar pelo WhatsApp
                                </a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                <Link href="/contato">Agendar Consultoria</Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}
