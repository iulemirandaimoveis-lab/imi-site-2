'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Plus, Search, Filter, Edit2, Trash2, ExternalLink, Building2, MapPin,
    Copy, MoreHorizontal, Eye, EyeOff, Link2, ChevronDown, Download,
    TrendingUp, AlertTriangle, CheckCircle2, Image as ImageIcon, Video,
    BarChart3, X, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    launch: 'Lançamento',
    ready: 'Pronto',
    under_construction: 'Em Obras'
};

const statusColors: Record<string, string> = {
    launch: 'bg-imi-900 text-white',
    ready: 'bg-accent-500 text-imi-900',
    under_construction: 'bg-imi-500 text-white'
};

const visibilityLabels: Record<string, string> = {
    rascunho: 'Rascunho',
    publicado: 'Publicado',
    campanha: 'Campanha',
    privado: 'Privado'
};

const visibilityColors: Record<string, string> = {
    rascunho: 'bg-imi-100 text-imi-500',
    publicado: 'bg-green-100 text-green-700',
    campanha: 'bg-purple-100 text-purple-700',
    privado: 'bg-red-100 text-red-700'
};

const tipoLabels: Record<string, string> = {
    apartamento: 'Apartamento',
    casa: 'Casa',
    flat: 'Flat',
    lote: 'Lote',
    comercial: 'Comercial',
    resort: 'Resort'
};

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

function ScoreBadge({ score }: { score: number }) {
    const color = score >= 70 ? 'text-green-600 bg-green-50' : score >= 40 ? 'text-yellow-600 bg-yellow-50' : 'text-red-500 bg-red-50';
    return (
        <span className={cn('text-[10px] font-black px-2 py-1 rounded-lg', color)}>
            {score}/100
        </span>
    );
}

function QualityAlerts({ dev }: { dev: any }) {
    const alerts: string[] = [];
    if (!dev.images?.main) alerts.push('Sem foto');
    if (!dev.images?.videos?.length) alerts.push('Sem vídeo');
    if (!dev.images?.floorPlans?.length) alerts.push('Sem planta');
    if (!dev.price_min) alerts.push('Sem preço');
    if (!dev.delivery_date) alerts.push('Sem data entrega');
    if (alerts.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-1 mt-2">
            {alerts.map(a => (
                <span key={a} className="text-[9px] font-bold bg-red-50 text-red-400 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {a}
                </span>
            ))}
        </div>
    );
}

