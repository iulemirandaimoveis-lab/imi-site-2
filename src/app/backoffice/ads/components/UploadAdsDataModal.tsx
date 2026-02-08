'use client';

import { useState } from 'react';
import { Upload, X, FileSpreadsheet, Sparkles, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

interface UploadAdsDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenantId: string;
    onAnalysisComplete: () => void;
}

export default function UploadAdsDataModal({
    isOpen,
    onClose,
    tenantId,
    onAnalysisComplete,
}: UploadAdsDataModalProps) {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [campaignName, setCampaignName] = useState('');
    const [platform, setPlatform] = useState<'google_ads' | 'meta_ads'>('google_ads');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const parseCSV = (text: string): any[] => {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());

        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const row: any = {};

            headers.forEach((header, index) => {
                const value = values[index]?.trim();
                row[header] = value;
            });

            // Mapeia campos comuns
            data.push({
                date: row.date || row.day || row.data,
                impressions: parseInt(row.impressions || row.impressões || '0'),
                clicks: parseInt(row.clicks || row.cliques || '0'),
                conversions: parseInt(row.conversions || row.conversões || row.conversoes || '0'),
                spend: parseFloat(row.spend || row.cost || row.custo || row.investimento || '0'),
                revenue: parseFloat(row.revenue || row.receita || '0'),
            });
        }

        return data;
    };

    const handleUpload = async () => {
        if (!file || !campaignName) {
            toast.error('Preencha o nome da campanha e selecione um arquivo');
            return;
        }

        setUploading(true);

        try {
            // Lê arquivo CSV
            const text = await file.text();
            const metrics = parseCSV(text);

            if (metrics.length === 0) {
                throw new Error('Nenhum dado encontrado no CSV');
            }

            // Cria conta mockada se não existir
            let { data: account } = await supabase
                .from('ads_accounts')
                .select('id')
                .eq('tenant_id', tenantId)
                .eq('platform', platform)
                .eq('account_name', 'Upload Manual CSV')
                .single();

            if (!account) {
                const { data: newAccount } = await supabase
                    .from('ads_accounts')
                    .insert({
                        tenant_id: tenantId,
                        platform,
                        account_id: `manual_${Date.now()}`,
                        account_name: 'Upload Manual CSV',
                        currency: 'BRL',
                        status: 'active',
                    })
                    .select('id')
                    .single();

                account = newAccount;
            }

            if (!account) {
                throw new Error('Erro ao criar conta');
            }

            // Cria campanha
            const { data: campaign } = await supabase
                .from('ads_campaigns')
                .insert({
                    tenant_id: tenantId,
                    ads_account_id: account.id,
                    campaign_id: `csv_${Date.now()}`,
                    campaign_name: campaignName,
                    platform,
                    status: 'active',
                    objective: 'Análise de dados históricos',
                })
                .select()
                .single();

            if (!campaign) {
                throw new Error('Erro ao criar campanha');
            }

            // Insere métricas
            for (const metric of metrics) {
                const ctr = metric.impressions > 0 ? (metric.clicks / metric.impressions) * 100 : 0;
                const cpa = metric.conversions > 0 ? metric.spend / metric.conversions : 0;
                const roas = metric.spend > 0 ? metric.revenue / metric.spend : 0;

                await supabase.from('ads_metrics').insert({
                    campaign_id: campaign.id,
                    ads_account_id: account.id,
                    tenant_id: tenantId,
                    date: metric.date,
                    impressions: metric.impressions || 0,
                    clicks: metric.clicks || 0,
                    ctr: ctr || 0,
                    conversions: metric.conversions || 0,
                    conversion_rate:
                        metric.clicks > 0 ? (metric.conversions / metric.clicks) * 100 : 0,
                    spend: metric.spend || 0,
                    cpc: metric.clicks > 0 ? metric.spend / metric.clicks : 0,
                    cpa: cpa || 0,
                    revenue: metric.revenue || 0,
                    roas: roas || 0,
                });
            }

            toast.success('Dados importados com sucesso!');
            setUploading(false);

            // Inicia análise automática
            setAnalyzing(true);

            const response = await fetch('/api/ai/analyze-campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenant_id: tenantId,
                    campaign_id: campaign.id,
                    start_date: metrics[0].date,
                    end_date: metrics[metrics.length - 1].date,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao analisar campanha');
            }

            const result = await response.json();

            toast.success('Análise concluída!', {
                description: `${result.insights.length} insights encontrados`,
            });

            onAnalysisComplete();
            onClose();
        } catch (error: any) {
            toast.error('Erro ao processar arquivo', {
                description: error.message,
            });
        } finally {
            setUploading(false);
            setAnalyzing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-imi-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-imi-900">Analisar Dados com IA</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-imi-50 rounded-lg transition-colors"
                        disabled={uploading || analyzing}
                    >
                        <X size={20} className="text-imi-500" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-imi-700 mb-2">
                            Nome da Campanha
                        </label>
                        <input
                            type="text"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="Ex: Black Friday 2024"
                            className="w-full px-4 py-3 rounded-xl border-imi-200 focus:ring-accent-500 focus:border-accent-500"
                            disabled={uploading || analyzing}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-imi-700 mb-2">
                            Plataforma
                        </label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value as any)}
                            className="w-full px-4 py-3 rounded-xl border-imi-200 focus:ring-accent-500 focus:border-accent-500"
                            disabled={uploading || analyzing}
                        >
                            <option value="google_ads">Google Ads</option>
                            <option value="meta_ads">Meta Ads (Facebook/Instagram)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-imi-700 mb-2">
                            Arquivo CSV
                        </label>
                        <div className="border-2 border-dashed border-imi-200 rounded-xl p-6 text-center hover:border-accent-300 transition-colors">
                            <FileSpreadsheet className="mx-auto text-imi-300 mb-3" size={48} />
                            <input
                                type="file"
                                accept=".csv,.txt"
                                onChange={handleFileChange}
                                className="hidden"
                                id="csv-upload"
                                disabled={uploading || analyzing}
                            />
                            <label
                                htmlFor="csv-upload"
                                className="cursor-pointer text-accent-600 font-medium hover:underline"
                            >
                                {file ? file.name : 'Selecionar arquivo CSV'}
                            </label>
                            <p className="text-xs text-imi-400 mt-2">
                                Formato: date,impressions,clicks,conversions,spend,revenue
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                            <Sparkles className="text-blue-600 mt-0.5" size={20} />
                            <div className="text-sm text-blue-800">
                                <p className="font-bold mb-1">Claude vai analisar automaticamente:</p>
                                <ul className="text-xs space-y-0.5 ml-4">
                                    <li>• CPA vs benchmark do mercado</li>
                                    <li>• Desperdício de orçamento</li>
                                    <li>• Oportunidades de otimização</li>
                                    <li>• Sugestões prescritivas de ação</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                        disabled={uploading || analyzing}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="flex-1 bg-accent-600 hover:bg-accent-700"
                        onClick={handleUpload}
                        disabled={uploading || analyzing || !file || !campaignName}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" size={16} />
                                Importando...
                            </>
                        ) : analyzing ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" size={16} />
                                Analisando com IA...
                            </>
                        ) : (
                            <>
                                <Upload size={16} className="mr-2" />
                                Importar e Analisar
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
