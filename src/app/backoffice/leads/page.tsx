'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Search,
    Filter,
    Users,
    MessageSquare,
    Calendar,
    Clock,
    MoreHorizontal,
    X,
    MessageCircle,
    Phone,
    Mail,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    new: 'Novo',
    contacted: 'Contatado',
    qualified: 'Qualificado',
    converted: 'Convertido',
    lost: 'Perdido'
};

const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    qualified: 'bg-purple-100 text-purple-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-gray-100 text-gray-700'
};

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const { data: leads, mutate, isLoading } = useSWR('leads', async () => {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    });

    const stats = {
        total: leads?.length || 0,
        new: leads?.filter(l => l.status === 'new').length || 0,
        converted: leads?.filter(l => l.status === 'converted').length || 0,
        recent: leads?.filter(l => {
            const date = new Date(l.created_at);
            const now = new Date();
            return (now.getTime() - date.getTime()) < 7 * 24 * 60 * 60 * 1000;
        }).length || 0
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        setUpdatingStatus(true);
        const { error } = await supabase
            .from('leads')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao atualizar status: ' + error.message);
        } else {
            toast.success('Status atualizado');
            mutate();
            if (selectedLead?.id === id) {
                setSelectedLead({ ...selectedLead, status });
            }
        }
        setUpdatingStatus(false);
    };

    const handleUpdateNotes = async () => {
        const { error } = await supabase
            .from('leads')
            .update({ notes: selectedLead.notes, updated_at: new Date().toISOString() })
            .eq('id', selectedLead.id);

        if (error) {
            toast.error('Erro ao salvar notas');
        } else {
            toast.success('Notas salvas');
            mutate();
        }
    };

    const filteredLeads = leads?.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm);

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            {/* Header & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">CRM Leads</h1>
                    <p className="text-imi-500 mt-1">Gestão de contatos e conversão comercial.</p>
                </div>

                <div className="grid grid-cols-2 md:flex gap-4">
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-soft border border-imi-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-imi-900 leading-tight">{stats.total}</div>
                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Total Leads</div>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-soft border border-imi-50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <CheckCircle2 size={20} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-imi-900 leading-tight">{stats.converted}</div>
                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Convertidos</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-imi-100 focus:ring-accent-500 focus:border-accent-500 !text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="rounded-xl border-imi-100 text-sm focus:ring-accent-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Todos Status</option>
                        <option value="new">Novos</option>
                        <option value="contacted">Contatados</option>
                        <option value="qualified">Qualificados</option>
                        <option value="converted">Convertidos</option>
                        <option value="lost">Perdidos</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-imi-50/50 border-b border-imi-100">
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Lead</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Origem</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Data</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-imi-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 h-20 bg-imi-50/10" />
                                    </tr>
                                ))
                            ) : filteredLeads?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-imi-400">
                                        Nenhum lead encontrado com estes filtros.
                                    </td>
                                </tr>
                            ) : filteredLeads?.map((lead) => (
                                <tr
                                    key={lead.id}
                                    className="hover:bg-imi-50/30 transition-all cursor-pointer group"
                                    onClick={() => setSelectedLead(lead)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-imi-900 group-hover:text-accent-600 transition-colors uppercase tracking-tight">{lead.name}</span>
                                            <span className="text-xs text-imi-400">{lead.email}</span>
                                            <span className="text-[10px] font-bold text-imi-300">{lead.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full",
                                                statusColors[lead.status] || 'bg-gray-100'
                                            )}>
                                                {statusLabels[lead.status]}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs font-medium text-imi-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                                            {lead.source}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-imi-900">
                                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                            </span>
                                            <span className="text-[10px] text-imi-400">
                                                {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <a
                                                href={`https://wa.me/55${lead.phone?.replace(/\D/g, '')}`}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            >
                                                <MessageCircle size={20} />
                                            </a>
                                            <button className="p-2 text-imi-300 hover:text-imi-900 hover:bg-imi-50 rounded-lg transition-colors">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Drawer */}
            <AnimatePresence>
                {selectedLead && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-imi-900/40 backdrop-blur-sm z-[200]"
                            onClick={() => setSelectedLead(null)}
                        />
                        <motion.aside
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[210] flex flex-col"
                        >
                            <div className="p-6 border-b border-imi-100 flex items-center justify-between bg-imi-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-imi-900 font-display">Detalhes do Lead</h2>
                                    <p className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">ID: {selectedLead.id.split('-')[0]}</p>
                                </div>
                                <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-white rounded-full transition-colors shadow-sm">
                                    <X size={24} className="text-imi-900" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* Informações */}
                                <div className="space-y-6">
                                    <div className="flex flex-col items-center text-center p-6 bg-imi-50 rounded-3xl border border-imi-100">
                                        <div className="w-20 h-20 rounded-full bg-accent-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl shadow-accent-500/20">
                                            {selectedLead.name.charAt(0)}
                                        </div>
                                        <h3 className="text-2xl font-bold text-imi-900 font-display">{selectedLead.name}</h3>
                                        <div className={cn("mt-3 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest", statusColors[selectedLead.status])}>
                                            {statusLabels[selectedLead.status]}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex items-center gap-4 p-4 bg-white border border-imi-50 rounded-2xl">
                                            <div className="w-10 h-10 rounded-xl bg-imi-50 flex items-center justify-center text-imi-400">
                                                <Mail size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Email</span>
                                                <span className="text-sm font-bold text-imi-900">{selectedLead.email || 'Não informado'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 p-4 bg-white border border-imi-50 rounded-2xl">
                                            <div className="w-10 h-10 rounded-xl bg-imi-50 flex items-center justify-center text-imi-400">
                                                <Phone size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Telefone</span>
                                                <span className="text-sm font-bold text-imi-900">{selectedLead.phone || 'Não informado'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ações de Status */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-imi-900 uppercase tracking-[0.2em] px-2 text-center">Atualizar Status</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(statusLabels).map(([key, label]) => (
                                            <button
                                                key={key}
                                                disabled={updatingStatus}
                                                onClick={() => handleUpdateStatus(selectedLead.id, key)}
                                                className={cn(
                                                    "py-3 rounded-xl text-xs font-bold transition-all border",
                                                    selectedLead.status === key
                                                        ? cn(statusColors[key], "border-transparent ring-2 ring-accent-500 ring-offset-2")
                                                        : "bg-white border-imi-100 text-imi-400 hover:border-imi-300"
                                                )}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Notas */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between px-2">
                                        <h4 className="text-xs font-bold text-imi-900 uppercase tracking-[0.2em]">Notas Técnicas</h4>
                                        <button onClick={handleUpdateNotes} className="text-[10px] font-bold text-accent-600 uppercase hover:underline">
                                            Salvar Notas
                                        </button>
                                    </div>
                                    <textarea
                                        className="w-full rounded-2xl border-imi-100 bg-imi-50/50 p-4 text-sm focus:ring-accent-500 h-32"
                                        placeholder="Digite aqui observações sobre o atendimento, perfil do cliente..."
                                        value={selectedLead.notes || ''}
                                        onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Footer do Drawer */}
                            <div className="p-8 border-t border-imi-100 bg-white">
                                <Button asChild fullWidth className="h-14 bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/20">
                                    <a href={`https://wa.me/55${selectedLead.phone?.replace(/\D/g, '')}`} target="_blank">
                                        <MessageCircle size={20} className="mr-2" />
                                        Falar agora no WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