export default function PropertiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [visibilityFilter, setVisibilityFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [linkModal, setLinkModal] = useState<any>(null);
    const [linkChannel, setLinkChannel] = useState('instagram');
    const [linkCampaign, setLinkCampaign] = useState('');
    const [generatingLink, setGeneratingLink] = useState(false);

    const { data: developments, mutate, isLoading } = useSWR('developments-list', async () => {
        const { data, error } = await supabase
            .from('developments')
            .select('*, tracked_links:tracked_links(count), lead_count:leads(count)')
            .order('display_order', { ascending: true })
            .order('created_at', { ascending: false });
        if (error) {
            console.error('Fetch error:', error);
            const { data: fallback, error: e2 } = await supabase
                .from('developments')
                .select('*')
                .order('display_order', { ascending: true });
            if (e2) throw e2;
            return fallback;
        }
        return data;
    });

    const filtered = useMemo(() => {
        if (!developments) return [];
        return developments.filter(dev => {
            const matchSearch = !searchTerm || [
                dev.name, dev.city, dev.neighborhood, dev.developer
            ].some(f => f?.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchStatus = statusFilter === 'all' || dev.status === statusFilter;
            const matchVis = visibilityFilter === 'all' || dev.status_comercial === visibilityFilter;
            const matchRegion = regionFilter === 'all' || dev.region === regionFilter;
            return matchSearch && matchStatus && matchVis && matchRegion;
        });
    }, [developments, searchTerm, statusFilter, visibilityFilter, regionFilter]);

    const stats = useMemo(() => ({
        total: developments?.length || 0,
        published: developments?.filter(d => d.status_comercial === 'publicado').length || 0,
        drafts: developments?.filter(d => !d.status_comercial || d.status_comercial === 'rascunho').length || 0,
        avgScore: developments?.length ? Math.round((developments.reduce((a, d) => a + (d.score || 0), 0)) / developments.length) : 0
    }), [developments]);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm('Excluir "' + name + '"? Esta ação é irreversível.')) return;
        const { error } = await supabase.from('developments').delete().eq('id', id);
        if (error) toast.error('Erro: ' + error.message);
        else { toast.success('Excluído'); mutate(); }
    };

    const handleDuplicate = async (dev: any) => {
        const { id, created_at, updated_at, tracked_links, lead_count, ...rest } = dev;
        const { error } = await supabase.from('developments').insert([{
            ...rest,
            name: rest.name + ' (cópia)',
            slug: rest.slug + '-copia-' + Date.now(),
            status_comercial: 'rascunho',
            leads_count: 0,
            score: 0
        }]);
        if (error) toast.error('Erro ao duplicar: ' + error.message);
        else { toast.success('Duplicado com sucesso'); mutate(); }
    };

    const handleBulkVisibility = async (visibility: string) => {
        if (selectedIds.length === 0) return;
        const { error } = await supabase
            .from('developments')
            .update({ status_comercial: visibility, updated_at: new Date().toISOString() })
            .in('id', selectedIds);
        if (error) toast.error('Erro: ' + error.message);
        else { toast.success(selectedIds.length + ' itens atualizados'); setSelectedIds([]); mutate(); }
    };

    const handleExportCSV = () => {
        if (!filtered?.length) return;
        const headers = ['Nome', 'Status', 'Tipo', 'Cidade', 'Bairro', 'Construtora', 'Preço Min', 'Preço Max', 'Score', 'Publicação'];
        const rows = filtered.map(d => [
            d.name, statusLabels[d.status] || d.status, tipoLabels[d.tipo] || d.tipo,
            d.city, d.neighborhood, d.developer, d.price_min, d.price_max, d.score,
            visibilityLabels[d.status_comercial] || d.status_comercial
        ]);
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'imoveis-imi-' + new Date().toISOString().split('T')[0] + '.csv';
        a.click(); URL.revokeObjectURL(url);
        toast.success('CSV exportado');
    };

    const handleGenerateLink = async () => {
        if (!linkModal) return;
        setGeneratingLink(true);
        const shortCode = Math.random().toString(36).slice(2, 8);
        const { error } = await supabase.from('tracked_links').insert([{
            development_id: linkModal.id,
            channel: linkChannel,
            utm_source: linkChannel,
            utm_medium: 'cpc',
            utm_campaign: linkCampaign || linkModal.slug,
            short_code: shortCode
        }]);
        if (error) {
            toast.error('Erro ao gerar link: ' + error.message);
        } else {
            const fullUrl = 'https://iulemirandaimoveis.com.br/pt/imoveis/' + linkModal.slug + '?utm_source=' + linkChannel + '&utm_campaign=' + (linkCampaign || linkModal.slug) + '&ref=' + shortCode;
            await navigator.clipboard.writeText(fullUrl);
            toast.success('Link copiado para a área de transferência');
            setLinkModal(null);
            setLinkCampaign('');
            mutate();
        }
        setGeneratingLink(false);
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filtered.length) setSelectedIds([]);
        else setSelectedIds(filtered.map(d => d.id));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-imi-900 font-display">Imóveis</h1>
                    <p className="text-imi-500 text-sm mt-1">Hub operacional de ativos imobiliários.</p>
                </div>
                <Button asChild className="bg-imi-900 hover:bg-imi-800 h-12 w-full sm:w-auto">
                    <Link href="/backoffice/imoveis/novo">
                        <Plus size={20} className="mr-2" /> Novo Empreendimento
                    </Link>
                </Button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total', value: stats.total, icon: Building2, bg: 'bg-blue-50' },
                    { label: 'Publicados', value: stats.published, icon: Eye, bg: 'bg-green-50' },
                    { label: 'Rascunhos', value: stats.drafts, icon: EyeOff, bg: 'bg-imi-50' },
                    { label: 'Score Médio', value: stats.avgScore + '/100', icon: BarChart3, bg: 'bg-accent-500/10' }
                ].map(k => (
                    <div key={k.label} className="bg-white rounded-2xl p-4 border border-imi-50 shadow-soft flex items-center gap-3">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', k.bg)}>
                            <k.icon size={18} className="text-imi-900" />
                        </div>
                        <div>
                            <div className="text-lg font-black text-imi-900 leading-none">{k.value}</div>
                            <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">{k.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search + Filters */}
            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por nome, cidade, bairro ou construtora..."
                            className="w-full pl-10 pr-4 h-11 rounded-xl border border-imi-100 text-sm focus:ring-accent-500 focus:border-accent-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn('flex items-center gap-2 px-4 h-11 rounded-xl border text-sm font-bold transition-all', showFilters ? 'bg-imi-900 text-white border-imi-900' : 'border-imi-100 text-imi-500 hover:border-imi-300')}
                        >
                            <Filter size={16} /> Filtros
                        </button>
                        <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 h-11 rounded-xl border border-imi-100 text-sm font-bold text-imi-500 hover:border-imi-300 transition-all">
                            <Download size={16} /> CSV
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-imi-50">
                                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 rounded-xl border-imi-100 text-xs font-bold">
                                    <option value="all">Status: Todos</option>
                                    <option value="launch">Lançamento</option>
                                    <option value="under_construction">Em Obras</option>
                                    <option value="ready">Pronto</option>
                                </select>
                                <select value={visibilityFilter} onChange={e => setVisibilityFilter(e.target.value)} className="h-10 rounded-xl border-imi-100 text-xs font-bold">
                                    <option value="all">Publicação: Todos</option>
                                    <option value="rascunho">Rascunho</option>
                                    <option value="publicado">Publicado</option>
                                    <option value="campanha">Campanha</option>
                                    <option value="privado">Privado</option>
                                </select>
                                <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="h-10 rounded-xl border-imi-100 text-xs font-bold">
                                    <option value="all">Região: Todas</option>
                                    <option value="paraiba">Paraíba</option>
                                    <option value="pernambuco">Pernambuco</option>
                                    <option value="sao-paulo">São Paulo</option>
                                </select>
                                <button onClick={() => { setStatusFilter('all'); setVisibilityFilter('all'); setRegionFilter('all'); setSearchTerm(''); }} className="h-10 rounded-xl border border-imi-100 text-xs font-bold text-imi-400 hover:text-imi-900 transition-colors">
                                    Limpar filtros
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bulk Actions Bar */}
            <AnimatePresence>
                {selectedIds.length > 0 && (
                    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="bg-imi-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <span className="text-sm font-bold">{selectedIds.length} selecionado(s)</span>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleBulkVisibility('publicado')} className="px-3 h-9 bg-green-600 rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">Publicar</button>
                            <button onClick={() => handleBulkVisibility('rascunho')} className="px-3 h-9 bg-imi-700 rounded-lg text-xs font-bold hover:bg-imi-600 transition-colors">Despublicar</button>
                            <button onClick={() => handleBulkVisibility('privado')} className="px-3 h-9 bg-red-600 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors">Privar</button>
                            <button onClick={() => setSelectedIds([])} className="px-3 h-9 bg-white/10 rounded-lg text-xs font-bold hover:bg-white/20 transition-colors">Cancelar</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Cards */}
            <div className="space-y-3 lg:hidden">
                {isLoading ? (
                    Array(3).fill(0).map((_, i) => <div key={i} className="bg-white rounded-2xl p-5 animate-pulse border border-imi-50 h-32" />)
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center text-imi-400 border border-imi-50">Nenhum imóvel encontrado.</div>
                ) : filtered.map((dev) => (
                    <div key={dev.id} className="bg-white rounded-2xl border border-imi-50 shadow-soft overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <button onClick={() => toggleSelect(dev.id)} className={cn('mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all', selectedIds.includes(dev.id) ? 'bg-imi-900 border-imi-900' : 'border-imi-200')}>
                                    {selectedIds.includes(dev.id) && <CheckCircle2 size={12} className="text-white" />}
                                </button>
                                <div className="relative w-14 h-14 rounded-xl bg-imi-100 overflow-hidden flex-shrink-0 border border-imi-100">
                                    {dev.images?.main ? (
                                        <Image src={dev.images.main} alt={dev.name} fill className="object-cover" sizes="56px" />
                                    ) : (
                                        <Building2 className="w-7 h-7 m-3.5 text-imi-300" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-imi-900 text-sm truncate">{dev.name}</h3>
                                    <p className="text-[11px] text-imi-400">{dev.developer}</p>
                                    <div className="flex items-center gap-1 mt-1 text-[11px] text-imi-500">
                                        <MapPin size={10} className="text-accent-500" />
                                        {dev.neighborhood ? dev.neighborhood + ', ' : ''}{dev.city || 'Sem cidade'}
                                    </div>
                                </div>
                                <ScoreBadge score={dev.score || 0} />
                            </div>
                            <QualityAlerts dev={dev} />
                            <div className="flex items-center gap-2 mt-3">
                                <span className={cn('text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', statusColors[dev.status] || 'bg-imi-100 text-imi-500')}>
                                    {statusLabels[dev.status] || dev.status}
                                </span>
                                <span className={cn('text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full', visibilityColors[dev.status_comercial] || visibilityColors.rascunho)}>
                                    {visibilityLabels[dev.status_comercial] || 'Rascunho'}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-imi-50 text-imi-400">
                                    {tipoLabels[dev.tipo] || 'Apt'}
                                </span>
                                {dev.price_min > 0 && (
                                    <span className="ml-auto text-sm font-bold text-imi-900">
                                        R$ {dev.price_min?.toLocaleString('pt-BR')}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex border-t border-imi-50 divide-x divide-imi-50">
                            <Link href={'/backoffice/imoveis/' + dev.id} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-imi-600 hover:bg-imi-50 transition-colors min-h-[44px]">
                                <Edit2 size={14} /> Editar
                            </Link>
                            <button onClick={() => setLinkModal(dev)} className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold text-accent-600 hover:bg-accent-500/5 transition-colors min-h-[44px]">
                                <Link2 size={14} /> Link
                            </button>
                            <button onClick={() => handleDuplicate(dev)} className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-imi-400 hover:bg-imi-50 transition-colors min-h-[44px]">
                                <Copy size={14} />
                            </button>
                            <button onClick={() => handleDelete(dev.id, dev.name)} className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-red-400 hover:bg-red-50 transition-colors min-h-[44px]">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden hidden lg:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-imi-50/50 border-b border-imi-100">
                                <th className="px-4 py-3 w-10">
                                    <button onClick={toggleSelectAll} className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all', selectedIds.length === filtered.length && filtered.length > 0 ? 'bg-imi-900 border-imi-900' : 'border-imi-200')}>
                                        {selectedIds.length === filtered.length && filtered.length > 0 && <CheckCircle2 size={12} className="text-white" />}
                                    </button>
                                </th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest">Empreendimento</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest">Tipo</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest text-center">Publicação</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest">Local</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest">Investimento</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest text-center">Score</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest text-center">Leads</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-imi-400 uppercase tracking-widest text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-imi-50">
                            {isLoading ? (
                                Array(5).fill(0).map((_, i) => <tr key={i} className="animate-pulse"><td colSpan={10} className="px-4 py-6 h-16 bg-imi-50/20" /></tr>)
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={10} className="px-4 py-16 text-center text-imi-400">Nenhum imóvel encontrado.</td></tr>
                            ) : filtered.map((dev) => (
                                <tr key={dev.id} className="hover:bg-imi-50/30 transition-colors group">
                                    <td className="px-4 py-3">
                                        <button onClick={() => toggleSelect(dev.id)} className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all', selectedIds.includes(dev.id) ? 'bg-imi-900 border-imi-900' : 'border-imi-200 group-hover:border-imi-400')}>
                                            {selectedIds.includes(dev.id) && <CheckCircle2 size={12} className="text-white" />}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-10 h-10 rounded-lg bg-imi-100 overflow-hidden flex-shrink-0 border border-imi-100">
                                                {dev.images?.main ? (
                                                    <Image src={dev.images.main} alt={dev.name} fill className="object-cover" sizes="40px" />
                                                ) : (
                                                    <Building2 className="w-5 h-5 m-2.5 text-imi-300" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-imi-900 text-sm truncate max-w-[200px]">{dev.name}</div>
                                                <div className="text-[10px] text-imi-400 truncate">{dev.developer}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-[10px] font-bold text-imi-500 uppercase">{tipoLabels[dev.tipo] || 'Apt'}</span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', statusColors[dev.status])}>
                                            {statusLabels[dev.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn('text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full', visibilityColors[dev.status_comercial] || visibilityColors.rascunho)}>
                                            {visibilityLabels[dev.status_comercial] || 'Rascunho'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs text-imi-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin size={10} className="text-accent-500" />
                                                {dev.neighborhood || '-'}, {dev.city || '-'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {dev.price_min > 0 ? (
                                            <div>
                                                <div className="text-sm font-bold text-imi-900">R$ {dev.price_min?.toLocaleString('pt-BR')}</div>
                                                <div className="text-[10px] text-imi-400">a partir de</div>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] text-imi-300 italic">Sem preço</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center"><ScoreBadge score={dev.score || 0} /></td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-sm font-bold text-imi-900">{dev.leads_count || 0}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Link href={'/backoffice/imoveis/' + dev.id} className="p-2 text-imi-400 hover:text-imi-900 hover:bg-imi-50 rounded-lg transition-all" title="Editar">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button onClick={() => setLinkModal(dev)} className="p-2 text-imi-400 hover:text-accent-600 hover:bg-accent-500/10 rounded-lg transition-all" title="Gerar link">
                                                <Link2 size={16} />
                                            </button>
                                            <button onClick={() => handleDuplicate(dev)} className="p-2 text-imi-400 hover:text-imi-900 hover:bg-imi-50 rounded-lg transition-all" title="Duplicar">
                                                <Copy size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(dev.id, dev.name)} className="p-2 text-imi-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Excluir">
                                                <Trash2 size={16} />
                                            </button>
                                            <Link href={'/pt/imoveis/' + dev.slug} target="_blank" className="p-2 text-imi-400 hover:text-accent-600 hover:bg-accent-500/10 rounded-lg transition-all" title="Ver no site">
                                                <ExternalLink size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Gerar Link Trackeado */}
            <AnimatePresence>
                {linkModal && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-imi-900/40 backdrop-blur-sm z-[200]" onClick={() => setLinkModal(null)} />
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-white rounded-3xl shadow-2xl z-[210] p-6 sm:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-imi-900 font-display">Gerar Link Trackeado</h3>
                                <button onClick={() => setLinkModal(null)} className="p-2 hover:bg-imi-50 rounded-lg"><X size={20} className="text-imi-400" /></button>
                            </div>
                            <p className="text-sm text-imi-500">Imóvel: <strong className="text-imi-900">{linkModal.name}</strong></p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-imi-900 uppercase tracking-widest mb-2 block">Canal</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['instagram', 'google', 'whatsapp', 'email', 'linkedin', 'tiktok'].map(ch => (
                                            <button key={ch} onClick={() => setLinkChannel(ch)} className={cn('py-2.5 rounded-xl text-xs font-bold border transition-all capitalize min-h-[44px]', linkChannel === ch ? 'bg-imi-900 text-white border-imi-900' : 'border-imi-100 text-imi-500 hover:border-imi-300')}>{ch}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-imi-900 uppercase tracking-widest mb-2 block">Nome da Campanha (opcional)</label>
                                    <input value={linkCampaign} onChange={e => setLinkCampaign(e.target.value)} className="w-full h-11 rounded-xl border border-imi-100 px-4 text-sm" placeholder="Ex: lancamento-verao-2026" />
                                </div>
                            </div>
                            <Button onClick={handleGenerateLink} disabled={generatingLink} fullWidth className="bg-imi-900 hover:bg-imi-800 h-12">
                                {generatingLink ? <Loader2 size={18} className="animate-spin mr-2" /> : <Link2 size={18} className="mr-2" />}
                                Gerar e Copiar Link
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
