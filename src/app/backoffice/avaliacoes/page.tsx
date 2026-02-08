'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Search,
    FileText,
    X,
    MessageCircle,
    Loader2,
    MapPin,
    Home,
    Clock,
    ClipboardCheck,
    MoreHorizontal
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    pending: 'Pendente',
    scheduled: 'Agendada',
    in_progress: 'Em Andamento',
    completed: 'Concluída'
};

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700'
};

export default function AppraisalRequestsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const { data: items, mutate, isLoading } = useSWR('appraisal_requests', async () => {
        const { data, error } = await supabase
            .from('appraisal_requests')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    });

    const handleUpdateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('appraisal_requests')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao atualizar status');
        } else {
            toast.success('Status atualizado');
            mutate();
            if (selectedItem?.id === id) setSelectedItem({ ...selectedItem, status });
        }
    };

    const filteredItems = items?.filter(item => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-imi-900 font-display">Solicitações de Avaliação</h1>
                <p className="text-imi-500 mt-1">Gestão de laudos técnicos e avaliações NBR 14653.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente ou email..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-imi-100 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="rounded-xl border-imi-100 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">Todos Status</option>
                    <option value="pending">Pendentes</option>
                    <option value="scheduled">Agendadas</option>
                    <option value="in_progress">Em Andamento</option>
                    <option value="completed">Concluídas</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-imi-50/50 border-b border-imi-100">
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Tipo de Imóvel</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Prazo</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-imi-50">
                            {isLoading ? (
                                <tr><td colSpan={5} className="px-6 py-20 text-center"><Loader2 className="animate-spin mx-auto text-imi-300" /></td></tr>
                            ) : filteredItems?.map((item) => (
                                <tr key={item.id} className="hover:bg-imi-50/30 transition-all cursor-pointer group" onClick={() => setSelectedItem(item)}>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-imi-900 group-hover:text-accent-600 transition-colors uppercase tracking-tight">{item.name}</span>
                                            <span className="text-xs text-imi-400">{item.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full", statusColors[item.status])}>
                                                {statusLabels[item.status]}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-imi-50 flex items-center justify-center text-imi-400 flex-shrink-0">
                                                <Home size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-imi-900">{item.property_type}</span>
                                                <span className="text-[10px] text-imi-400 font-bold uppercase tracking-tighter">{item.appraisal_type}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-imi-300" />
                                            <span className="text-xs font-bold text-imi-900">{item.timeline}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-imi-300 hover:text-imi-900 hover:bg-imi-50 rounded-lg">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Drawer */}
            <AnimatePresence>
                {selectedItem && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-imi-900/40 backdrop-blur-sm z-[200]" onClick={() => setSelectedItem(null)} />
                        <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[210] flex flex-col">
                            <div className="p-6 border-b border-imi-100 flex items-center justify-between bg-imi-50/50">
                                <h2 className="text-xl font-bold text-imi-900 font-display">Laudo Técnico</h2>
                                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white rounded-full shadow-sm"><X size={24} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-imi-50 rounded-3xl border border-imi-100 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-imi-900 flex items-center justify-center text-white shadow-lg">
                                                <ClipboardCheck size={24} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-imi-400 uppercase tracking-[0.2em]">Finalidade</div>
                                                <div className="text-lg font-bold text-imi-900 leading-tight">{selectedItem.appraisal_type}</div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-imi-100 grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <div className="text-[10px] font-bold text-imi-300 uppercase mb-1">Tipo Imóvel</div>
                                                <div className="text-sm font-bold text-imi-900">{selectedItem.property_type}</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-imi-300 uppercase mb-1">Prazo</div>
                                                <div className="text-sm font-bold text-imi-900">{selectedItem.timeline}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <DetailItem icon={<MapPin size={16} />} label="Endereço do Objeto" value={selectedItem.address || selectedItem.city} />
                                        <div className="p-4 bg-white border border-imi-50 rounded-2xl">
                                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Informações Adicionais</div>
                                            <p className="text-sm text-imi-600 italic">"{selectedItem.additional_info || 'Nenhuma informação adicional'}"</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-imi-900 uppercase tracking-[0.2em]">Gestão do Laudo</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(statusLabels).map(([key, label]) => (
                                            <button key={key} onClick={() => handleUpdateStatus(selectedItem.id, key)} className={cn("py-3 rounded-xl text-xs font-bold border transition-all", selectedItem.status === key ? cn(statusColors[key], "border-transparent ring-2 ring-accent-500") : "bg-white border-imi-100 text-imi-400 hover:border-imi-300")}>
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-imi-100">
                                <Button asChild fullWidth className="h-14 bg-imi-900">
                                    <a href={`https://wa.me/55${selectedItem.phone?.replace(/\D/g, '')}`} target="_blank">
                                        <MessageCircle size={20} className="mr-2" />
                                        Conversar sobre o Laudo
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

function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border border-imi-50 rounded-xl">
            <div className="text-accent-500">{icon}</div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-imi-300 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-bold text-imi-900">{value}</span>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
