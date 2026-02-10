'use client'

import { useState, useMemo } from 'react'
import {
    Plus, TrendingUp, TrendingDown, DollarSign, Target,
    MousePointerClick, RefreshCw, X, Sparkles, Zap,
    BarChart3, PieChart, Activity, ExternalLink, MoreVertical,
    ArrowUpRight, ArrowDownRight, Search, Filter, Calendar
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Toast, { useToast } from '@/components/ui/Toast'

interface Campaign {
    id: string
    name: string
    platform: 'google_ads' | 'meta_ads' | 'linkedin_ads' | 'tiktok_ads'
    status: 'active' | 'paused' | 'ended'
    budget: number
    spend: number
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpa: number
    trend: 'up' | 'down' | 'neutral'
}

export default function AdsPage() {
    const { toasts, showToast, removeToast } = useToast()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSyncing, setIsSyncing] = useState(false)
    const [showAIInsights, setShowAIInsights] = useState(true)

    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            id: '1', name: 'Luxury Launch - Ocean View', platform: 'meta_ads', status: 'active',
            budget: 15000, spend: 12450.50, impressions: 450000, clicks: 12420, conversions: 154,
            ctr: 2.76, cpa: 80.84, trend: 'up'
        },
        {
            id: '2', name: 'Google Search - Alto Padrão PR', platform: 'google_ads', status: 'active',
            budget: 25000, spend: 18200.00, impressions: 65000, clicks: 3890, conversions: 89,
            ctr: 5.98, cpa: 204.49, trend: 'neutral'
        },
        {
            id: '3', name: 'Retargeting High Performance', platform: 'meta_ads', status: 'paused',
            budget: 5000, spend: 4850.20, impressions: 120000, clicks: 2150, conversions: 42,
            ctr: 1.79, cpa: 115.48, trend: 'down'
        },
    ])

    const stats = useMemo(() => {
        const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0)
        const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0)
        const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0
        return { totalSpend, totalConversions, avgCpa }
    }, [campaigns])

    async function handleSync() {
        setIsSyncing(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        showToast('Performance sincronizada em tempo real', 'success')
        setIsSyncing(false)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    return (
        <div className="space-y-10 pb-20">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                        <span className="text-[10px] font-black text-imi-400 uppercase tracking-[0.3em]">Performance Command Center</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-imi-900 font-display tracking-tight">
                        Ads & <span className="text-accent-500">Inteligência</span>
                    </h1>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSync} disabled={isSyncing} className="h-14 px-8 border-imi-100 bg-white/50 backdrop-blur-md rounded-2xl group active:scale-95 transition-all">
                        <RefreshCw className={`w-5 h-5 mr-3 text-imi-400 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                        Sincronizar
                    </Button>
                    <Button className="h-14 px-8 bg-imi-900 text-white rounded-2xl shadow-elevated group active:scale-95 transition-all">
                        <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
                        Otimizar Campanha
                    </Button>
                </div>
            </div>

            {/* AI Insights Panel */}
            <AnimatePresence>
                {showAIInsights && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gradient-to-r from-imi-900 to-imi-800 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 blur-[100px] -mr-48 -mt-48 rounded-full" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center border border-accent-500/30">
                                    <Sparkles className="text-accent-500 animate-pulse" size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">IA Performance Insights</h2>
                                    <p className="text-imi-300 text-sm max-w-xl">
                                        Detectamos que o CTR em <span className="text-white font-bold">Luxury Launch</span> subiu 15% após o novo criativo. Sugerimos realocar R$ 2.000,00 da campanha de Retargeting.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button className="h-12 px-6 bg-accent-500 text-imi-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-400">
                                    Aplicar Otimização
                                </Button>
                                <button onClick={() => setShowAIInsights(false)} className="text-imi-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* KPI Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {[
                    { label: 'Investimento Mensal', value: stats.totalSpend, icon: DollarSign, trend: '+12.4%', upward: true, color: 'blue' },
                    { label: 'Conversões Ativas', value: stats.totalConversions, icon: Target, trend: '+5.2%', upward: true, color: 'purple' },
                    { label: 'CPA Médio (Lead)', value: stats.avgCpa, icon: Activity, trend: '-2.1%', upward: false, color: 'accent' },
                    { label: 'ROAS Projetado', value: '4.8x', icon: BarChart3, trend: '+0.4x', upward: true, color: 'green' }
                ].map((kpi, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="bg-white rounded-[2rem] p-8 border border-imi-50 shadow-soft hover:shadow-card-hover transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 rounded-2xl bg-imi-50 flex items-center justify-center text-imi-900 group-hover:bg-imi-900 group-hover:text-white transition-all`}>
                                <kpi.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${kpi.upward ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                {kpi.upward ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {kpi.trend}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-imi-400 uppercase tracking-widest">{kpi.label}</p>
                            <h3 className="text-3xl font-bold text-imi-900 tracking-tight">
                                {typeof kpi.value === 'number'
                                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(kpi.value)
                                    : kpi.value}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Sub-Header / Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-8 bg-white/50 backdrop-blur-md rounded-3xl border border-imi-100 shadow-soft">
                <div className="flex items-center gap-4 flex-1 w-full">
                    <Search className="text-imi-300" size={20} />
                    <input type="text" placeholder="Filtrar por campanha ou canal..." className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-imi-200" />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-imi-50 text-imi-500 text-[10px] font-black uppercase tracking-widest hover:bg-imi-100 transition-all border border-imi-100">
                        <Filter size={14} /> Canal
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-imi-50 text-imi-500 text-[10px] font-black uppercase tracking-widest hover:bg-imi-100 transition-all border border-imi-100">
                        <Calendar size={14} /> Últimos 30 dias
                    </button>
                </div>
            </div>

            {/* Campaigns Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {campaigns.map((camp) => (
                    <motion.div
                        key={camp.id}
                        variants={itemVariants}
                        className="bg-white rounded-[2.5rem] overflow-hidden border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-500 group relative"
                    >
                        {/* Platform Header */}
                        <div className={`h-2 w-full ${camp.platform === 'google_ads' ? 'bg-blue-500' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'}`} />

                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${camp.platform === 'google_ads' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                                            {camp.platform.replace('_', ' ')}
                                        </span>
                                        <span className={`w-1.5 h-1.5 rounded-full ${camp.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-imi-200'}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-imi-900 group-hover:text-accent-600 transition-colors leading-tight">{camp.name}</h3>
                                </div>
                                <button className="p-2 hover:bg-imi-50 rounded-xl transition-colors">
                                    <MoreVertical size={20} className="text-imi-300" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-imi-50/50 rounded-2xl border border-imi-50/50">
                                    <p className="text-[9px] font-black text-imi-400 uppercase tracking-widest mb-1">CTR</p>
                                    <p className="text-lg font-bold text-imi-900">{camp.ctr}%</p>
                                </div>
                                <div className="p-4 bg-imi-50/50 rounded-2xl border border-imi-50/50">
                                    <p className="text-[9px] font-black text-imi-400 uppercase tracking-widest mb-1">CPA</p>
                                    <p className="text-lg font-bold text-imi-900">R$ {camp.cpa.toFixed(0)}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-imi-400">
                                    <span>Orçamento Utilizado</span>
                                    <span className="text-imi-900">{((camp.spend / camp.budget) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 w-full bg-imi-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((camp.spend / camp.budget) * 100)}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={`h-full rounded-full ${camp.platform === 'google_ads' ? 'bg-blue-500' : 'bg-purple-500'}`}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-imi-300 uppercase">Investido</span>
                                        <span className="text-sm font-bold text-imi-900">R$ {camp.spend.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[10px] font-black text-imi-300 uppercase text-right">Leads</span>
                                        <span className="text-sm font-bold text-imi-900">{camp.conversions}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-imi-50 flex gap-2">
                                <Button className="flex-1 h-12 bg-imi-50 text-imi-900 hover:bg-imi-900 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                                    Detalhes
                                </Button>
                                <Button variant="outline" className="w-12 h-12 p-0 border-imi-100 hover:border-imi-900 rounded-xl flex items-center justify-center">
                                    <ArrowUpRight size={20} />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
