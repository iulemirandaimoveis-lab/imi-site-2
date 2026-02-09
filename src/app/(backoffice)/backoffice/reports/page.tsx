'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import { FileText, Plus, Loader2, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const supabase = createClient();

export default function ReportsPage() {
    const [generating, setGenerating] = useState(false);

    const { data: reports, isLoading, mutate } = useSWR(['reports'], async () => {
        const { data, error } = await supabase
            .from('executive_reports')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        return data || [];
    });

    const handleGenerateReport = async (type: 'weekly' | 'monthly') => {
        setGenerating(true);

        try {
            // Calcula período
            const today = new Date();
            const daysBack = type === 'weekly' ? 7 : 30;
            const start = new Date(today);
            start.setDate(today.getDate() - daysBack);

            const response = await fetch('/api/reports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    report_type: type,
                    period_start: start.toISOString().split('T')[0],
                    period_end: today.toISOString().split('T')[0],
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao gerar relatório');
            }

            toast.success('Relatório gerado com sucesso!');
            await mutate();
        } catch (error: any) {
            toast.error('Erro ao gerar relatório', {
                description: error.message,
            });
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">
                        Relatórios Executivos
                    </h1>
                    <p className="text-imi-500 mt-1">
                        Análises consolidadas com insights e recomendações da IA
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleGenerateReport('weekly')}
                        disabled={generating}
                    >
                        {generating ? (
                            <Loader2 className="animate-spin mr-2" size={16} />
                        ) : (
                            <Plus size={16} className="mr-2" />
                        )}
                        Relatório Semanal
                    </Button>
                    <Button
                        className="bg-accent-600 hover:bg-accent-700"
                        onClick={() => handleGenerateReport('monthly')}
                        disabled={generating}
                    >
                        {generating ? (
                            <Loader2 className="animate-spin mr-2" size={16} />
                        ) : (
                            <Plus size={16} className="mr-2" />
                        )}
                        Relatório Mensal
                    </Button>
                </div>
            </div>

            {/* Reports List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <Loader2 className="animate-spin mx-auto text-imi-400 mb-4" size={40} />
                    <p className="text-imi-500">Carregando relatórios...</p>
                </div>
            ) : reports && reports.length > 0 ? (
                <div className="space-y-4">
                    {reports.map((report, i) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white rounded-2xl p-6 shadow-soft border border-imi-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                                    <FileText className="text-accent-600" size={24} />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="font-bold text-imi-900 text-lg">
                                                Relatório {report.report_type === 'weekly' ? 'Semanal' : 'Mensal'}
                                            </h3>
                                            <p className="text-sm text-imi-500">
                                                {new Date(report.period_start).toLocaleDateString('pt-BR')} -{' '}
                                                {new Date(report.period_end).toLocaleDateString('pt-BR')}
                                            </p>
                                        </div>
                                        <span className="text-xs text-imi-400">
                                            {new Date(report.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <p className="text-imi-700 mb-4">{report.summary}</p>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-4 gap-4 mb-4">
                                        <div className="bg-imi-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Target size={14} className="text-imi-500" />
                                                <span className="text-xs text-imi-600">Posts</span>
                                            </div>
                                            <p className="text-lg font-bold text-imi-900">
                                                {report.metrics?.content?.posts_published || 0}
                                            </p>
                                        </div>

                                        <div className="bg-imi-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp size={14} className="text-imi-500" />
                                                <span className="text-xs text-imi-600">Alcance</span>
                                            </div>
                                            <p className="text-lg font-bold text-imi-900">
                                                {(report.metrics?.content?.total_reach || 0).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="bg-imi-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users size={14} className="text-imi-500" />
                                                <span className="text-xs text-imi-600">Leads</span>
                                            </div>
                                            <p className="text-lg font-bold text-imi-900">
                                                {report.metrics?.crm?.new_leads || 0}
                                            </p>
                                        </div>

                                        <div className="bg-imi-50 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <DollarSign size={14} className="text-imi-500" />
                                                <span className="text-xs text-imi-600">Investimento</span>
                                            </div>
                                            <p className="text-lg font-bold text-imi-900">
                                                R$ {(report.metrics?.ads?.total_spend || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Insights */}
                                    {report.insights && report.insights.length > 0 && (
                                        <div className="mb-3">
                                            <h4 className="text-sm font-bold text-imi-900 mb-2">Principais Insights:</h4>
                                            <ul className="space-y-1">
                                                {report.insights.slice(0, 3).map((insight: string, idx: number) => (
                                                    <li key={idx} className="text-sm text-imi-600 flex items-start gap-2">
                                                        <span className="text-accent-600 mt-1">•</span>
                                                        <span>{insight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Recommendations */}
                                    {report.recommendations && report.recommendations.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-bold text-imi-900 mb-2">Recomendações:</h4>
                                            <ul className="space-y-1">
                                                {report.recommendations.slice(0, 2).map((rec: string, idx: number) => (
                                                    <li key={idx} className="text-sm text-imi-600 flex items-start gap-2">
                                                        <span className="text-green-600 mt-1">→</span>
                                                        <span>{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-imi-100">
                    <FileText className="mx-auto text-imi-300 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-imi-900 mb-2">
                        Nenhum relatório gerado
                    </h3>
                    <p className="text-imi-600 mb-6">
                        Gere seu primeiro relatório executivo com análise da IA
                    </p>
                    <Button
                        className="bg-accent-600 hover:bg-accent-700"
                        onClick={() => handleGenerateReport('weekly')}
                    >
                        <Plus size={16} className="mr-2" />
                        Gerar Relatório Semanal
                    </Button>
                </div>
            )}
        </div>
    );
}
