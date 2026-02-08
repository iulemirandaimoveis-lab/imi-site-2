'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Search,
    Sparkles,
    Phone,
    Mail,
    MessageCircle,
    TrendingUp,
    AlertTriangle,
    Clock,
    Target,
    Flame,
    Loader2,
    CheckCircle2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

const supabase = createClient();

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [qualifyingLead, setQualifyingLead] = useState<string | null>(null);

    // Busca leads
    const { data: leads, isLoading, mutate } = useSWR(['leads'], async () => {
        let query = supabase
            .from('leads')
            .select('*')
            .order('ai_score', { ascending: false });

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    });

    const handleQualifyLead = async (leadId: string) => {
        setQualifyingLead(leadId);

        try {
            const response = await fetch('/api/ai/qualify-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_id: leadId,
                    include_interactions: true,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao qualificar lead');
            }

            const result = await response.json();

            toast.success('Lead qualificado com sucesso!', {
                description: `Score: ${result.qualification.score}/100 | Prioridade: ${result.qualification.priority}`,
            });

            await mutate();
        } catch (error: any) {
            toast.error('Erro ao qualificar lead', {
                description: error.message,
            });
        } finally {
            setQualifyingLead(null);
        }
    };

    const filteredLeads = leads?.filter((lead) => {
        const matchesSearch =
            !searchTerm ||
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPriority =
            priorityFilter === 'all' || lead.ai_priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    const priorityConfig = {
        critical: {
            color: 'bg-red-100 text-red-700 border-red-200',
            icon: Flame,
            label: 'Crítico',
        },
        high: {
            color: 'bg-orange-100 text-orange-700 border-orange-200',
            icon: AlertTriangle,
            label: 'Alto',
        },
        medium: {
            color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            icon: Target,
            label: 'Médio',
        },
        low: {
            color: 'bg-blue-100 text-blue-700 border-blue-200',
            icon: Clock,
            label: 'Baixo',
        },
    };

    const stats = {
        total: leads?.length || 0,
        critical: leads?.filter((l) => l.ai_priority === 'critical').length || 0,
        high: leads?.filter((l) => l.ai_priority === 'high').length || 0,
        avgScore: leads?.length
            ? Math.round(leads.reduce((sum, l) => sum + (l.ai_score || 0), 0) / leads.length)
            : 0,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">CRM Prescritivo</h1>
                    <p className="text-imi-500 mt-1">
                        Qualificação automática e sugestões de follow-up com IA
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Total Leads
                        </div>
                        <Target className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-imi-900">{stats.total}</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-red-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-red-400 uppercase tracking-widest">
                            Críticos
                        </div>
                        <Flame className="text-red-500" size={20} />
                    </div>
                    <div className="text-3xl font-black text-red-600">{stats.critical}</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-orange-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                            Alta Prioridade
                        </div>
                        <AlertTriangle className="text-orange-500" size={20} />
                    </div>
                    <div className="text-3xl font-black text-orange-600">{stats.high}</div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-bold text-imi-400 uppercase tracking-widest">
                            Score Médio
                        </div>
                        <TrendingUp className="text-imi-300" size={20} />
                    </div>
                    <div className="text-3xl font-black text-imi-900">{stats.avgScore}</div>
                    <div className="text-xs text-imi-500 mt-1">de 100</div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-soft border border-imi-100">
                <div className="flex gap-4 flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-400"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Buscar por nome ou email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border-imi-200 focus:ring-accent-500 focus:border-accent-500"
                            />
                        </div>
                    </div>

                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="px-4 py-2 rounded-xl border-imi-200 focus:ring-accent-500 focus:border-accent-500"
                    >
                        <option value="all">Todas Prioridades</option>
                        <option value="critical">Crítico</option>
                        <option value="high">Alto</option>
                        <option value="medium">Médio</option>
                        <option value="low">Baixo</option>
                    </select>
                </div>
            </div>

            {/* Leads List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-center py-12">
                        <Loader2 className="animate-spin mx-auto text-imi-400 mb-4" size={40} />
                        <p className="text-imi-500">Carregando leads...</p>
                    </div>
                ) : filteredLeads && filteredLeads.length > 0 ? (
                    filteredLeads.map((lead, i) => {
                        const priority = lead.ai_priority || 'medium';
                        const PriorityIcon = priorityConfig[priority]?.icon || Target;

                        return (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`bg-white rounded-2xl p-6 shadow-soft border ${priorityConfig[priority]?.color || 'border-imi-100'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Priority Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${priorityConfig[priority]?.color
                                            }`}
                                    >
                                        <PriorityIcon size={24} />
                                    </div>

                                    {/* Lead Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-imi-900 text-lg">
                                                    {lead.name}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-imi-600">
                                                    {lead.email && (
                                                        <span className="flex items-center gap-1">
                                                            <Mail size={14} />
                                                            {lead.email}
                                                        </span>
                                                    )}
                                                    {lead.phone && (
                                                        <span className="flex items-center gap-1">
                                                            <Phone size={14} />
                                                            {lead.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xs font-bold text-imi-400 uppercase mb-1">
                                                    Score IA
                                                </div>
                                                <div
                                                    className={`text-3xl font-black ${(lead.ai_score || 0) >= 80
                                                            ? 'text-green-600'
                                                            : (lead.ai_score || 0) >= 60
                                                                ? 'text-yellow-600'
                                                                : 'text-imi-600'
                                                        }`}
                                                >
                                                    {lead.ai_score || '—'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* AI Analysis */}
                                        {lead.ai_qualification ? (
                                            <div className="bg-white/50 rounded-xl p-4 mb-4">
                                                <div className="text-xs font-bold text-imi-700 uppercase mb-2">
                                                    Análise Claude
                                                </div>
                                                <p className="text-sm text-imi-700 mb-3">
                                                    {lead.ai_qualification.summary}
                                                </p>

                                                {lead.ai_next_action && (
                                                    <div className="flex items-start gap-2 text-sm">
                                                        <Target className="text-accent-600 mt-0.5" size={16} />
                                                        <div>
                                                            <div className="font-bold text-imi-900">
                                                                Próxima Ação:
                                                            </div>
                                                            <div className="text-imi-700">
                                                                {lead.ai_next_action}
                                                            </div>
                                                            {lead.ai_next_action_deadline && (
                                                                <div className="text-xs text-imi-500 mt-1">
                                                                    Prazo:{' '}
                                                                    {formatDistanceToNow(
                                                                        new Date(lead.ai_next_action_deadline),
                                                                        {
                                                                            addSuffix: true,
                                                                            locale: ptBR,
                                                                        }
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
                                                <p className="text-sm text-blue-800">
                                                    <Sparkles size={14} className="inline mr-1" />
                                                    Lead ainda não foi qualificado com IA. Clique em "Qualificar com IA" para análise automática.
                                                </p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-accent-600 hover:bg-accent-700"
                                                onClick={() => handleQualifyLead(lead.id)}
                                                disabled={qualifyingLead === lead.id}
                                            >
                                                {qualifyingLead === lead.id ? (
                                                    <>
                                                        <Loader2 className="mr-2 animate-spin" size={14} />
                                                        Qualificando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={14} className="mr-2" />
                                                        {lead.ai_qualification ? 'Requalificar' : 'Qualificar com IA'}
                                                    </>
                                                )}
                                            </Button>

                                            {lead.phone && (
                                                <Button variant="outline" size="sm">
                                                    <Phone size={14} className="mr-2" />
                                                    Ligar
                                                </Button>
                                            )}

                                            <Button variant="outline" size="sm">
                                                <MessageCircle size={14} className="mr-2" />
                                                WhatsApp
                                            </Button>

                                            {lead.email && (
                                                <Button variant="outline" size="sm">
                                                    <Mail size={14} className="mr-2" />
                                                    Email
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-soft border border-imi-100">
                        <Target className="mx-auto text-imi-300 mb-4" size={64} />
                        <h3 className="text-xl font-bold text-imi-900 mb-2">
                            Nenhum lead encontrado
                        </h3>
                        <p className="text-imi-600">
                            {searchTerm || priorityFilter !== 'all'
                                ? 'Tente ajustar os filtros de busca'
                                : 'Quando você receber leads, eles aparecerão aqui'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
