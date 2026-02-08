'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Loader2, Calendar, Target, Gift, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

interface CreateCalendarModalProps {
    tenant_id: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateCalendarModal({
    tenant_id,
    onClose,
    onSuccess,
}: CreateCalendarModalProps) {
    const [step, setStep] = useState<1 | 2>(1);
    const [generating, setGenerating] = useState(false);

    // Form data
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [formData, setFormData] = useState({
        month: currentMonth < 12 ? currentMonth + 1 : 1,
        year: currentMonth < 12 ? currentYear : currentYear + 1,
        objectives: [''] as string[],
        offers: [{ title: '', date: '', description: '' }],
        strategic_dates: [{ date: '', event: '' }],
        custom_instructions: '',
    });

    const addObjective = () => {
        setFormData({ ...formData, objectives: [...formData.objectives, ''] });
    };

    const updateObjective = (index: number, value: string) => {
        const newObjectives = [...formData.objectives];
        newObjectives[index] = value;
        setFormData({ ...formData, objectives: newObjectives });
    };

    const removeObjective = (index: number) => {
        setFormData({
            ...formData,
            objectives: formData.objectives.filter((_, i) => i !== index),
        });
    };

    const addOffer = () => {
        setFormData({
            ...formData,
            offers: [...formData.offers, { title: '', date: '', description: '' }],
        });
    };

    const updateOffer = (index: number, field: string, value: string) => {
        const newOffers = [...formData.offers];
        newOffers[index] = { ...newOffers[index], [field]: value };
        setFormData({ ...formData, offers: newOffers });
    };

    const removeOffer = (index: number) => {
        setFormData({
            ...formData,
            offers: formData.offers.filter((_, i) => i !== index),
        });
    };

    const handleGenerate = async () => {
        // Validação básica
        const validObjectives = formData.objectives.filter((o) => o.trim());
        if (validObjectives.length === 0) {
            toast.error('Adicione pelo menos um objetivo');
            return;
        }

        setGenerating(true);

        try {
            const response = await fetch('/api/ai/generate-calendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenant_id,
                    month: formData.month,
                    year: formData.year,
                    objectives: validObjectives,
                    offers: formData.offers.filter((o) => o.title && o.date),
                    strategic_dates: formData.strategic_dates.filter((d) => d.date && d.event),
                    custom_instructions: formData.custom_instructions,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao gerar calendário');
            }

            const result = await response.json();

            toast.success('Calendário gerado com sucesso!', {
                description: `${result.ai_plan?.suggested_posts?.length || 0} posts planejados`,
            });

            onSuccess();
        } catch (error: any) {
            console.error('Error generating calendar:', error);
            toast.error('Erro ao gerar calendário', {
                description: error.message,
            });
        } finally {
            setGenerating(false);
        }
    };

    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-imi-900/40 backdrop-blur-sm z-[300]"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-[310] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-imi-100 flex items-center justify-between bg-gradient-to-r from-imi-50 to-white">
                    <div>
                        <h2 className="text-2xl font-bold text-imi-900 font-display flex items-center gap-3">
                            <Sparkles className="text-accent-500" />
                            Criar Calendário com IA
                        </h2>
                        <p className="text-sm text-imi-500 mt-1">
                            Claude vai planejar 30 dias de conteúdo estratégico
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-imi-100 rounded-full transition-colors"
                        disabled={generating}
                    >
                        <X size={24} className="text-imi-900" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        {/* Período */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-imi-900">
                                <Calendar size={20} className="text-accent-500" />
                                <h3 className="text-lg font-bold">Período</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-imi-700 mb-2">
                                        Mês
                                    </label>
                                    <select
                                        className="w-full rounded-xl border-imi-100 focus:ring-accent-500"
                                        value={formData.month}
                                        onChange={(e) =>
                                            setFormData({ ...formData, month: parseInt(e.target.value) })
                                        }
                                    >
                                        {months.map((month, i) => (
                                            <option key={i} value={i + 1}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-imi-700 mb-2">
                                        Ano
                                    </label>
                                    <select
                                        className="w-full rounded-xl border-imi-100 focus:ring-accent-500"
                                        value={formData.year}
                                        onChange={(e) =>
                                            setFormData({ ...formData, year: parseInt(e.target.value) })
                                        }
                                    >
                                        <option value={currentYear}>{currentYear}</option>
                                        <option value={currentYear + 1}>{currentYear + 1}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Objetivos */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-imi-900">
                                    <Target size={20} className="text-accent-500" />
                                    <h3 className="text-lg font-bold">Objetivos do Mês</h3>
                                </div>
                                <button
                                    onClick={addObjective}
                                    className="text-sm font-bold text-accent-600 hover:underline"
                                >
                                    + Adicionar
                                </button>
                            </div>
                            {formData.objectives.map((obj, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-imi-100 focus:ring-accent-500"
                                        placeholder="Ex: Gerar 50 leads qualificados"
                                        value={obj}
                                        onChange={(e) => updateObjective(i, e.target.value)}
                                    />
                                    {formData.objectives.length > 1 && (
                                        <button
                                            onClick={() => removeObjective(i)}
                                            className="px-3 text-red-600 hover:bg-red-50 rounded-xl"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Ofertas (Opcional) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-imi-900">
                                    <Gift size={20} className="text-accent-500" />
                                    <h3 className="text-lg font-bold">Ofertas Especiais</h3>
                                    <span className="text-xs text-imi-400 font-normal">(Opcional)</span>
                                </div>
                                <button
                                    onClick={addOffer}
                                    className="text-sm font-bold text-accent-600 hover:underline"
                                >
                                    + Adicionar
                                </button>
                            </div>
                            {formData.offers.map((offer, i) => (
                                <div key={i} className="p-4 bg-imi-50 rounded-2xl space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 rounded-xl border-imi-100 focus:ring-accent-500 text-sm"
                                            placeholder="Título da oferta"
                                            value={offer.title}
                                            onChange={(e) => updateOffer(i, 'title', e.target.value)}
                                        />
                                        <input
                                            type="date"
                                            className="rounded-xl border-imi-100 focus:ring-accent-500 text-sm"
                                            value={offer.date}
                                            onChange={(e) => updateOffer(i, 'date', e.target.value)}
                                        />
                                        <button
                                            onClick={() => removeOffer(i)}
                                            className="px-3 text-red-600 hover:bg-red-100 rounded-xl"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <textarea
                                        className="w-full rounded-xl border-imi-100 focus:ring-accent-500 text-sm"
                                        placeholder="Descrição (opcional)"
                                        rows={2}
                                        value={offer.description}
                                        onChange={(e) => updateOffer(i, 'description', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Instruções Adicionais */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-imi-900">
                                <AlertCircle size={20} className="text-accent-500" />
                                <h3 className="text-lg font-bold">Instruções Adicionais</h3>
                                <span className="text-xs text-imi-400 font-normal">(Opcional)</span>
                            </div>
                            <textarea
                                className="w-full rounded-xl border-imi-100 focus:ring-accent-500"
                                placeholder="Ex: Evitar posts políticos. Focar em imóveis de luxo. Tom profissional mas acessível..."
                                rows={4}
                                value={formData.custom_instructions}
                                onChange={(e) =>
                                    setFormData({ ...formData, custom_instructions: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-imi-100 bg-imi-50/50 flex items-center justify-between">
                    <div className="text-sm text-imi-600">
                        <span className="font-bold">Custo estimado:</span> ~$0.15 USD
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} disabled={generating}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                            className="bg-accent-600 hover:bg-accent-700 min-w-[200px]"
                        >
                            {generating ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={20} />
                                    Gerando com Claude...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2" size={20} />
                                    Gerar Calendário
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
