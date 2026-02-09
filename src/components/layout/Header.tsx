'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
            <nav className="container-custom h-16 lg:h-20 flex items-center justify-between">
                <Link href="/" className="font-display text-xl font-bold text-navy-900">
                    IMI
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    <Link href="/avaliacoes" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Avaliações
                    </Link>
                    <Link href="/imoveis" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Imóveis
                    </Link>
                    <Link href="/credito" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Crédito
                    </Link>
                    <Link href="/consultoria" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Consultoria
                    </Link>
                    <Link href="/inteligencia" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Inteligência
                    </Link>
                    <Link href="/sobre" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Sobre
                    </Link>
                    <Link href="/contato" className="text-sm font-semibold text-navy-900 hover:text-gold-500 transition-colors">
                        Contato
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-navy-900"
                    aria-label="Menu"
                >
                    {isOpen ? <X className=\"w-6 h-6\" /> : <Menu className=\"w-6 h-6\" />}
                </button>
            </nav>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="fixed top-16 right-0 w-full max-w-sm h-[calc(100vh-4rem)] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
                        <div className="p-6 space-y-4">
                            <Link
                                href="/avaliacoes"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Avaliações
                            </Link>
                            <Link
                                href="/imoveis"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Imóveis
                            </Link>
                            <Link
                                href="/credito"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Crédito
                            </Link>
                            <Link
                                href="/consultoria"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Consultoria
                            </Link>
                            <Link
                                href="/inteligencia"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Inteligência
                            </Link>
                            <Link
                                href="/sobre"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Sobre
                            </Link>
                            <Link
                                href="/contato"
                                className="block py-3 px-4 rounded-lg text-navy-900 font-semibold hover:bg-slate-50 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Contato
                            </Link>

                            <div className=\"pt-6 border-t border-slate-200\">
                            <Button asChild className=\"w-full\">
                            <a href=\"https://wa.me/5581997230455\" target=\"_blank\" rel=\"noopener noreferrer\">
                            <MessageCircle className=\"w-5 h-5 mr-2\" />
                            WhatsApp
                        </a>
                    </Button>
                </div>
        </div>
          </div >
        </>
      )
}
    </header >
  )
}
