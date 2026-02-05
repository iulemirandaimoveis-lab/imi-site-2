'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts'
import Card from '@/components/ui/Card'
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations'

const marketData = [
    { month: 'Jan', value: 8500 },
    { month: 'Fev', value: 8600 },
    { month: 'Mar', value: 8800 },
    { month: 'Abr', value: 8900 },
    { month: 'Mai', value: 9200 },
    { month: 'Jun', value: 9500 },
]

const neighborhoodData = [
    { name: 'Jardins', value: 18500 },
    { name: 'Itaim', value: 22000 },
    { name: 'V. Nova', value: 19800 },
    { name: 'Moema', value: 16500 },
    { name: 'Pinheiros', value: 15400 },
]

export default function MarketIntelligencePage() {
    return (
        <div className="bg-neutral-50 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="bg-neutral-900 text-white py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1
                            variants={slideUp}
                            className="text-4xl md:text-6xl font-display font-bold mb-6"
                        >
                            Inteligência de Mercado
                        </motion.h1>
                        <motion.p
                            variants={slideUp}
                            className="text-xl text-neutral-300 max-w-2xl font-light"
                        >
                            Dados atualizados, tendências e análises exclusivas para fundamentar suas decisões de investimento.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <div className="container-custom -mt-16 z-20 relative">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="p-6 border-l-4 border-primary-500 shadow-xl">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Valorização Média (12m)</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-neutral-900">+12.4%</span>
                            <span className="text-green-600 font-medium mb-1">↑ Alta</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">Setor de Alto Padrão - SP</p>
                    </Card>

                    <Card className="p-6 border-l-4 border-accent-500 shadow-xl">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Liquidez Média</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-neutral-900">45 Dias</span>
                            <span className="text-neutral-600 font-medium mb-1">Ativos Premium</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">Imóveis acima de R$ 2MM</p>
                    </Card>

                    <Card className="p-6 border-l-4 border-neutral-800 shadow-xl">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Custo Médio m²</h3>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-bold text-neutral-900">R$ 18.230</span>
                            <span className="text-neutral-600 font-medium mb-1">/m²</span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">Bairros Monitorados</p>
                    </Card>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    <Card className="p-8">
                        <h3 className="text-xl font-bold text-neutral-900 mb-6 font-display">Tendência de Preço (m²)</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={marketData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#666' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#0f3352"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#0f3352' }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold text-neutral-900 mb-6 font-display">Valor por Região (R$/m²)</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={neighborhoodData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                    <Bar dataKey="value" fill="#a88a5a" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Tools Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-display font-bold text-neutral-900 mb-8">Ferramentas Exclusivas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <a href="/avaliacoes" className="group">
                            <Card hover className="h-full p-8 border border-neutral-200">
                                <div className="w-12 h-12 bg-primary-100 text-primary-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 36v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Calculadora de Valuation</h3>
                                <p className="text-neutral-600 mb-4 text-sm">Estime o valor de mercado do seu imóvel com base em dados de transações recentes.</p>
                                <span className="text-primary-700 font-semibold text-sm group-hover:underline">Acessar ferramenta →</span>
                            </Card>
                        </a>

                        <a href="#" className="group">
                            <Card hover className="h-full p-8 border border-neutral-200">
                                <div className="w-12 h-12 bg-primary-100 text-primary-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Comparador de Bairros</h3>
                                <p className="text-neutral-600 mb-4 text-sm">Compare métricas de segurança, valorização e liquidez entre diferentes regiões.</p>
                                <span className="text-primary-700 font-semibold text-sm group-hover:underline">Em breve →</span>
                            </Card>
                        </a>

                        <a href="/consultoria" className="group">
                            <Card hover className="h-full p-8 border border-neutral-200">
                                <div className="w-12 h-12 bg-primary-100 text-primary-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">Simulador de Retorno</h3>
                                <p className="text-neutral-600 mb-4 text-sm">Calcule o ROI potencial de investimentos imobiliários considerando vacância e impostos.</p>
                                <span className="text-primary-700 font-semibold text-sm group-hover:underline">Agendar consultoria →</span>
                            </Card>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
