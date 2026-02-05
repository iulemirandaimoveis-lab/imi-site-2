'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ForWhom() {
    return (
        <section className="py-20 bg-offwhite">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-navy-700 mb-4">
                            Esta Consultoria é Para Você?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Transparência total: saiba se este caminho faz sentido para seu perfil
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Para Quem É */}
                        <div className="bg-white/80 backdrop-blur-md shadow-soft rounded-2xl p-8 border-2 border-green-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Para Quem É
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Investidor com Capital Declarado</p>
                                        <p className="text-sm text-gray-600 mt-1">Mínimo USD 100k disponível e regularizado no Brasil</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Busca Renda em USD</p>
                                        <p className="text-sm text-gray-600 mt-1">Objetivo de cashflow previsível em moeda forte</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Valoriza Governança</p>
                                        <p className="text-sm text-gray-600 mt-1">Aceita estruturas jurídicas e gestão profissional</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Visão de Longo Prazo</p>
                                        <p className="text-sm text-gray-600 mt-1">Horizonte mínimo de 5 anos</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Entende Compliance</p>
                                        <p className="text-sm text-gray-600 mt-1">Disposto a seguir processos legais e fiscais</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Para Quem NÃO É */}
                        <div className="bg-white/80 backdrop-blur-md shadow-soft rounded-2xl p-8 border-2 border-red-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-red-100 rounded-xl">
                                    <XCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    Não é Para Quem
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Busca "Ganho Rápido"</p>
                                        <p className="text-sm text-gray-600 mt-1">Não trabalhamos com especulação ou promessas irreais</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Quer Fazer Sozinho</p>
                                        <p className="text-sm text-gray-600 mt-1">Estruturas internacionais exigem parceiros locais</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Rejeita Processos</p>
                                        <p className="text-sm text-gray-600 mt-1">Compliance e governança não são opcionais</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Capital Irregular</p>
                                        <p className="text-sm text-gray-600 mt-1">100% do capital deve estar declarado à Receita</p>
                                    </div>
                                </li>

                                <li className="flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-gray-900">Precisa Liquidez Imediata</p>
                                        <p className="text-sm text-gray-600 mt-1">Imóveis não são ativos líquidos de curto prazo</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-6">
                            Se você se identificou com o perfil ideal, vamos conversar.
                        </p>
                        <button className="bg-navy-600 hover:bg-navy-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg">
                            Agendar Análise Gratuita
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
