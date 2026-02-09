'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    FileText,
    Globe,
    Eye,
    EyeOff,
    Calendar,
    Loader2,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const supabase = createClient();

interface Page {
    id: string;
    slug: string;
    title: string;
    seo_title: string | null;
    seo_description: string | null;
    content: string | null;
    excerpt: string | null;
    status: 'draft' | 'published' | 'archived';
    page_type: 'page' | 'service' | 'faq' | 'policy';
    display_order: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

const statusLabels: Record<string, string> = {
    draft: 'Rascunho',
    published: 'Publicado',
    archived: 'Arquivado'
};

const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-700',
    published: 'bg-green-100 text-green-700',
    archived: 'bg-gray-100 text-gray-500'
};

const typeLabels: Record<string, string> = {
    page: 'Página',
    service: 'Serviço',
    faq: 'FAQ',
    policy: 'Política'
};

export default function PagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Page | null>(null);
    const [saving, setSaving] = useState(false);

    const { data: pages, mutate, isLoading } = useSWR('pages', async () => {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data as Page[];
    });

    const [form, setForm] = useState({
        title: '',
        slug: '',
        seo_title: '',
        seo_description: '',
        content: '',
        excerpt: '',
        status: 'draft' as 'draft' | 'published' | 'archived',
        page_type: 'page' as 'page' | 'service' | 'faq' | 'policy',
        display_order: 0
    });

    const resetForm = () => {
        setForm({
            title: '',
            slug: '',
            seo_title: '',
            seo_description: '',
            content: '',
            excerpt: '',
            status: 'draft',
            page_type: 'page',
            display_order: 0
        });
        setEditing(null);
    };

    const openEdit = (page: Page) => {
        setEditing(page);
        setForm({
            title: page.title,
            slug: page.slug,
            seo_title: page.seo_title || '',
            seo_description: page.seo_description || '',
            content: page.content || '',
            excerpt: page.excerpt || '',
            status: page.status,
            page_type: page.page_type,
            display_order: page.display_order
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...form,
                slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                published_at: form.status === 'published' ? new Date().toISOString() : null,
                updated_at: new Date().toISOString()
            };

            if (editing) {
                const { error } = await supabase
                    .from('pages')
                    .update(payload)
                    .eq('id', editing.id);
                if (error) throw error;
                toast.success('Página atualizada com sucesso');
            } else {
                const { error } = await supabase
                    .from('pages')
                    .insert([payload]);
                if (error) throw error;
                toast.success('Página criada com sucesso');
            }

            mutate();
            setShowForm(false);
            resetForm();
        } catch (err: any) {
            toast.error('Erro ao salvar: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Tem certeza que deseja excluir "${title}"?`)) return;

        const { error } = await supabase.from('pages').delete().eq('id', id);
        if (error) {
            toast.error('Erro ao excluir: ' + error.message);
        } else {
            toast.success('Página excluída');
            mutate();
        }
    };

    const togglePublish = async (page: Page) => {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        const { error } = await supabase
            .from('pages')
            .update({
                status: newStatus,
                published_at: newStatus === 'published' ? new Date().toISOString() : null
            })
            .eq('id', page.id);

        if (error) {
            toast.error('Erro ao atualizar');
        } else {
            toast.success(newStatus === 'published' ? 'Página publicada' : 'Página despublicada');
            mutate();
        }
    };

    const filtered = pages?.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || p.page_type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">Conteúdo Institucional</h1>
                    <p className="text-imi-500 mt-1">Gerencie páginas, serviços e políticas do site.</p>
                </div>
                <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-imi-900 hover:bg-imi-800">
                    <Plus size={20} className="mr-2" />
                    Nova Página
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por título..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-imi-100 focus:ring-accent-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="rounded-xl border-imi-100 text-sm"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="all">Todos os Tipos</option>
                    <option value="page">Páginas</option>
                    <option value="service">Serviços</option>
                    <option value="faq">FAQ</option>
                    <option value="policy">Políticas</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-imi-50/50 border-b border-imi-100">
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Página</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-center">Tipo</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-imi-400 uppercase tracking-widest">Atualização</th>
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
                            ) : filtered?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-imi-400">
                                        Nenhuma página encontrada.
                                    </td>
                                </tr>
                            ) : filtered?.map((page) => (
                                <tr key={page.id} className="hover:bg-imi-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-imi-50 flex items-center justify-center">
                                                <FileText className="text-imi-400" size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-imi-900">{page.title}</div>
                                                <div className="text-xs text-imi-400">/{page.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-xs font-bold text-imi-500 bg-imi-50 px-3 py-1 rounded-full">
                                            {typeLabels[page.page_type]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full",
                                            statusColors[page.status]
                                        )}>
                                            {statusLabels[page.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs text-imi-500">
                                            <Calendar size={14} />
                                            {format(new Date(page.updated_at), "dd/MM/yy", { locale: ptBR })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => togglePublish(page)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-colors",
                                                    page.status === 'published'
                                                        ? "text-green-600 hover:bg-green-50"
                                                        : "text-imi-300 hover:bg-imi-50"
                                                )}
                                                title={page.status === 'published' ? 'Despublicar' : 'Publicar'}
                                            >
                                                {page.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                                            </button>
                                            <button
                                                onClick={() => openEdit(page)}
                                                className="p-2 text-imi-400 hover:text-imi-900 hover:bg-imi-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(page.id, page.title)}
                                                className="p-2 text-imi-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                            <Link
                                                href={`/pt/${page.slug}`}
                                                target="_blank"
                                                className="p-2 text-imi-400 hover:text-accent-600 hover:bg-accent-50 rounded-lg transition-colors"
                                            >
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

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-imi-900/50 backdrop-blur-sm z-[100]"
                            onClick={() => setShowForm(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-3xl shadow-2xl z-[110] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-imi-100 flex items-center justify-between bg-imi-50">
                                <h2 className="text-xl font-bold text-imi-900 font-display">
                                    {editing ? 'Editar Página' : 'Nova Página'}
                                </h2>
                                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white rounded-full">
                                    <Plus size={24} className="rotate-45 text-imi-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Campos básicos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Título *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Título da página"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Slug (URL)</label>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="sobre-nos"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Tipo de Página</label>
                                        <select
                                            value={form.page_type}
                                            onChange={(e) => setForm({ ...form, page_type: e.target.value as any })}
                                            className="w-full rounded-xl border-imi-100"
                                        >
                                            <option value="page">Página Institucional</option>
                                            <option value="service">Descrição de Serviço</option>
                                            <option value="faq">FAQ / Ajuda</option>
                                            <option value="policy">Política / Termos</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                                            className="w-full rounded-xl border-imi-100"
                                        >
                                            <option value="draft">Rascunho</option>
                                            <option value="published">Publicado</option>
                                            <option value="archived">Arquivado</option>
                                        </select>
                                    </div>
                                </div>

                                {/* SEO */}
                                <div className="p-4 bg-imi-50 rounded-xl space-y-4">
                                    <h3 className="text-xs font-bold text-imi-900 uppercase tracking-widest flex items-center gap-2">
                                        <Globe size={14} /> SEO & Meta Tags
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-imi-600">Título SEO</label>
                                            <input
                                                type="text"
                                                value={form.seo_title}
                                                onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                                                className="w-full rounded-xl border-imi-100 bg-white"
                                                placeholder="Título para buscadores (Google)"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-imi-600">Meta Description</label>
                                            <textarea
                                                value={form.seo_description}
                                                onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                                                rows={2}
                                                className="w-full rounded-xl border-imi-100 bg-white"
                                                placeholder="Descrição para resultados de busca (max 160 caracteres)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Resumo */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Resumo / Excerpt</label>
                                    <textarea
                                        value={form.excerpt}
                                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                        rows={2}
                                        className="w-full rounded-xl border-imi-100"
                                        placeholder="Um breve resumo da página (aparece em listagens)"
                                    />
                                </div>

                                {/* Conteúdo */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Conteúdo (Markdown)</label>
                                    <textarea
                                        value={form.content}
                                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                                        rows={12}
                                        className="w-full rounded-xl border-imi-100 font-mono text-sm"
                                        placeholder="# Título&#10;&#10;Escreva o conteúdo da página aqui usando Markdown..."
                                    />
                                </div>
                            </form>

                            <div className="p-6 border-t border-imi-100 bg-white flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    className="flex-[2] bg-imi-900 hover:bg-imi-800"
                                >
                                    {saving && <Loader2 className="animate-spin mr-2" size={18} />}
                                    {editing ? 'Salvar Alterações' : 'Criar Página'}
                                </Button>
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
