'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Building,
    Globe,
    Phone,
    Mail,
    ToggleLeft,
    ToggleRight,
    ExternalLink,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

const supabase = createClient();

interface Developer {
    id: string;
    slug: string;
    name: string;
    legal_name: string | null;
    cnpj: string | null;
    logo_url: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    description: string | null;
    city: string | null;
    state: string | null;
    is_active: boolean;
    display_order: number;
    created_at: string;
}

export default function DevelopersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Developer | null>(null);
    const [saving, setSaving] = useState(false);

    const { data: developers, mutate, isLoading } = useSWR('developers', async () => {
        const { data, error } = await supabase
            .from('developers')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data as Developer[];
    });

    const [form, setForm] = useState({
        name: '',
        legal_name: '',
        slug: '',
        cnpj: '',
        email: '',
        phone: '',
        website: '',
        city: '',
        state: 'PB',
        description: '',
        is_active: true,
        display_order: 0
    });

    const resetForm = () => {
        setForm({
            name: '',
            legal_name: '',
            slug: '',
            cnpj: '',
            email: '',
            phone: '',
            website: '',
            city: '',
            state: 'PB',
            description: '',
            is_active: true,
            display_order: 0
        });
        setEditing(null);
    };

    const openEdit = (dev: Developer) => {
        setEditing(dev);
        setForm({
            name: dev.name,
            legal_name: dev.legal_name || '',
            slug: dev.slug,
            cnpj: dev.cnpj || '',
            email: dev.email || '',
            phone: dev.phone || '',
            website: dev.website || '',
            city: dev.city || '',
            state: dev.state || 'PB',
            description: dev.description || '',
            is_active: dev.is_active,
            display_order: dev.display_order
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...form,
                slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                updated_at: new Date().toISOString()
            };

            if (editing) {
                const { error } = await supabase
                    .from('developers')
                    .update(payload)
                    .eq('id', editing.id);
                if (error) throw error;
                toast.success('Construtora atualizada com sucesso');
            } else {
                const { error } = await supabase
                    .from('developers')
                    .insert([payload]);
                if (error) throw error;
                toast.success('Construtora cadastrada com sucesso');
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

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Tem certeza que deseja excluir "${name}"?`)) return;

        const { error } = await supabase.from('developers').delete().eq('id', id);
        if (error) {
            toast.error('Erro ao excluir: ' + error.message);
        } else {
            toast.success('Construtora excluída');
            mutate();
        }
    };

    const toggleActive = async (id: string, currentState: boolean) => {
        const { error } = await supabase
            .from('developers')
            .update({ is_active: !currentState })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao atualizar status');
        } else {
            toast.success(currentState ? 'Construtora desativada' : 'Construtora ativada');
            mutate();
        }
    };

    const filtered = developers?.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900 font-display">Construtoras</h1>
                    <p className="text-imi-500 mt-1">Gerencie as incorporadoras e construtoras parceiras.</p>
                </div>
                <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-imi-900 hover:bg-imi-800">
                    <Plus size={20} className="mr-2" />
                    Nova Construtora
                </Button>
            </div>

            {/* Search */}
            <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-soft border border-imi-50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-imi-300" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou cidade..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border-imi-100 focus:ring-accent-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-soft border border-imi-50 p-6 animate-pulse">
                            <div className="w-16 h-16 bg-imi-100 rounded-xl mb-4" />
                            <div className="h-6 bg-imi-100 rounded w-3/4 mb-2" />
                            <div className="h-4 bg-imi-50 rounded w-1/2" />
                        </div>
                    ))
                ) : filtered?.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-imi-400">
                        Nenhuma construtora encontrada.
                    </div>
                ) : filtered?.map((dev) => (
                    <motion.div
                        key={dev.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-soft border border-imi-50 p-6 hover:shadow-lg transition-shadow group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-14 h-14 rounded-xl bg-imi-50 flex items-center justify-center overflow-hidden border border-imi-100">
                                {dev.logo_url ? (
                                    <Image src={dev.logo_url} alt={dev.name} width={56} height={56} className="object-contain" />
                                ) : (
                                    <Building className="text-imi-300" size={24} />
                                )}
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => openEdit(dev)}
                                    className="p-2 text-imi-300 hover:text-imi-900 hover:bg-imi-50 rounded-lg transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(dev.id, dev.name)}
                                    className="p-2 text-imi-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-imi-900 text-lg mb-1">{dev.name}</h3>
                        <p className="text-xs text-imi-400 mb-4">
                            {dev.city}, {dev.state}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {dev.website && (
                                <a href={dev.website} target="_blank" className="text-xs text-accent-600 hover:underline flex items-center gap-1">
                                    <Globe size={12} /> Site
                                </a>
                            )}
                            {dev.email && (
                                <a href={`mailto:${dev.email}`} className="text-xs text-imi-500 hover:underline flex items-center gap-1">
                                    <Mail size={12} /> Email
                                </a>
                            )}
                            {dev.phone && (
                                <span className="text-xs text-imi-500 flex items-center gap-1">
                                    <Phone size={12} /> {dev.phone}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-imi-50">
                            <button
                                onClick={() => toggleActive(dev.id, dev.is_active)}
                                className={cn(
                                    "flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors",
                                    dev.is_active
                                        ? "bg-green-50 text-green-600"
                                        : "bg-gray-100 text-gray-500"
                                )}
                            >
                                {dev.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                                {dev.is_active ? 'Ativa' : 'Inativa'}
                            </button>
                            <span className="text-[10px] text-imi-300 font-bold">#{dev.display_order}</span>
                        </div>
                    </motion.div>
                ))}
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
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-[110] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-imi-100 flex items-center justify-between bg-imi-50">
                                <h2 className="text-xl font-bold text-imi-900 font-display">
                                    {editing ? 'Editar Construtora' : 'Nova Construtora'}
                                </h2>
                                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white rounded-full">
                                    <Plus size={24} className="rotate-45 text-imi-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Nome Fantasia *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Ex: Setai Grupo GP"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Razão Social</label>
                                        <input
                                            type="text"
                                            value={form.legal_name}
                                            onChange={(e) => setForm({ ...form, legal_name: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Razão social completa"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">CNPJ</label>
                                        <input
                                            type="text"
                                            value={form.cnpj}
                                            onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="00.000.000/0001-00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">URL Slug</label>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="setai-grupo-gp"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Email</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="contato@construtora.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Telefone</label>
                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="(83) 99999-0000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Website</label>
                                        <input
                                            type="url"
                                            value={form.website}
                                            onChange={(e) => setForm({ ...form, website: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="https://www.construtora.com.br"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Cidade</label>
                                        <input
                                            type="text"
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="João Pessoa"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Estado</label>
                                        <select
                                            value={form.state}
                                            onChange={(e) => setForm({ ...form, state: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                        >
                                            <option value="PB">Paraíba</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Ordem</label>
                                        <input
                                            type="number"
                                            value={form.display_order}
                                            onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Descrição</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        rows={3}
                                        className="w-full rounded-xl border-imi-100"
                                        placeholder="Breve descrição da construtora..."
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-imi-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.is_active}
                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                        className="w-5 h-5 rounded text-accent-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-imi-900">
                                        Construtora ativa (visível no site)
                                    </label>
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
                                    {editing ? 'Salvar Alterações' : 'Cadastrar Construtora'}
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
