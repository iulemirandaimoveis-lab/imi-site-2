'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import { Plus, Search, Filter, Edit2, Trash2, ExternalLink, Building2, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { toast } from 'sonner';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    launch: 'Lançamento',
    ready: 'Pronto',
    under_construction: 'Em Obras'
};

const statusColors: Record<string, string> = {
    launch: 'bg-imi-900 text-white',
    ready: 'bg-accent-500 text-white',
    under_construction: 'bg-imi-500 text-white'
};

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: developments, mutate, isLoading } = useSWR('developments', async () => {
        const { data, error } = await supabase
            .from('developments')
            .select('*')
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    });

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) return;

        const { error } = await supabase.from('developments').delete().eq('id', id);
        if (error) {
            toast.error('Erro ao excluir: ' + error.message);
        } else {
            toast.success('Empreendimento excluído com sucesso');
            mutate();
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        const { error } = await supabase.from('developments').update({ status }).eq('id', id);
        if (error) {
            toast.error('Erro ao atualizar status: ' + error.message);
        } else {
            toast.success('Status atualizado');
            mutate();
        }
    };

    const filteredDevelopments = developments?.filter(dev =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">Imóveis</h1>
                    <p className="text-imi-500 mt-1">Gerencie o inventário de empreendimentos do site.</p>
                </div>
                <Button asChild className="bg-imi-900 hover:bg-imi-800">
                    <Link href="/backoffice/imoveis/novo">
                        <Plus size={20} className="mr-2" />
                        Novo Empreendimento
                    </Link>
                </Button>
            </div>

            {/* Filters/Search */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou cidade..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-imi-100 focus:ring-accent-500 focus:border-accent-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl">
                        <Filter size={18} className="mr-2" />
                        Filtros
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-imi-50/50 border-b border-imi-100">
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Empreendimento</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Localização</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Investimento</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-imi-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 h-16 bg-imi-50/20" />
                                    </tr>
                                ))
                            ) : filteredDevelopments?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-imi-400">
                                        Nenhum empreendimento encontrado.
                                    </td>
                                </tr>
                            ) : filteredDevelopments?.map((dev) => (
                                <tr key={dev.id} className="hover:bg-imi-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 rounded-lg bg-imi-100 overflow-hidden flex-shrink-0 border border-imi-100">
                                                {dev.images?.main ? (
                                                    <Image src={dev.images.main} alt={dev.name} fill className="object-cover" />
                                                ) : (
                                                    <Building2 className="w-6 h-6 m-3 text-imi-300" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-imi-900">{dev.name}</div>
                                                <div className="text-xs text-imi-400">{dev.developer}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center">
                                            <select
                                                className={cn(
                                                    "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border-none cursor-pointer",
                                                    statusColors[dev.status]
                                                )}
                                                value={dev.status}
                                                onChange={(e) => handleStatusChange(dev.id, e.target.value)}
                                            >
                                                <option value="launch">Lançamento</option>
                                                <option value="under_construction">Em Obras</option>
                                                <option value="ready">Pronta Entrega</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-imi-600">
                                            <MapPin size={14} className="text-accent-500" />
                                            {dev.neighborhood}, {dev.city}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-imi-900">
                                            R$ {dev.price_min?.toLocaleString('pt-BR')}
                                        </div>
                                        <div className="text-[10px] text-imi-400 uppercase font-bold">A partir de</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/backoffice/imoveis/${dev.id}`} className="p-2 text-imi-400 hover:text-imi-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-imi-100">
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(dev.id, dev.name)}
                                                className="p-2 text-imi-400 hover:text-red-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-red-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <Link href={`/pt/imoveis/${dev.slug}`} target="_blank" className="p-2 text-imi-400 hover:text-accent-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-accent-100">
                                                <ExternalLink size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
