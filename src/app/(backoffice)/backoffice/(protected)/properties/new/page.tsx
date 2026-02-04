'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { PropertyImageUpload } from '@/components/properties/PropertyImageUpload';
import { Loader2 } from 'lucide-react';

const propertySchema = z.object({
    internalCode: z.string().min(1, 'Código obrigatório'),
    title: z.string().min(1, 'Título obrigatório'),
    description: z.string().min(20, 'Descrição muito curta'),

    location: z.enum(['US_MIAMI', 'US_ORLANDO', 'US_NYC', 'US_TAMPA', 'UAE_DUBAI']),
    address: z.string().min(1, 'Endereço obrigatório'),
    city: z.string().min(1, 'Cidade obrigatória'),
    state: z.string().min(1, 'Estado obrigatório'),
    country: z.string().min(1, 'País obrigatório'),
    zipCode: z.string().min(1, 'CEP obrigatório'),

    propertyType: z.enum(['APARTMENT', 'CONDO', 'HOUSE', 'TOWNHOUSE', 'VILLA']),
    bedrooms: z.number().min(0),
    bathrooms: z.number().min(0),
    area: z.number().min(1),
    areaUnit: z.enum(['sqft', 'm2']),
    yearBuilt: z.number().optional(),

    listPrice: z.number().min(1, 'Preço obrigatório'),
    currency: z.string().default('USD'),
    estimatedRent: z.number().optional(),
    rentalType: z.enum(['LONG_TERM', 'SHORT_TERM', 'CORPORATE']).optional(),

    status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'OFF_MARKET']).default('AVAILABLE'),
    featured: z.boolean().default(false),

    images: z.array(z.string()).min(1, 'Adicione pelo menos 1 imagem'),
    virtualTourUrl: z.string().url().optional().or(z.literal('')),
    documentsUrl: z.array(z.string()).optional()
});

type PropertyForm = z.infer<typeof propertySchema>;

export default function NewPropertyPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<PropertyForm>({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            internalCode: '',
            title: '',
            description: '',
            location: 'US_MIAMI',
            address: '',
            city: '',
            state: '',
            country: 'USA',
            zipCode: '',
            propertyType: 'APARTMENT',
            bedrooms: 2,
            bathrooms: 2,
            area: 1000,
            areaUnit: 'sqft',
            listPrice: 300000,
            currency: 'USD',
            status: 'AVAILABLE',
            featured: false,
            images: [],
            documentsUrl: []
        }
    });

    const onSubmit = async (data: PropertyForm) => {
        setSubmitting(true);

        try {
            const response = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar imóvel');
            }

            const property = await response.json();
            router.push(`/backoffice/properties/${property.id}`);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">

            <div>
                <h1 className="text-3xl font-bold">Novo Imóvel</h1>
                <p className="text-gray-600 mt-1">
                    Cadastre um novo imóvel no inventário
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Informações básicas */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Informações Básicas</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Código Interno *
                            </label>
                            <input
                                {...form.register('internalCode')}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="PROP-001"
                            />
                            {form.formState.errors.internalCode && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.internalCode.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Localização *
                            </label>
                            <select
                                {...form.register('location')}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="US_MIAMI">Miami, FL</option>
                                <option value="US_ORLANDO">Orlando, FL</option>
                                <option value="US_NYC">Nova York, NY</option>
                                <option value="US_TAMPA">Tampa, FL</option>
                                <option value="UAE_DUBAI">Dubai, UAE</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Título *
                            </label>
                            <input
                                {...form.register('title')}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Apartamento 2 quartos em Brickell"
                            />
                            {form.formState.errors.title && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Descrição *
                            </label>
                            <textarea
                                {...form.register('description')}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Descrição detalhada do imóvel..."
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-600 mt-1">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </Card>

                {/* Localização */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Localização</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Endereço *
                            </label>
                            <input
                                {...form.register('address')}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="123 Main Street, Apt 456"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Cidade *
                            </label>
                            <input
                                {...form.register('city')}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Estado *
                            </label>
                            <input
                                {...form.register('state')}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                País *
                            </label>
                            <input
                                {...form.register('country')}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                CEP *
                            </label>
                            <input
                                {...form.register('zipCode')}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                    </div>
                </Card>

                {/* Características */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Características</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tipo *
                            </label>
                            <select
                                {...form.register('propertyType')}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="APARTMENT">Apartamento</option>
                                <option value="CONDO">Condomínio</option>
                                <option value="HOUSE">Casa</option>
                                <option value="TOWNHOUSE">Townhouse</option>
                                <option value="VILLA">Vila</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Quartos *
                            </label>
                            <input
                                type="number"
                                {...form.register('bedrooms', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Banheiros *
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                {...form.register('bathrooms', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Área *
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    {...form.register('area', { valueAsNumber: true })}
                                    className="flex-1 px-4 py-2 border rounded-lg"
                                />
                                <select
                                    {...form.register('areaUnit')}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    <option value="sqft">sqft</option>
                                    <option value="m2">m²</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Ano de Construção
                            </label>
                            <input
                                type="number"
                                {...form.register('yearBuilt', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="2020"
                            />
                        </div>
                    </div>
                </Card>

                {/* Financeiro */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Informações Financeiras</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Preço de Venda (USD) *
                            </label>
                            <input
                                type="number"
                                {...form.register('listPrice', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="300000"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Aluguel Estimado (USD/mês)
                            </label>
                            <input
                                type="number"
                                {...form.register('estimatedRent', { valueAsNumber: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="2500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tipo de Locação
                            </label>
                            <select
                                {...form.register('rentalType')}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="">Não se aplica</option>
                                <option value="LONG_TERM">Long-term</option>
                                <option value="SHORT_TERM">Short-term</option>
                                <option value="CORPORATE">Corporativo</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Status *
                            </label>
                            <select
                                {...form.register('status')}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="AVAILABLE">Disponível</option>
                                <option value="RESERVED">Reservado</option>
                                <option value="SOLD">Vendido</option>
                                <option value="OFF_MARKET">Fora do mercado</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...form.register('featured')}
                                className="w-4 h-4"
                            />
                            <span className="text-sm font-medium">
                                Destacar imóvel (featured)
                            </span>
                        </label>
                    </div>
                </Card>

                {/* Imagens */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                        Imagens * (mínimo 1)
                    </h3>

                    <PropertyImageUpload
                        onChange={(images) => form.setValue('images', images)}
                        maxImages={15}
                    />

                    {form.formState.errors.images && (
                        <p className="text-sm text-red-600 mt-2">
                            {form.formState.errors.images.message}
                        </p>
                    )}
                </Card>

                {/* Tour virtual */}
                <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Tour Virtual</h3>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            URL do Tour Virtual (Matterport, etc)
                        </label>
                        <input
                            {...form.register('virtualTourUrl')}
                            type="url"
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="https://..."
                        />
                    </div>
                </Card>

                {/* Ações */}
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        className="flex-1"
                    >
                        Cancelar
                    </Button>

                    <Button
                        type="submit"
                        disabled={submitting}
                        className="flex-1"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Cadastrando...
                            </>
                        ) : (
                            'Cadastrar Imóvel'
                        )}
                    </Button>
                </div>

            </form>

        </div>
    );
}
