'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    ChevronLeft,
    Plus,
    Trash2,
    Save,
    Loader2,
    Home,
    Bed,
    Bath,
    Car,
    Maximize,
    DollarSign,
    Layers
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

const supabase = createClient();

interface Unit {
    id: string;
    development_id: string;
    unit_name: string;
    unit_type: string;
    area: number | null;
    position: string | null;
    tower: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    parking_spots: number | null;
    total_price: number | null;
    status: 'available' | 'reserved' | 'sold';
    floor_plan_url: string | null;
    is_highlighted: boolean;
    notes: string | null;
    created_at: string;
}

interface Development {
    id: string;
    name: string;
    slug: string;
}

const statusLabels: Record<string, string> = {
    available: 'Disponível',
    reserved: 'Reservado',
    sold: 'Vendido'
};

const statusColors: Record<string, string> = {
    available: 'bg-green-100 text-green-700',
    reserved: 'bg-yellow-100 text-yellow-700',
    sold: 'bg-red-100 text-red-700'
};

export default function UnitsPage() {
    const router = useRouter();
    const params = useParams();
    const developmentId = params.id as string;

    const [development, setDevelopment] = useState<Development | null>(null);
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Unit | null>(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        unit_name: '',
        unit_type: 'apartamento',
        area: 0,
        position: '',
        tower: '',
        bedrooms: 2,
        bathrooms: 2,
        parking_spots: 1,
        total_price: 0,
        status: 'available' as 'available' | 'reserved' | 'sold',
        is_highlighted: false,
        notes: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            // Buscar empreendimento
            const { data: dev, error: devError } = await supabase
                .from('developments')
                .select('id, name, slug')
                .eq('id', developmentId)
                .single();

            if (devError || !dev) {
                toast.error('Empreendimento não encontrado');
                router.push('/backoffice/imoveis');
                return;
            }

            setDevelopment(dev);

            // Buscar unidades
            const { data: unitsData, error: unitsError } = await supabase
                .from('development_units')
                .select('*')
                .eq('development_id', developmentId)
                .order('unit_name', { ascending: true });

            if (unitsError) {
                toast.error('Erro ao carregar unidades');
            } else {
                setUnits(unitsData || []);
            }

            setLoading(false);
        };

        fetchData();
    }, [developmentId, router]);

    const resetForm = () => {
        setForm({
            unit_name: '',
            unit_type: 'apartamento',
            area: 0,
            position: '',
            tower: '',
            bedrooms: 2,
            bathrooms: 2,
            parking_spots: 1,
            total_price: 0,
            status: 'available',
            is_highlighted: false,
            notes: ''
        });
        setEditing(null);
    };

    const openEdit = (unit: Unit) => {
        setEditing(unit);
        setForm({
            unit_name: unit.unit_name,
            unit_type: unit.unit_type,
            area: unit.area || 0,
            position: unit.position || '',
            tower: unit.tower || '',
            bedrooms: unit.bedrooms || 2,
            bathrooms: unit.bathrooms || 2,
            parking_spots: unit.parking_spots || 1,
            total_price: unit.total_price || 0,
            status: unit.status,
            is_highlighted: unit.is_highlighted || false,
            notes: unit.notes || ''
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...form,
                development_id: developmentId
            };

            if (editing) {
                const { error } = await supabase
                    .from('development_units')
                    .update(payload)
                    .eq('id', editing.id);
                if (error) throw error;
                toast.success('Unidade atualizada');
            } else {
                const { error } = await supabase
                    .from('development_units')
                    .insert([payload]);
                if (error) throw error;
                toast.success('Unidade cadastrada');
            }

            // Recarregar unidades
            const { data } = await supabase
                .from('development_units')
                .select('*')
                .eq('development_id', developmentId)
                .order('unit_name', { ascending: true });

            setUnits(data || []);
            setShowForm(false);
            resetForm();
        } catch (err: any) {
            toast.error('Erro ao salvar: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Excluir unidade "${name}"?`)) return;

        const { error } = await supabase.from('development_units').delete().eq('id', id);
        if (error) {
            toast.error('Erro ao excluir');
        } else {
            toast.success('Unidade excluída');
            setUnits(units.filter(u => u.id !== id));
        }
    };

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase
            .from('development_units')
            .update({ status })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao atualizar status');
        } else {
            toast.success('Status atualizado');
            setUnits(units.map(u => u.id === id ? { ...u, status: status as any } : u));
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="animate-spin text-imi-400" size={40} />
            </div>
        );
    }

    const stats = {
        total: units.length,
        available: units.filter(u => u.status === 'available').length,
        reserved: units.filter(u => u.status === 'reserved').length,
        sold: units.filter(u => u.status === 'sold').length
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/backoffice/imoveis" className="p-2 hover:bg-imi-50 rounded-lg transition-colors">
                        <ChevronLeft size={24} className="text-imi-900" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-imi-900 font-display">Unidades</h1>
                        <p className="text-imi-500 mt-1">{development?.name}</p>
                    </div>
                </div>
                <Button onClick={() => { resetForm(); setShowForm(true); }} className="bg-imi-900 hover:bg-imi-800">
                    <Plus size={20} className="mr-2" />
                    Nova Unidade
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-soft border border-imi-50 p-5">
                    <div className="text-3xl font-black text-imi-900">{stats.total}</div>
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Total</div>
                </div>
                <div className="bg-white rounded-2xl shadow-soft border border-imi-50 p-5">
                    <div className="text-3xl font-black text-green-600">{stats.available}</div>
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Disponíveis</div>
                </div>
                <div className="bg-white rounded-2xl shadow-soft border border-imi-50 p-5">
                    <div className="text-3xl font-black text-yellow-600">{stats.reserved}</div>
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Reservados</div>
                </div>
                <div className="bg-white rounded-2xl shadow-soft border border-imi-50 p-5">
                    <div className="text-3xl font-black text-red-600">{stats.sold}</div>
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest">Vendidos</div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-imi-400 bg-white rounded-2xl border border-dashed border-imi-200">
                        Nenhuma unidade cadastrada ainda.
                    </div>
                ) : units.map((unit) => (
                    <motion.div
                        key={unit.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-soft border border-imi-50 overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-imi-900 text-lg">{unit.unit_name}</h3>
                                    <p className="text-xs text-imi-400 uppercase tracking-widest">{unit.unit_type}</p>
                                </div>
                                <select
                                    className={cn(
                                        "text-[10px] font-bold uppercase px-3 py-1 rounded-full border-none cursor-pointer",
                                        statusColors[unit.status]
                                    )}
                                    value={unit.status}
                                    onChange={(e) => updateStatus(unit.id, e.target.value)}
                                >
                                    <option value="available">Disponível</option>
                                    <option value="reserved">Reservado</option>
                                    <option value="sold">Vendido</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-4 gap-2 mb-4">
                                <div className="text-center p-2 bg-imi-50 rounded-xl">
                                    <Maximize size={14} className="mx-auto text-imi-400 mb-1" />
                                    <div className="text-xs font-bold text-imi-900">{unit.area}m²</div>
                                </div>
                                <div className="text-center p-2 bg-imi-50 rounded-xl">
                                    <Bed size={14} className="mx-auto text-imi-400 mb-1" />
                                    <div className="text-xs font-bold text-imi-900">{unit.bedrooms}</div>
                                </div>
                                <div className="text-center p-2 bg-imi-50 rounded-xl">
                                    <Bath size={14} className="mx-auto text-imi-400 mb-1" />
                                    <div className="text-xs font-bold text-imi-900">{unit.bathrooms}</div>
                                </div>
                                <div className="text-center p-2 bg-imi-50 rounded-xl">
                                    <Car size={14} className="mx-auto text-imi-400 mb-1" />
                                    <div className="text-xs font-bold text-imi-900">{unit.parking_spots}</div>
                                </div>
                            </div>

                            {unit.total_price && unit.total_price > 0 && (
                                <div className="mb-4 p-3 bg-accent-50 rounded-xl border border-accent-100">
                                    <div className="text-[10px] font-bold text-accent-600 uppercase tracking-widest">Valor</div>
                                    <div className="text-lg font-black text-accent-700">
                                        R$ {unit.total_price.toLocaleString('pt-BR')}
                                    </div>
                                </div>
                            )}

                            {(unit.tower || unit.position) && (
                                <div className="flex gap-2 mb-4">
                                    {unit.tower && (
                                        <span className="text-[10px] font-bold text-imi-500 bg-imi-50 px-2 py-1 rounded-lg">
                                            Torre: {unit.tower}
                                        </span>
                                    )}
                                    {unit.position && (
                                        <span className="text-[10px] font-bold text-imi-500 bg-imi-50 px-2 py-1 rounded-lg">
                                            Posição: {unit.position}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-3 bg-imi-50/50 border-t border-imi-100 flex justify-end gap-2">
                            <button
                                onClick={() => openEdit(unit)}
                                className="text-xs font-bold text-imi-600 hover:text-imi-900 px-3 py-1.5 hover:bg-white rounded-lg transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(unit.id, unit.unit_name)}
                                className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 hover:bg-white rounded-lg transition-colors"
                            >
                                Excluir
                            </button>
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
                                    {editing ? 'Editar Unidade' : 'Nova Unidade'}
                                </h2>
                                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white rounded-full">
                                    <Plus size={24} className="rotate-45 text-imi-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Nome da Unidade *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.unit_name}
                                            onChange={(e) => setForm({ ...form, unit_name: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Ex: Apt 101, Cobertura 01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Tipologia</label>
                                        <select
                                            value={form.unit_type}
                                            onChange={(e) => setForm({ ...form, unit_type: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                        >
                                            <option value="apartamento">Apartamento</option>
                                            <option value="cobertura">Cobertura</option>
                                            <option value="garden">Garden</option>
                                            <option value="studio">Studio</option>
                                            <option value="duplex">Duplex</option>
                                            <option value="triplex">Triplex</option>
                                            <option value="flat">Flat</option>
                                            <option value="loft">Loft</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Torre</label>
                                        <input
                                            type="text"
                                            value={form.tower}
                                            onChange={(e) => setForm({ ...form, tower: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Torre A"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Posição</label>
                                        <input
                                            type="text"
                                            value={form.position}
                                            onChange={(e) => setForm({ ...form, position: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="Nascente, Poente..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Área (m²)</label>
                                        <input
                                            type="number"
                                            value={form.area}
                                            onChange={(e) => setForm({ ...form, area: parseFloat(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Quartos</label>
                                        <input
                                            type="number"
                                            value={form.bedrooms}
                                            onChange={(e) => setForm({ ...form, bedrooms: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Banheiros</label>
                                        <input
                                            type="number"
                                            value={form.bathrooms}
                                            onChange={(e) => setForm({ ...form, bathrooms: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Vagas</label>
                                        <input
                                            type="number"
                                            value={form.parking_spots}
                                            onChange={(e) => setForm({ ...form, parking_spots: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Valor (R$)</label>
                                        <input
                                            type="number"
                                            value={form.total_price}
                                            onChange={(e) => setForm({ ...form, total_price: parseInt(e.target.value) || 0 })}
                                            className="w-full rounded-xl border-imi-100"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                                            className="w-full rounded-xl border-imi-100"
                                        >
                                            <option value="available">Disponível</option>
                                            <option value="reserved">Reservado</option>
                                            <option value="sold">Vendido</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Observações Internas</label>
                                    <textarea
                                        value={form.notes}
                                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                        rows={3}
                                        className="w-full rounded-xl border-imi-100"
                                        placeholder="Notas de venda, detalhes do cliente..."
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-imi-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="is_highlighted"
                                        checked={form.is_highlighted}
                                        onChange={(e) => setForm({ ...form, is_highlighted: e.target.checked })}
                                        className="w-5 h-5 rounded text-accent-500"
                                    />
                                    <label htmlFor="is_highlighted" className="text-sm font-bold text-imi-900">
                                        Destacar esta unidade no site
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
                                    {editing ? 'Salvar Alterações' : 'Cadastrar Unidade'}
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
