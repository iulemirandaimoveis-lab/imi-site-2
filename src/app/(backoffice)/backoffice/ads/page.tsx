'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    TrendingDown,
    TrendingUp,
    DollarSign,
    Target,
    Users,
    AlertTriangle,
    Eye,
    MousePointerClick,
    ShoppingCart,
    Sparkles,
    RefreshCw,
    Plus,
    Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import UploadAdsDataModal from './components/UploadAdsDataModal';

const supabase = createClient();

export default function AdsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('30d');
    const [syncing, setSyncing] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    // Busca contas conectadas
    const { data: accounts, isLoading, mutate } = useSWR(['ads-accounts'], async () => {
        const { data, error } = await supabase
            .from('ads_accounts')
            .select('*')
            .eq('status', 'active');

        if (error) throw error;
        return data || [];
    });

    // Se não há contas, mostra dados demo
    const hasAccounts = accounts && accounts.length > 0;

    // Dados mockados para demonstração
    const mockStats = {
        total_spend: 15847.50,
        total_revenue: 45230.00,
        total_conversions: 234,
        total_clicks: 8542,
        avg_ctr: 3.42,
        avg_cpa: 67.73,
        roas: 2.85,
    };

    const mockInsights = [
        {
            id: '1',
            severity: 'critical' as const,
            title: 'CPA 45% acima do benchmark',
            description: 'Campanha "Imóveis Luxo SP" com CPA de R$ 125, benchmark do nicho: R$ 86',
            estimated_impact: 3250,
            recommendations: [
                'Refinar segmentação de público (excluir localizações de baixa conversão)',
                'Testar novos criativos com foco em benefícios',
                'Ajustar lances automáticos para CPA alvo de R$ 90'
            ],
        },
        {
            id: '2',
            severity: 'high' as const,
            title: 'Desperdício de orçamento identificado',
            description: '22% do budget em palavras-chave com 0 conversões (últimos 14 dias)',
            estimated_impact: 2100,
            recommendations: [
                'Pausar 8 palavras-chave de baixa performance',
                'Realocar budget para termos de alta conversão',
                'Implementar negativas para queries irrelevantes'
            ],
        },
        {
            id: '3',
            severity: 'medium' as const,
            title: 'Fadiga de público detectada',
            description: 'Campanha Instagram: frequência de 5.8x, CTR caiu 40% em 7 dias',
            estimated_impact: 1500,
            recommendations: [
                'Expandir públicos semelhantes (Lookalike 2-3%)',
                'Criar novos criativos (3 variações mínimo)',
                'Reduzir frequência máxima para 3x/semana'
            ],
        },
    ];

    const mockCampaigns = [
        {
            id: '1',
            name: 'Imóveis Luxo - São Paulo',
            platform: 'google_ads' as const,
            spend: 5420,
            conversions: 42,
            cpa: 129.05,
            roas: 3.2,
            status: 'active' as const,
        },
        {
            id: '2',
            name: 'Leads Qualificados - Facebook',
            platform: 'meta_ads' as const,
            spend: 3200,
            conversions: 68,
            cpa: 47.06,
            roas: 2.8,
            status: 'active' as const,
        },
        {
            id: '3',
            name: 'Retargeting - Instagram',
            platform: 'meta_ads' as const,
            spend: 1850,
            conversions: 35,
            cpa: 52.86,
            roas: 4.1,
            status: 'active' as const,
        },
    ];

    const severityColors = {
        critical: 'bg-red-100 text-red-700 border-red-200',
        high: 'bg-orange-100 text-orange-700 border-orange-200',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        low: 'bg-blue-100 text-blue-700 border-blue-200',
        info: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    const severityIcons = {
        critical: AlertTriangle,
        high: TrendingDown,
        medium: Target,
        low: Eye,
        info: Sparkles,
    };

    const platformColors = {
        google_ads: 'bg-blue-500',
        meta_ads: 'bg-purple-500',
        linkedin_ads: 'bg-cyan-500',
        tiktok_ads: 'bg-pink-500',
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">Anúncios</h1>
                    <p className="text-imi-500 mt-1">
                        Dashboard consolidado Google Ads + Meta Ads
                    </p>
                </div>

                <div className="flex gap-2">
                    {hasAccounts ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setSyncing(true)}
                                disabled={syncing}
                            >
                                <RefreshCw
                                    size={16}
                                    className={`mr-2 ${syncing ? 'animate-spin' : ''}`}
                                />
                                {syncing ? 'Sincronizando...' : 'Sincronizar'}
                            </Button>
                            <Button className="bg-accent-600 hover:bg-accent-700">
                                <Plus size={16} className="mr-2" />
                                Conectar Conta
                            </Button>
                        </>
                    ) : (
                        <Button className="bg-accent-600 hover:bg-accent-700">
                            <Plus size={16} className="mr-2" />
                            Conectar Primeira Conta
                        </Button>
                    )}
                </div>
            </div>

            {/* Empty State OU Dashboard */}
            {!hasAccounts ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100 text-center">
                    <div className="max-w-2xl mx-auto">
                        <Zap className="mx-auto text-accent-600 mb-6" size={64} />
                        <h2 className="text-2xl font-bold text-imi-900 mb-4">
                            Conecte suas contas de anúncios
                        </h2>
                        <p className="text-imi-600 mb-8">
                            Conecte Google Ads e Meta Ads para receber análises automáticas,
                            identificar desperdícios e otimizar suas campanhas com IA.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6">
                                <TrendingDown className="text-red-500 mx-auto mb-4" size={32} />
                                <h3 className="font-bold text-imi-900 mb-2">Identifique Desperdícios</h3>
                                <p className="text-sm text-imi-600">
                                    IA analisa CPA, CTR e ROAS para encontrar budget mal alocado
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6">
                                <Sparkles className="text-purple-500 mx-auto mb-4" size={32} />
                                <h3 className="font-bold text-imi-900 mb-2">Sugestões Prescritivas</h3>
                                <p className="text-sm text-imi-600">
                                    Claude analisa dados e sugere ajustes específicos
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6">
                                <Target className="text-green-500 mx-auto mb-4" size={32} />
                                <h3 className="font-bold text-imi-900 mb-2">Otimização Contínua</h3>
                                <p className="text-sm text-imi-600">
                                    Análise diária automática de todas as campanhas
                                </p>
                            </div>
                        </div>

                        <Button size="lg" className="bg-accent-600 hover:bg-accent-700">
                            <Plus size={20} className="mr-2" />
                            Conectar Google Ads ou Meta Ads
                        </Button>

                        <p className="text-xs text-imi-400 mt-6">
                            Abaixo você verá dados de demonstração. Conecte suas contas para dados reais.
                        </p>
                    </div>
                </div>
            ) : null}

            {/* Stats Cards (sempre mostra) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Investimento
                        </div>
                        <DollarSign className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-imi-900">
                        {formatCurrency(mockStats.total_spend)}
                    </div>
                    <div className="text-xs text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp size={12} />
                        +12% vs mês anterior
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Receita
                        </div>
                        <ShoppingCart className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-green-600">
                        {formatCurrency(mockStats.total_revenue)}
                    </div>
                    <div className="text-xs text-imi-500 mt-2">
                        ROAS: {mockStats.roas.toFixed(2)}x
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Conversões
                        </div>
                        <Target className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-imi-900">
                        {mockStats.total_conversions}
                    </div>
                    <div className="text-xs text-imi-500 mt-2">
                        CPA: {formatCurrency(mockStats.avg_cpa)}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Cliques
                        </div>
                        <MousePointerClick className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-imi-900">
                        {mockStats.total_clicks.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-imi-500 mt-2">
                        CTR: {mockStats.avg_ctr}%
                    </div>
                </div>
            </div>

            {/* Insights IA */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-imi-900">
                        Insights & Oportunidades
                    </h2>
                    <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                        <Sparkles size={14} className="mr-2" />
                        Analisar Dados CSV com IA
                    </Button>
                </div>

                <div className="space-y-3">
                    {mockInsights.map((insight, i) => {
                        const SeverityIcon = severityIcons[insight.severity];

                        return (
                            <motion.div
                                key={insight.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-white rounded-2xl p-6 shadow-soft border ${severityColors[insight.severity]
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${severityColors[insight.severity]
                                            }`}
                                    >
                                        <SeverityIcon size={24} />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-imi-900">
                                                    {insight.title}
                                                </h3>
                                                <p className="text-sm text-imi-600 mt-1">
                                                    {insight.description}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-imi-400 uppercase">
                                                    Economia potencial
                                                </div>
                                                <div className="text-xl font-black text-green-600">
                                                    {formatCurrency(insight.estimated_impact)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/50 rounded-xl p-4 mt-4">
                                            <div className="text-xs font-bold text-imi-700 uppercase mb-2">
                                                Recomendações Claude
                                            </div>
                                            <ul className="space-y-2">
                                                {insight.recommendations.map((rec, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-sm text-imi-700 flex items-start gap-2"
                                                    >
                                                        <span className="text-accent-600 mt-0.5">
                                                            •
                                                        </span>
                                                        {rec}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                Aplicar Sugestões
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                Ver Detalhes
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Campanhas */}
            <div>
                <h2 className="text-xl font-bold text-imi-900 mb-4">Campanhas Ativas</h2>
                <div className="bg-white rounded-2xl shadow-soft border border-imi-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-imi-50 border-b border-imi-100">
                            <tr>
                                <th className="text-left p-4 text-xs font-bold text-imi-600 uppercase tracking-wider">
                                    Campanha
                                </th>
                                <th className="text-right p-4 text-xs font-bold text-imi-600 uppercase tracking-wider">
                                    Investimento
                                </th>
                                <th className="text-right p-4 text-xs font-bold text-imi-600 uppercase tracking-wider">
                                    Conversões
                                </th>
                                <th className="text-right p-4 text-xs font-bold text-imi-600 uppercase tracking-wider">
                                    CPA
                                </th>
                                <th className="text-right p-4 text-xs font-bold text-imi-600 uppercase tracking-wider">
                                    ROAS
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-imi-100">
                            {mockCampaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-imi-50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-2 h-10 rounded-full ${platformColors[campaign.platform]
                                                    }`}
                                            />
                                            <div>
                                                <div className="font-bold text-imi-900">
                                                    {campaign.name}
                                                </div>
                                                <div className="text-xs text-imi-400 uppercase tracking-wider">
                                                    {campaign.platform.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right font-bold text-imi-900">
                                        {formatCurrency(campaign.spend)}
                                    </td>
                                    <td className="p-4 text-right font-bold text-imi-900">
                                        {campaign.conversions}
                                    </td>
                                    <td className="p-4 text-right font-medium text-imi-700">
                                        {formatCurrency(campaign.cpa)}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-bold ${campaign.roas >= 3
                                                ? 'bg-green-100 text-green-700'
                                                : campaign.roas >= 2
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {campaign.roas.toFixed(1)}x
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {!hasAccounts && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <p className="text-sm text-blue-800">
                        <span className="font-bold">💡 Estes são dados de demonstração.</span>
                        <br />
                        Conecte suas contas Google Ads e Meta Ads para ver dados reais e receber
                        análises prescritivas personalizadas.
                    </p>
                </div>
            )}

            <UploadAdsDataModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                tenantId="default-tenant-id"
                onAnalysisComplete={() => mutate()}
            />
        </div>
    );
}
