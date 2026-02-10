'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Plus, Loader2, TrendingUp, DollarSign, Users, Target, Calendar, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import Toast, { useToast } from '@/components/ui/Toast'

interface Report {
    id: string
    report_type: 'weekly' | 'monthly'
    period_start: string
    period_end: string
    summary: string
    metrics: any
    insights: string[]
    recommendations: string[]
    created_at: string
}

export default function ReportsPage() {
    const supabase = createClient()
    const { toasts, showToast, removeToast } = useToast()

    // Dados Mockados para Demonstração (Enquanto API não responde)
    const [reports, setReports] = useState<Report[]>([
        {
            id: '1',
            report_type: 'weekly',
            period_start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            period_end: new Date().toISOString(),
            summary: 'Desempenho estável com aumento de 15% nos leads qualificados.',
            metrics: { crm: { new_leads: 12 }, ads: { total_spend: 1250 } },
            insights: ['Custo por Lead caiu 5%', 'Melhor horário de conversão: 14h-16h'],
            recommendations: ['Aumentar budget em Meta Ads', 'Revisar copy do anúncio 2'],
            created_at: new Date().toISOString()
        }
    ])

    const [isGenerating, setIsGenerating] = useState(false)

    async function handleGenerateReport(type: 'weekly' | 'monthly') {
        setIsGenerating(true)

        // Simulação de geração de relatório (Delay de 3s)
        await new Promise(resolve => setTimeout(resolve, 3000))

        const newReport: Report = {
            id: Math.random().toString(36).substr(2, 9),
            report_type: type,
            period_start: new Date(Date.now() - (type === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000).toISOString(),
            period_end: new Date().toISOString(),
            summary: `Relatório ${type === 'weekly' ? 'Semanal' : 'Mensal'} gerado automaticamente pela IA. Análise completa de métricas de conversão e tráfego.`,
            metrics: {
                crm: { new_leads: Math.floor(Math.random() * 50) + 10 },
                ads: { total_spend: Math.floor(Math.random() * 5000) + 1000 }
            },
            insights: [
                'Taxa de conversão acima da média do mercado',
                'Público de 25-34 anos com maior engajamento',
                'Imóveis de alto padrão com maior procura no fim de semana'
            ],
            recommendations: [
                'Focar em criativos de vídeo para o próximo ciclo',
                'Criar campanha de remarketing para visitantes do site',
                'Agendar posts para horários de pico identificados'
            ],
            created_at: new Date().toISOString()
        }

        setReports([newReport, ...reports])
        showToast(`Relatório ${type === 'weekly' ? 'Semanal' : 'Mensal'} gerado com sucesso!`, 'success')
        setIsGenerating(false)
    }

    return (
        <div className="p-8">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900">Relatórios Executivos</h1>
                    <p className="text-slate-600 mt-1">Inteligência Artificial aplicada aos seus dados</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => handleGenerateReport('weekly')} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                        Relatório Semanal
                    </Button>
                    <Button onClick={() => handleGenerateReport('monthly')} disabled={isGenerating}>
                        {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Calendar className="w-4 h-4 mr-2" />}
                        Relatório Mensal
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {reports.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-imi-900">Nenhum relatório disponível</h3>
                        <p className="text-slate-500 mb-6">Gere seu primeiro relatório para desbloquear insights valiosos.</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Header do Relatório */}
                                <div className="md:w-1/4 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-imi-50 rounded-lg">
                                            <FileText className="w-6 h-6 text-imi-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-imi-900 text-lg capitalize">
                                                {report.report_type === 'weekly' ? 'Relatório Semanal' : 'Relatório Mensal'}
                                            </h3>
                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                                {new Date(report.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-4">
                                        Período: {new Date(report.period_start).toLocaleDateString()} - {new Date(report.period_end).toLocaleDateString()}
                                    </p>
                                    <Button size="sm" variant="outline" className="w-full">
                                        <Download className="w-4 h-4 mr-2" /> Baixar PDF
                                    </Button>
                                </div>

                                {/* Conteúdo Principal */}
                                <div className="flex-1">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-slate-50 p-3 rounded-lg">
                                            <span className="text-xs text-slate-500 block mb-1">Novos Leads</span>
                                            <span className="text-xl font-bold text-imi-900 flex items-center gap-1">
                                                <Users className="w-4 h-4 text-blue-500" /> {report.metrics?.crm?.new_leads}
                                            </span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg">
                                            <span className="text-xs text-slate-500 block mb-1">Investimento</span>
                                            <span className="text-xl font-bold text-imi-900 flex items-center gap-1">
                                                <DollarSign className="w-4 h-4 text-green-500" /> R$ {report.metrics?.ads?.total_spend}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="font-bold text-imi-900 mb-2 flex items-center gap-2">
                                            <Target className="w-4 h-4 text-imi-500" /> Insights da IA
                                        </h4>
                                        <ul className="space-y-2">
                                            {report.insights.map((insight, idx) => (
                                                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2 bg-blue-50/50 p-2 rounded">
                                                    <span className="text-blue-500 font-bold">•</span>
                                                    {insight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-imi-900 mb-2 flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-green-600" /> Recomendações
                                        </h4>
                                        <ul className="space-y-2">
                                            {report.recommendations.map((rec, idx) => (
                                                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2 bg-green-50/50 p-2 rounded">
                                                    <span className="text-green-500 font-bold">→</span>
                                                    {rec}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
