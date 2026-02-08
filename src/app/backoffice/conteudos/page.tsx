'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Calendar as CalendarIcon,
    Plus,
    Sparkles,
    TrendingUp,
    Eye,
    CheckCircle2,
    Clock,
    Loader2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import CreateCalendarModal from './components/CreateCalendarModal';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    draft: 'Rascunho',
    ai_generated: 'IA Gerada',
    approved: 'Aprovado',
    active: 'Ativo',
    archived: 'Arquivado',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    ai_generated: 'bg-blue-100 text-blue-700',
    approved: 'bg-green-100 text-green-700',
    active: 'bg-purple-100 text-purple-700',
    archived: 'bg-gray-100 text-gray-400',
};

export default function ConteudosPage() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedCalendar, setSelectedCalendar] = useState<any>(null);

    // Busca tenant do usuário (simplificado - em produção, pegar do contexto)
    const { data: tenantUser } = useSWR('tenant-user', async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data } = await supabase
            .from('tenant_users')
            .select('tenant_id, tenants(*)')
            .eq('user_id', user.id)
            .single();

        return data;
    });

    const tenant_id = tenantUser?.tenant_id;

    // Busca calendários
    const { data: calendars, mutate, isLoading } = useSWR(
        tenant_id ? ['calendars', tenant_id] : null,
        async () => {
            const { data, error } = await supabase
                .from('content_calendar')
                .select('*, content_items(count)')
                .eq('tenant_id', tenant_id!)
                .order('year', { ascending: false })
                .order('month', { ascending: false });

            if (error) throw error;
            return data;
        }
    );

    const stats = {
        total: calendars?.length || 0,
        active: calendars?.filter((c) => c.status === 'active').length || 0,
        pending: calendars?.filter((c) => c.status === 'ai_generated').length || 0,
    };

    const getMonthName = (month: number) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month - 1];
    };

    return (
        <div className="space-y-8">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">
                        Conteúdos com IA
                    </h1>
                    <p className="text-imi-500 mt-1">
                        Planejamento, geração e agendamento totalmente automatizado.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-soft border border-imi-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-imi-900 leading-tight">
                                {stats.total}
                            </div>
                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">
                                Calendários
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-soft border border-imi-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-imi-900 leading-tight">
                                {stats.active}
                            </div>
                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">
                                Ativos
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="flex items-center gap-3 text-imi-600">
                    <Sparkles className="text-accent-500" size={20} />
                    <span className="text-sm font-bold">
                        Claude planeja, Gemini cria, você aprova
                    </span>
                </div>
                <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-accent-600 hover:bg-accent-700"
                >
                    <Plus className="mr-2" size={20} />
                    Novo Calendário
                </Button>
            </div>

            {/* Calendars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(3)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                key={i}
                                className="h-64 bg-imi-50 animate-pulse rounded-3xl"
                            />
                        ))
                ) : calendars?.length === 0 ? (
                    <div className="col-span-full bg-white rounded-3xl shadow-soft border border-imi-50 p-20 text-center">
                        <CalendarIcon className="mx-auto text-imi-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-imi-900 mb-2">
                            Nenhum calendário ainda
                        </h3>
                        <p className="text-imi-500 mb-6">
                            Crie seu primeiro planejamento mensal com ajuda da IA
                        </p>
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            className="bg-accent-600 hover:bg-accent-700"
                        >
                            <Sparkles className="mr-2" size={20} />
                            Criar com Claude
                        </Button>
                    </div>
                ) : (
                    calendars?.map((calendar) => (
                        <motion.div
                            key={calendar.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl shadow-soft border border-imi-50 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                            onClick={() => setSelectedCalendar(calendar)}
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-br from-imi-900 to-imi-800 p-6 text-white">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="text-3xl font-black leading-none mb-1">
                                            {getMonthName(calendar.month)}
                                        </div>
                                        <div className="text-imi-200 text-sm font-bold">
                                            {calendar.year}
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                                            statusColors[calendar.status]
                                        )}
                                    >
                                        {statusLabels[calendar.status]}
                                    </div>
                                </div>

                                {/* Objetivos */}
                                {calendar.objectives?.length > 0 && (
                                    <div className="space-y-1">
                                        {calendar.objectives.slice(0, 2).map((obj: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-imi-200">
                                                <div className="w-1 h-1 rounded-full bg-accent-400" />
                                                {obj}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-imi-400 font-bold">Posts Planejados</span>
                                    <span className="text-imi-900 font-black text-lg">
                                        {calendar.ai_plan?.suggested_posts?.length || 0}
                                    </span>
                                </div>

                                {calendar.ai_plan?.content_pillars && (
                                    <div>
                                        <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                                            Pilares de Conteúdo
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {calendar.ai_plan.content_pillars.slice(0, 3).map((pillar: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 bg-imi-50 text-imi-600 text-[10px] font-bold rounded-lg"
                                                >
                                                    {pillar}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-imi-50 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">
                                        {formatDistanceToNow(new Date(calendar.created_at), {
                                            addSuffix: true,
                                            locale: ptBR,
                                        })}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="group-hover:bg-accent-600 group-hover:text-white transition-colors"
                                    >
                                        <Eye size={16} className="mr-2" />
                                        Ver Detalhes
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && tenant_id && (
                    <CreateCalendarModal
                        tenant_id={tenant_id}
                        onClose={() => setShowCreateModal(false)}
                        onSuccess={() => {
                            setShowCreateModal(false);
                            mutate();
                            toast.success('Calendário criado com sucesso!');
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Calendar Detail Modal (placeholder) */}
            <AnimatePresence>
                {selectedCalendar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-imi-900/40 backdrop-blur-sm z-[200]"
                            onClick={() => setSelectedCalendar(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-4 md:inset-10 bg-white rounded-3xl shadow-2xl z-[210] overflow-auto p-8"
                        >
                            <div className="max-w-5xl mx-auto">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-imi-900 font-display">
                                            {getMonthName(selectedCalendar.month)}/{selectedCalendar.year}
                                        </h2>
                                        <p className="text-imi-500 mt-1">
                                            {selectedCalendar.ai_plan?.summary || 'Visualize e gerencie o planejamento mensal'}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setSelectedCalendar(null)}
                                    >
                                        Fechar
                                    </Button>
                                </div>

                                {/* Conteúdo do calendário - implementar grid de posts */}
                                <div className="bg-imi-50 rounded-2xl p-8 text-center text-imi-500">
                                    <CalendarIcon className="mx-auto mb-4" size={48} />
                                    <p>Grid de posts em desenvolvimento...</p>
                                    <p className="text-sm mt-2">
                                        {selectedCalendar.ai_plan?.suggested_posts?.length || 0} posts planejados
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
