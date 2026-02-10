'use client'

import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import { BookOpen, CheckCircle } from 'lucide-react'

export default function ConteudoPage() {
    return (
        <main className="bg-white">
            <section className="bg-imi-900 text-white section-padding relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/5 -skew-x-12 translate-x-1/4" />
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6"><div className="w-12 h-px bg-accent-500" /><span className="text-accent-500 font-semibold uppercase tracking-[0.2em] text-xs">Conteúdo</span></div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Conteúdo e Insights</h1>
                        <p className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">Análises, artigos e insights sobre o mercado imobiliário.</p>
                    </div>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-custom text-center">
                    <BookOpen className="w-16 h-16 mx-auto text-imi-200 mb-6" strokeWidth={1} />
                    <h2 className="text-3xl font-bold text-imi-900 mb-4 font-display">Em Breve</h2>
                    <p className="text-lg text-imi-500 mb-8">Esta seção está sendo preparada com nosso portfólio de conteúdo.</p>
                    <div className="bg-imi-50 rounded-xl p-8 max-w-md mx-auto">
                        <h3 className="font-semibold text-imi-900 mb-4">Temas previstos:</h3>
                        <ul className="text-left space-y-3 text-imi-500">
                            {['Análises de mercado regionais', 'Guias de investimento imobiliário', 'Fundamentos de avaliação imobiliária', 'Tendências do mercado de crédito', 'Estratégias de patrimônio'].map(t => (<li key={t} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" /><span className="text-sm">{t}</span></li>))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}
