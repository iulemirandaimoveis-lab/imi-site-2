'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
    Save, ArrowLeft, Image as ImageIcon, Video, MapPin,
    Layout, Check, Loader2, Plus, Trash2, Home
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

const supabase = createClient();

const propertyTypes = [
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'flat', label: 'Flat' },
    { value: 'lote', label: 'Lote' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'resort', label: 'Resort' },
];

const constructionStatus = [
    { value: 'launch', label: 'Lançamento' },
    { value: 'under_construction', label: 'Em Obras' },
    { value: 'ready', label: 'Pronto' },
];

const commercialStatus = [
    { value: 'rascunho', label: 'Rascunho' },
    { value: 'publicado', label: 'Publicado' },
    { value: 'campanha', label: 'Campanha' },
    { value: 'privado', label: 'Privado' },
];

export default function PropertyForm() {
    const router = useRouter();
    const { id } = useParams();
    const isNew = id === 'novo';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<any>({
        name: '',
        slug: '',
        description: '',
        short_description: '',
        developer: '',
        tipo: 'apartamento',
        status: 'launch',
        status_comercial: 'rascunho',
        city: '',
        neighborhood: '',
        address: '',
        region: 'paraiba',
        price_min: 0,
        price_max: 0,
        delivery_date: '',
        metragem: '',
        quartos: '',
        suites: '',
        vagas: '',
        images: {
            main: '',
            gallery: [],
            videos: [],
            floorPlans: []
        },
        characteristics: [],
        featured: false
    });

    useEffect(() => {
        if (!isNew) {
            fetchProperty();
        }
    }, [id]);

    const fetchProperty = async () => {
        try {
            const { data, error } = await supabase
                .from('developments')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                // Ensure images structure exists
                const images = data.images || { main: '', gallery: [], videos: [], floorPlans: [] };
                setFormData({ ...data, images });
            }
        } catch (error: any) {
            toast.error('Erro ao carregar imóvel: ' + error.message);
            router.push('/backoffice/imoveis');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Auto-generate slug if empty
            if (!formData.slug && formData.name) {
                formData.slug = formData.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
            }

            const { data, error } = isNew
                ? await supabase.from('developments').insert([formData]).select().single()
                : await supabase.from('developments').update(formData).eq('id', id).select().single();

            if (error) throw error;

            toast.success(isNew ? 'Imóvel criado com sucesso!' : 'Imóvel atualizado!');
            if (isNew) {
                router.push('/backoffice/imoveis');
            }
        } catch (error: any) {
            toast.error('Erro ao salvar: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const updateImages = (key: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            images: {
                ...prev.images,
                [key]: value
            }
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-imi-900" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header Sticky */}
            <div className="sticky top-0 z-20 bg-imi-50/80 backdrop-blur-md py-4 mb-6 border-b border-imi-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/backoffice/imoveis" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-imi-100 text-imi-500 hover:text-imi-900 transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-imi-900 font-display">
                            {isNew ? 'Novo Empreendimento' : 'Editar: ' + formData.name}
                        </h1>
                        <p className="text-xs text-imi-400 font-bold uppercase tracking-widest">Ativos Imobiliários</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push('/backoffice/imoveis')}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={saving} className="bg-imi-900 hover:bg-imi-800 h-10">
                        {saving ? <Loader2 size={18} className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                        {isNew ? 'Criar Imóvel' : 'Salvar Alterações'}
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Informações Básicas */}
                    <section className="bg-white rounded-2xl p-6 sm:p-8 border border-imi-100 shadow-soft space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Layout className="text-accent-500" size={18} />
                            <h2 className="text-sm font-bold text-imi-900 uppercase tracking-widest">Informações Básicas</h2>
                        </div>

                        <div className="grid gap-6">
                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Nome do Empreendimento *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm font-medium"
                                    placeholder="Ex: Reserva do Mar"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Construtora / Desenvolvedor</label>
                                    <input
                                        type="text"
                                        value={formData.developer}
                                        onChange={e => setFormData({ ...formData, developer: e.target.value })}
                                        className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm font-medium"
                                        placeholder="Ex: Moura Dubeux"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Slug (URL)</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm font-mono text-xs"
                                        placeholder="reserva-do-mar"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Breve Descrição (Destaque)</label>
                                <input
                                    type="text"
                                    value={formData.short_description}
                                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                                    className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm"
                                    placeholder="Ex: O privilégio de viver frente mar em uma reserva exclusiva."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Descrição Completa</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm min-h-[150px]"
                                    placeholder="Detalhes completos do empreendimento..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Localização */}
                    <section className="bg-white rounded-2xl p-6 sm:p-8 border border-imi-100 shadow-soft space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="text-accent-500" size={18} />
                            <h2 className="text-sm font-bold text-imi-900 uppercase tracking-widest">Localização</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Cidade</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm"
                                    placeholder="Ex: João Pessoa"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Bairro</label>
                                <input
                                    type="text"
                                    value={formData.neighborhood}
                                    onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                                    className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm"
                                    placeholder="Ex: Altiplano"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Endereço Completo (Opcional)</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm"
                                    placeholder="Rua, Número, CEP..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Midia e Imagens */}
                    <section className="bg-white rounded-2xl p-6 sm:p-8 border border-imi-100 shadow-soft space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="text-accent-500" size={18} />
                            <h2 className="text-sm font-bold text-imi-900 uppercase tracking-widest">Mídia do Ativo</h2>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Imagem Principal (Capa)</label>
                            <input
                                type="text"
                                value={formData.images.main}
                                onChange={e => updateImages('main', e.target.value)}
                                className="w-full h-12 px-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-sm"
                                placeholder="URL da imagem (ex: https://...)"
                            />
                            {formData.images.main && (
                                <div className="mt-4 relative aspect-video rounded-xl overflow-hidden border border-imi-100 max-w-sm">
                                    <img src={formData.images.main} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Galeria de Fotos (URLs separadas por vírgula ou linha)</label>
                            <textarea
                                value={formData.images.gallery?.join('\n')}
                                onChange={e => updateImages('gallery', e.target.value.split('\n').filter(Boolean))}
                                className="w-full p-4 bg-imi-50/50 border border-imi-100 rounded-xl focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all text-[10px] font-mono min-h-[100px]"
                                placeholder="https://imagem1.jpg&#10;https://imagem2.jpg"
                            />
                        </div>
                    </section>
                </div>

                {/* Right Column: Status & Parameters */}
                <div className="space-y-6">
                    {/* Status e Controle */}
                    <section className="bg-white rounded-2xl p-6 border border-imi-100 shadow-soft space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-3">Status de Obra</label>
                            <div className="grid grid-cols-1 gap-2">
                                {constructionStatus.map(s => (
                                    <button
                                        key={s.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: s.value })}
                                        className={cn(
                                            'flex items-center justify-between px-4 h-11 rounded-xl border text-xs font-bold transition-all',
                                            formData.status === s.value ? 'bg-imi-900 text-white border-imi-900' : 'bg-white text-imi-500 border-imi-100 hover:border-imi-300'
                                        )}
                                    >
                                        {s.label}
                                        {formData.status === s.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-3">Publicação Backoffice</label>
                            <div className="grid grid-cols-1 gap-2">
                                {commercialStatus.map(s => (
                                    <button
                                        key={s.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status_comercial: s.value })}
                                        className={cn(
                                            'flex items-center justify-between px-4 h-11 rounded-xl border text-xs font-bold transition-all',
                                            formData.status_comercial === s.value ? 'bg-accent-500 text-imi-900 border-accent-500 shadow-sm' : 'bg-white text-imi-500 border-imi-100 hover:border-imi-300'
                                        )}
                                    >
                                        {s.label}
                                        {formData.status_comercial === s.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-3">Categoria de Produto</label>
                            <select
                                value={formData.tipo}
                                onChange={e => setFormData({ ...formData, tipo: e.target.value })}
                                className="w-full h-11 px-4 bg-imi-50/50 border border-imi-100 rounded-xl text-sm font-bold focus:ring-imi-900 focus:border-imi-900"
                            >
                                {propertyTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                            </select>
                        </div>
                    </section>

                    {/* Preços e Atributos */}
                    <section className="bg-white rounded-2xl p-6 border border-imi-100 shadow-soft space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Preço Mínimo (R$)</label>
                            <input
                                type="number"
                                value={formData.price_min}
                                onChange={e => setFormData({ ...formData, price_min: Number(e.target.value) })}
                                className="w-full h-11 px-4 bg-imi-50 border border-imi-100 rounded-xl text-sm font-bold text-imi-900"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Metragem (Ex: 40 a 120m²)</label>
                            <input
                                type="text"
                                value={formData.metragem}
                                onChange={e => setFormData({ ...formData, metragem: e.target.value })}
                                className="w-full h-11 px-4 bg-imi-50 border border-imi-100 rounded-xl text-sm"
                                placeholder="Ex: 40 a 120m²"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Quartos</label>
                                <input type="text" value={formData.quartos} onChange={e => setFormData({ ...formData, quartos: e.target.value })} className="w-full h-11 px-4 bg-imi-50 border border-imi-100 rounded-xl text-sm" placeholder="1 a 3" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Suítes</label>
                                <input type="text" value={formData.suites} onChange={e => setFormData({ ...formData, suites: e.target.value })} className="w-full h-11 px-4 bg-imi-50 border border-imi-100 rounded-xl text-sm" placeholder="1 a 2" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">Data de Entrega (Ex: Dez/2026)</label>
                            <input
                                type="text"
                                value={formData.delivery_date}
                                onChange={e => setFormData({ ...formData, delivery_date: e.target.value })}
                                className="w-full h-11 px-4 bg-imi-50 border border-imi-100 rounded-xl text-sm"
                                placeholder="Dez/2026"
                            />
                        </div>
                    </section>

                    <label className="flex items-center gap-3 p-6 bg-white rounded-2xl border border-imi-100 shadow-soft cursor-pointer hover:bg-imi-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={formData.featured}
                            onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-5 h-5 rounded border-imi-300 text-imi-900 focus:ring-imi-900 transition-all"
                        />
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-purple-500" />
                            <span className="text-xs font-bold text-imi-900 uppercase tracking-widest">Destaque na Home</span>
                        </div>
                    </label>
                </div>
            </div>
        </form>
    );
}

function Sparkles({ size, className }: { size: number, className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    )
}
