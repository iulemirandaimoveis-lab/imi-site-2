'use client'

import { Briefcase } from 'lucide-react'
import Link from 'next/link'

export default function ProjetosPage() {
    return (
        <main className="bg-white">
            <section className="bg-imi-900 text-white section-padding relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/5 -skew-x-12 translate-x-1/4" />
                <div className="container-custom relative z-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6"><div className="w-12 h-px bg-accent-500" /><span className="text-accent-500 font-semibold uppercase tracking-[0.2em] text-xs">Projetos</span></div>
                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Projetos Especiais</h1>
                        <p className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">Portfólio de projetos de investimento e desenvolvimento imobiliário.</p>
                    </div>
                </div>
            </section>
            <section className="section-padding">
                <div className="container-custom text-center">
                    <Briefcase className="w-16 h-16 mx-auto text-imi-200 mb-6" strokeWidth={1} />
                    <p className="text-imi-500 text-lg mb-6">Esta seção está sendo atualizada com nosso portfólio completo.</p>
                    <Link href="/pt/contato" className="text-accent-600 font-semibold hover:underline">Solicite acesso ao portfólio completo</Link>
                </div>
            </section>
        </main>
    )
}
