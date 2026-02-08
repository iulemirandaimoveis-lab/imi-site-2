'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { uploadFile } from '@/lib/supabase-upload';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Video,
    Layout,
    Plus,
    Trash2,
    X,
    Loader2,
    Building2,
    MapPin,
    Hash
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { useForm, useFieldArray } from 'react-hook-form';

const supabase = createClient();

interface DevelopmentFormValues {
    name: string;
    slug: string;
    developer: string;
    status: string;
    region: string;
    neighborhood: string;
    city: string;
    state: string;
    address: string;
    price_min: number;
    price_max: number;
    delivery_date: string;
    description: string;
    short_description: string;
    registration_number: string;
    display_order: number;
    is_highlighted: boolean;
    images: {
        main: string;
        gallery: string[];
        videos: string[];
        floorPlans: string[];
    };
}

export default function PropertyFormPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const isNew = id === 'novo';

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [uploading, setUploading] = useState<string | null>(null);

    const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm<DevelopmentFormValues>({
        defaultValues: {
            status: 'launch',
            region: 'paraiba',
            display_order: 0,
            is_highlighted: false,
            price_min: 0,
            price_max: 0,
            images: {
                main: '',
                gallery: [],
                videos: [],
                floorPlans: []
            }
        }
    });

    const galleryFields = useFieldArray({ control, name: "images.gallery" as any });
    const videoFields = useFieldArray({ control, name: "images.videos" as any });
    const floorPlanFields = useFieldArray({ control, name: "images.floorPlans" as any });

    const currentImages = watch('images');

    useEffect(() => {
        if (!isNew) {
            const fetchData = async () => {
                const { data, error } = await supabase
                    .from('developments')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    toast.error('Erro ao buscar dados: ' + error.message);
                    router.push('/backoffice/imoveis');
                } else if (data) {
                    reset(data);
                }
                setFetching(false);
            };
            fetchData();
        }
    }, [id, isNew, reset, router]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery' | 'floorPlans') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(type);
        try {
            const url = await uploadFile(file, 'developments');
            if (type === 'main') {
                setValue('images.main', url);
            } else if (type === 'gallery') {
                setValue('images.gallery', [...(currentImages.gallery || []), url]);
            } else if (type === 'floorPlans') {
                setValue('images.floorPlans', [...(currentImages.floorPlans || []), url]);
            }
            toast.success('Upload realizado com sucesso');
        } catch (err: any) {
            toast.error('Erro no upload: ' + err.message);
        } finally {
            setUploading(null);
        }
    };

    const onSubmit = async (values: DevelopmentFormValues) => {
        // Validação: não permitir publicação sem imagem principal
        if (!values.images?.main) {
            toast.error('É obrigatório adicionar uma imagem principal antes de salvar.');
            return;
        }

        setLoading(true);
        try {
            const { error } = isNew
                ? await supabase.from('developments').insert([values])
                : await supabase.from('developments').update(values).eq('id', id);

            if (error) throw error;

            toast.success(isNew ? 'Criado com sucesso!' : 'Atualizado com sucesso!');
            router.push('/backoffice/imoveis');
            router.refresh();
        } catch (err: any) {
            toast.error('Erro ao salvar: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return (
        <div className="h-[60vh] flex items-center justify-center">
            <Loader2 className="animate-spin text-imi-400" size={40} />
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            {/* Header Sticky */}
            <div className="sticky top-16 lg:top-20 z-20 -mx-6 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-imi-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/backoffice/imoveis" className="p-2 hover:bg-imi-50 rounded-lg transition-colors">
                        <ChevronLeft size={24} className="text-imi-900" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-imi-900 font-display">
                            {isNew ? 'Novo Empreendimento' : `Editar ${watch('name') || ''}`}
                        </h1>
                        <p className="text-xs text-imi-400 font-bold uppercase tracking-widest">
                            {isNew ? 'Cadastro de novo item' : 'ID: ' + id}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-imi-900 hover:bg-imi-800">
                        {loading && <Loader2 className="animate-spin mr-2" size={18} />}
                        <Save size={18} className="mr-2" />
                        Salvar Alterações
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Dados Básicos */}
                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                            <Building2 size={20} className="text-accent-500" />
                            Informações Gerais
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Nome do Empreendimento</label>
                                <input {...register('name', { required: true })} className="w-full rounded-xl border-imi-100 focus:ring-accent-500" placeholder="Ex: Setai Edition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">URL Slug</label>
                                <input {...register('slug', { required: true })} className="w-full rounded-xl border-imi-100 focus:ring-accent-500" placeholder="ex: setai-edition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Incorporadora/Construtora</label>
                                <input {...register('developer', { required: true })} className="w-full rounded-xl border-imi-100 focus:ring-accent-500" placeholder="Ex: Setai Grupo GP" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Status</label>
                                <select {...register('status')} className="w-full rounded-xl border-imi-100 focus:ring-accent-500">
                                    <option value="launch">Lançamento</option>
                                    <option value="under_construction">Em Obras</option>
                                    <option value="ready">Pronta Entrega</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Descrição Completa</label>
                            <textarea {...register('description')} rows={6} className="w-full rounded-xl border-imi-100 focus:ring-accent-500" placeholder="Detalhes do projeto, diferenciais..." />
                        </div>
                    </section>

                    {/* Localização */}
                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                            <MapPin size={20} className="text-accent-500" />
                            Localização
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Estado</label>
                                <select {...register('state')} className="w-full rounded-xl border-imi-100">
                                    <option value="PB">Paraíba</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="SP">São Paulo</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Cidade</label>
                                <input {...register('city')} className="w-full rounded-xl border-imi-100" placeholder="João Pessoa" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Bairro</label>
                                <input {...register('neighborhood')} className="w-full rounded-xl border-imi-100" placeholder="Cabo Branco" />
                            </div>
                        </div>
                    </section>

                    {/* Unidades do Empreendimento */}
                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                                <Layout size={20} className="text-accent-500" />
                                Unidades Disponíveis
                            </h2>
                            {!isNew && (
                                <Link href={`/backoffice/imoveis/${id}/unidades`}>
                                    <Button type="button" variant="outline" size="sm">
                                        Configurar Unidades
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {isNew ? (
                            <p className="text-sm text-imi-400 italic">Salve o empreendimento primeiro para gerenciar suas unidades individuais.</p>
                        ) : (
                            <div className="p-4 bg-imi-50 rounded-xl border border-dashed border-imi-200 text-center">
                                <p className="text-sm text-imi-500">Controle de unidades disponível no módulo avançado.</p>
                            </div>
                        )}
                    </section>

                    {/* Galeria de Mídia */}
                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-8">
                        <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                            <ImageIcon size={20} className="text-accent-500" />
                            Mídia e Galeria
                        </h2>

                        {/* Imagem Principal */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Imagem de Capa (Main)</label>
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-imi-50 border-2 border-dashed border-imi-200 flex flex-col items-center justify-center group">
                                {currentImages.main ? (
                                    <>
                                        <Image src={currentImages.main} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setValue('images.main', '')}
                                            className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <Loader2 className={cn("mx-auto mb-2 text-imi-300", uploading === 'main' ? "animate-spin" : "hidden")} />
                                        <ImageIcon className={cn("mx-auto mb-2 text-imi-200", uploading === 'main' ? "hidden" : "block")} size={40} />
                                        <p className="text-sm text-imi-400 font-medium">Clique para fazer upload</p>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'main')} accept="image/*" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Galeria */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Galeria de Fotos</label>
                                <div className="relative">
                                    <Button type="button" variant="outline" size="sm" className="rounded-lg">
                                        <Plus size={16} className="mr-2" />
                                        Adicionar Foto
                                    </Button>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'gallery')} accept="image/*" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {currentImages.gallery?.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-imi-100 group">
                                        <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setValue('images.gallery', currentImages.gallery.filter((_, i) => i !== idx))}
                                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vídeos */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Vídeos (Embed URL)</label>
                                <Button type="button" variant="outline" size="sm" className="rounded-lg" onClick={() => videoFields.append('')}>
                                    <Plus size={16} className="mr-2" />
                                    Adicionar Vídeo
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {videoFields.fields.map((field, idx) => (
                                    <div key={field.id} className="flex gap-2">
                                        <input
                                            {...register(`images.videos.${idx}` as any)}
                                            className="flex-1 rounded-xl border-imi-100"
                                            placeholder="URL do embed (YouTube/Vimeo)"
                                        />
                                        <button type="button" onClick={() => videoFields.remove(idx)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Coluna Lateral (Preço e Status) */}
                <div className="space-y-8">
                    <section className="bg-imi-900 text-white rounded-2xl shadow-2xl p-8 space-y-6">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <Banknote size={20} className="text-accent-500" />
                            Investimento
                        </h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-imi-300 uppercase tracking-[0.2em]">Valor Mínimo (R$)</label>
                                <input type="number" {...register('price_min')} className="w-full bg-imi-800 border-none rounded-xl text-white placeholder:text-imi-600 focus:ring-accent-500" placeholder="0" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-imi-300 uppercase tracking-[0.2em]">Valor Máximo (R$)</label>
                                <input type="number" {...register('price_max')} className="w-full bg-imi-800 border-none rounded-xl text-white placeholder:text-imi-600 focus:ring-accent-500" placeholder="0" />
                            </div>
                            <div className="space-y-2 pt-4 border-t border-imi-800">
                                <label className="text-[10px] font-bold text-imi-300 uppercase tracking-[0.2em]">Previsão de Entrega</label>
                                <input {...register('delivery_date')} className="w-full bg-imi-800 border-none rounded-xl text-white focus:ring-accent-500" placeholder="Ex: Dez/2026" />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-6">
                        <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                            <Settings size={20} className="text-accent-500" />
                            Configurações Gerais
                        </h2>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-imi-50 rounded-xl">
                                <div>
                                    <div className="text-sm font-bold text-imi-900">Destaque na Home</div>
                                    <div className="text-[10px] text-imi-400 font-bold uppercase tracking-widest">Aparece na primeira página</div>
                                </div>
                                <input type="checkbox" {...register('is_highlighted')} className="w-6 h-6 rounded-md text-accent-500 border-imi-200" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-imi-900 uppercase tracking-widest">Ordem de Exibição</label>
                                <div className="flex items-center gap-3">
                                    <Hash size={20} className="text-imi-300" />
                                    <input type="number" {...register('display_order')} className="w-full rounded-xl border-imi-100" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-imi-900 uppercase tracking-widest">Região</label>
                                <select {...register('region')} className="w-full rounded-xl border-imi-100">
                                    <option value="paraiba">Paraíba</option>
                                    <option value="pernambuco">Pernambuco</option>
                                    <option value="sao-paulo">São Paulo</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-imi-900 uppercase tracking-widest">Reg. Incorporação (RI)</label>
                                <input {...register('registration_number')} className="w-full rounded-xl border-imi-100" placeholder="Ex: R-3.123-456" />
                            </div>
                        </div>
                    </section>

                    {/* Plantas Baixas */}
                    <section className="bg-white rounded-2xl shadow-soft border border-imi-50 p-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-imi-900 flex items-center gap-2">
                                <Layout size={20} className="text-accent-500" />
                                Plantas
                            </h2>
                            <div className="relative">
                                <Button type="button" variant="outline" size="sm" className="rounded-lg">
                                    <Plus size={16} />
                                </Button>
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'floorPlans')} accept="image/*" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {currentImages.floorPlans?.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-imi-50 border border-imi-100 p-2 group">
                                    <Image src={img} alt={`Plan ${idx}`} fill className="object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => setValue('images.floorPlans', currentImages.floorPlans.filter((_, i) => i !== idx))}
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
