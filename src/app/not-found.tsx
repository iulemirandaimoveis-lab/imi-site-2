'use client'

import React from 'react'
import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-imi-900 p-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full border border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <FileQuestion className="w-8 h-8 text-slate-400" />
                </div>

                <h2 className="text-2xl font-bold mb-2">Página não encontrada (404)</h2>
                <p className="text-slate-500 text-center mb-8">
                    A página que você está tentando acessar não existe ou foi removida.
                </p>

                <div className="flex flex-col w-full gap-3">
                    <Link
                        href="/backoffice"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-imi-900 text-white rounded-xl font-bold hover:bg-imi-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Ir para Backoffice
                    </Link>
                    <Link
                        href="/"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                    >
                        Voltar ao Site
                    </Link>
                </div>
            </div>
        </div>
    )
}
