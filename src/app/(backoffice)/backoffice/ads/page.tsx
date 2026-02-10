'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, TrendingUp, TrendingDown, DollarSign, Target, MousePointerClick, RefreshCw, X } from 'lucide-react'
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
    created_at: string
}

export default function AdsPage() {
    const { toasts, showToast, removeToast } = useToast()

    // Dados Mockados para Demonstração (Simulando API Real)
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        { id: '1', name: 'Lançamento Ocean View', platform: 'meta_ads', status: 'active', budget: 5000, spend: 3450.50, impressions: 125000, clicks: 3420, conversions: 48, created_at: new Date().toISOString() },
        { id: '2', name: 'Google Search - Alto Padrão', platform: 'google_ads', status: 'active', budget: 8000, spend: 6200.00, impressions: 45000, clicks: 1890, conversions: 32, created_at: new Date().toISOString() },
        { id: '3', name: 'Retargeting Instagram', platform: 'meta_ads', status: 'paused', budget: 2000, spend: 1850.20, impressions: 89000, clicks: 950, conversions: 12, created_at: new Date().toISOString() },
    ])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSyncing, setIsSyncing] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        platform: 'google_ads',
        budget: 0,
        status: 'active'
    })

    // Métricas Consolidadas
    const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0)
    const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0)
    const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0)
    const avgCpa = totalConversions > 0 ? totalSpend / totalConversions : 0
    const avgCtr = totalClicks > 0 ? (totalClicks / campaigns.reduce((acc, c) => acc + c.impressions, 0)) * 100 : 0

    async function handleSync() {
        setIsSyncing(true)
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 2000))
        showToast('Dados sincronizados com sucesso!', 'success')
        setIsSyncing(false)
    }

    function handleCreateCampaign(e: React.FormEvent) {
        e.preventDefault()

        if (!formData.name || formData.budget <= 0) {
            showToast('Preencha os dados corretamente', 'error')
            return
        }

        const newCampaign: Campaign = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            platform: formData.platform as any,
            status: formData.status as any,
            budget: Number(formData.budget),
            spend: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0,
            created_at: new Date().toISOString()
        }

        setCampaigns([newCampaign, ...campaigns])
        showToast('Campanha criada manualmente', 'success')
        setIsModalOpen(false)
        setFormData({ name: '', platform: 'google_ads', budget: 0, status: 'active' })
    }

    function getPlatformColor(platform: string) {
        switch (platform) {
            case 'google_ads': return 'text-blue-600 bg-blue-50 border-blue-200'
            case 'meta_ads': return 'text-purple-600 bg-purple-50 border-purple-200'
            default: return 'text-slate-600 bg-slate-50 border-slate-200'
        }
    }

    return (
        <div className="p-8">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900">Anúncios & Performance</h1>
                    <p className="text-slate-600 mt-1">Gestão unificada de Google e Meta Ads</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Sincronizando...' : 'Sincronizar Dados'}
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Campanha
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Investimento Total</span>
                        <div className="p-2 bg-blue-50 rounded-lg"><DollarSign className="w-5 h-5 text-blue-600" /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-imi-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSpend)}
                    </h3>
                    <p className="text-xs text-green-600 flex items-center mt-2 font-medium">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12% vs. mês anterior
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Conversões (Leads)</span>
                        <div className="p-2 bg-purple-50 rounded-lg"><Target className="w-5 h-5 text-purple-600" /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-imi-900">{totalConversions}</h3>
                    <p className="text-xs text-slate-500 mt-2">CPA Médio: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgCpa)}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Cliques</span>
                        <div className="p-2 bg-green-50 rounded-lg"><MousePointerClick className="w-5 h-5 text-green-600" /></div>
                    </div>
                    <h3 className="text-3xl font-bold text-imi-900">{totalClicks.toLocaleString()}</h3>
                    <p className="text-xs text-slate-500 mt-2">CTR Médio: {avgCtr.toFixed(2)}%</p>
                </div>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <h3 className="font-bold text-imi-900">Campanhas Ativas</h3>
                    <span className="text-xs text-slate-500">Última atualização: Hoje, 09:30</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Nome da Campanha</th>
                                <th className="px-6 py-4">Plataforma</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Investimento</th>
                                <th className="px-6 py-4 text-right">Conv.</th>
                                <th className="px-6 py-4 text-right">CPA</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {campaigns.map((camp) => (
                                <tr key={camp.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-imi-900">{camp.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getPlatformColor(camp.platform)}`}>
                                            {camp.platform.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 ${camp.status === 'active' ? 'text-green-600 font-medium' : 'text-slate-400'}`}>
                                            <span className={`w-2 h-2 rounded-full ${camp.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                            {camp.status === 'active' ? 'Ativa' : 'Pausada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-slate-700">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(camp.spend)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-imi-900 bg-slate-50/50">
                                        {camp.conversions}
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">
                                        {camp.conversions > 0
                                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(camp.spend / camp.conversions)
                                            : '-'
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-imi-900">Nova Campanha Manual</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
                            <Input
                                label="Nome da Campanha"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                            <div>
                                <label className="block text-sm font-semibold text-imi-900 mb-2">Plataforma</label>
                                <select
                                    value={formData.platform}
                                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                                    className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-imi-900"
                                >
                                    <option value="google_ads">Google Ads</option>
                                    <option value="meta_ads">Meta Ads (Facebook/Instagram)</option>
                                    <option value="linkedin_ads">LinkedIn Ads</option>
                                    <option value="tiktok_ads">TikTok Ads</option>
                                </select>
                            </div>
                            <Input
                                label="Orçamento Mensal (R$)"
                                type="number"
                                value={formData.budget}
                                onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                                required
                            />
                            <div className="pt-4 flex gap-3">
                                <Button type="submit" className="flex-1">Criar Campanha</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
