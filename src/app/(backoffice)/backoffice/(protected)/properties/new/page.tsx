'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowLeftIcon, CloudArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline'; // Checking imports
import Link from 'next/link';

// Corrected Schema to match Prisma Enums and Types
const schema = z.object({
    internalCode: z.string().min(1, 'Código obrigatório'),
    title: z.string().min(3, 'Título muito curto'),
    description: z.string().min(10, 'Descrição muito curta'),
    location: z.enum(['US_MIAMI', 'US_ORLANDO', 'US_NYC', 'US_TAMPA', 'UAE_DUBAI']),
    address: z.string().min(5, 'Endereço obrigatório'), // Added as it's required in schema
    city: z.string().min(2, 'Cidade obrigatória'),    // Added
    state: z.string().min(2, 'Estado obrigatório'),    // Added
    country: z.string().min(2, 'País obrigatório'),    // Added
    zipCode: z.string().min(2, 'CEP/Zip obrigatório'), // Added
    propertyType: z.enum(['APARTMENT', 'CONDO', 'HOUSE', 'TOWNHOUSE', 'VILLA']), // Added
    bedrooms: z.number().int().min(0), // Added
    bathrooms: z.number().min(0),      // Added
    area: z.number().positive(),       // Added
    listPrice: z.number().positive('Preço deve ser positivo'),
    status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'OFF_MARKET']),
    images: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof schema>;

export default function NewProperty() {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const supabase = createClientComponentClient();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            status: 'AVAILABLE',
            location: 'US_MIAMI',
            propertyType: 'APARTMENT',
            bedrooms: 2,
            bathrooms: 2,
            area: 100,
            country: 'USA'
        }
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Erro ao criar imóvel');
            }

            toast.success('Imóvel criado com sucesso!');
            router.push('/backoffice/properties');
            router.refresh();
        } catch (err: any) {
            toast.error(err.message || 'Erro ao criar imóvel');
            console.error(err);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const urls: string[] = watch('images') || [];

        try {
            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `properties/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, file);

                if (uploadError) {
                    throw uploadError;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                urls.push(publicUrl);
            }

            setValue('images', urls);
            toast.success(`${files.length} imagem(ns) carregada(s)`);
        } catch (error: any) {
            toast.error('Erro ao fazer upload: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const currentImages = watch('images') || [];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/backoffice/properties" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-display font-bold text-gray-900">Novo Imóvel</h1>
                    <p className="text-sm text-gray-500">Preencha os dados do novo imóvel</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Informações Básicas</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Código Interno</label>
                            <input {...register('internalCode')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" placeholder="Ex: AP-1050" />
                            {errors.internalCode && <p className="text-red-600 text-sm mt-1">{errors.internalCode.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <input {...register('title')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" placeholder="Ex: Apartamento Luxo Miami" />
                            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea {...register('description')} rows={4} className="form-textarea w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                            <select {...register('location')} className="form-select w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500">
                                <option value="US_MIAMI">Miami (USA)</option>
                                <option value="US_ORLANDO">Orlando (USA)</option>
                                <option value="US_NYC">New York (USA)</option>
                                <option value="US_TAMPA">Tampa (USA)</option>
                                <option value="UAE_DUBAI">Dubai (UAE)</option>
                            </select>
                            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select {...register('propertyType')} className="form-select w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500">
                                <option value="APARTMENT">Apartamento</option>
                                <option value="CONDO">Condo</option>
                                <option value="HOUSE">Casa</option>
                                <option value="TOWNHOUSE">Townhouse</option>
                                <option value="VILLA">Villa</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select {...register('status')} className="form-select w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500">
                                <option value="AVAILABLE">Disponível</option>
                                <option value="RESERVED">Reservado</option>
                                <option value="SOLD">Vendido</option>
                                <option value="OFF_MARKET">Fora do Mercado</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preço (Lista)</label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input type="number" step="0.01" {...register('listPrice', { valueAsNumber: true })} className="form-input pl-7 w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            </div>
                            {errors.listPrice && <p className="text-red-600 text-sm mt-1">{errors.listPrice.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                            <input type="number" step="0.01" {...register('area', { valueAsNumber: true })} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                        </div>
                    </div>
                </div>

                {/* Address Fields */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Endereço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro</label>
                            <input {...register('address')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input {...register('city')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input {...register('state')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                            <input {...register('country')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CEP / Zip</label>
                            <input {...register('zipCode')} className="form-input w-full rounded-lg border-gray-300 focus:ring-navy-500 focus:border-navy-500" />
                            {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Imagens</h2>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                        <input type="file" multiple onChange={handleUpload} disabled={uploading} id="images-upload" className="hidden" accept="image/*" />
                        <label htmlFor="images-upload" className="cursor-pointer flex flex-col items-center">
                            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mb-3" />
                            <span className="text-sm font-medium text-navy-600">Clique para fazer upload</span>
                            <span className="text-xs text-gray-500 mt-1">PNG, JPG até 10MB</span>
                        </label>
                        {uploading && <p className="mt-4 text-sm text-navy-600 font-medium animate-pulse">Carregando imagens...</p>}
                    </div>

                    {currentImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {currentImages.map((url, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                    <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => setValue('images', currentImages.filter((_, i) => i !== idx))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="sr-only">Remover</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/backoffice/properties" className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                        Cancelar
                    </Link>
                    <button type="submit" disabled={uploading} className="bg-navy-600 text-white px-8 py-3 rounded-xl hover:bg-navy-700 transition shadow-lg shadow-navy-600/20 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        {uploading ? 'Aguarde...' : (
                            <>
                                <CheckIcon className="h-5 w-5" />
                                Salvar Imóvel
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
