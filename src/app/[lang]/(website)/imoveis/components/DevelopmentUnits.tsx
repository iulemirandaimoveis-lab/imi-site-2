'use client';

import { useState } from 'react';
import { Development, DevelopmentUnit } from '../types/development';
import { formatBRL } from '../data/developments';
import Button from '@/components/ui/Button';
import { MessageCircle, Info } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface DevelopmentUnitsProps {
    development: Development;
}

export default function DevelopmentUnits({ development }: DevelopmentUnitsProps) {
    const [showAll, setShowAll] = useState(false);
    const unitsToShow = showAll ? development.units : development.units.slice(0, 10);

    const handleWhatsApp = (unit: DevelopmentUnit) => {
        const message = encodeURIComponent(
            `Olá! Tenho interesse na unidade ${unit.unit} do empreendimento ${development.name}. Gostaria de mais informações.`
        );
        window.open(`https://wa.me/5581997230455?text=${message}`, '_blank');
    };

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-3xl md:text-4xl text-imi-900 mb-4 font-bold">Unidades Disponíveis</h2>
                        <p className="text-imi-500 font-light text-lg">
                            Confira a disponibilidade em tempo real das unidades integradas à curadoria IMI.
                            Valores sujeitos a alteração sem aviso prévio.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-imi-50 border border-imi-100 px-4 py-2 rounded-lg text-imi-500 text-xs font-medium">
                        <Info className="w-4 h-4 text-accent-600" />
                        <span>Tabela atualizada: {new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>

                {/* Tabela Desktop */}
                <div className="hidden md:block overflow-hidden rounded-2xl border border-imi-200 shadow-card">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-imi-50 border-b border-imi-200">
                                <th className="text-left p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Unidade</th>
                                <th className="text-left p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Tipo</th>
                                <th className="text-left p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Área</th>
                                {development.units.some(u => u.position) && (
                                    <th className="text-left p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Posição</th>
                                )}
                                {development.units.some(u => u.tower) && (
                                    <th className="text-left p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Torre</th>
                                )}
                                <th className="text-right p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Valor Total</th>
                                <th className="text-center p-6 font-bold text-imi-900 text-xs uppercase tracking-widest">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unitsToShow.map((unit) => (
                                <tr key={unit.id} className="border-b border-imi-100 hover:bg-imi-50/50 transition-colors group">
                                    <td className="p-6 font-bold text-imi-900">{unit.unit}</td>
                                    <td className="p-6">
                                        <Badge className="text-[10px] font-bold py-0.5 px-2 bg-white border border-imi-200">{unit.type}</Badge>
                                    </td>
                                    <td className="p-6 text-imi-600">{unit.area.toFixed(2)}m²</td>
                                    {development.units.some(u => u.position) && (
                                        <td className="p-6 text-imi-500 text-sm">{unit.position || '-'}</td>
                                    )}
                                    {development.units.some(u => u.tower) && (
                                        <td className="p-6 text-imi-500 text-sm">
                                            <span className="font-bold text-imi-800">{unit.tower || '-'}</span>
                                        </td>
                                    )}
                                    <td className="p-6 text-right font-bold text-imi-900">
                                        {formatBRL(unit.totalPrice)}
                                    </td>
                                    <td className="p-6 text-center">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-10 text-xs px-6 uppercase tracking-wider font-bold"
                                            onClick={() => handleWhatsApp(unit)}
                                        >
                                            <MessageCircle className="w-3.5 h-3.5 mr-2" />
                                            Simular
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Cards Mobile */}
                <div className="md:hidden space-y-6">
                    {unitsToShow.map((unit) => (
                        <div key={unit.id} className="bg-white border border-imi-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="font-bold text-xl text-imi-900">Unidade {unit.unit}</p>
                                        <Badge className="text-[10px] uppercase font-bold border border-imi-200">{unit.type}</Badge>
                                    </div>
                                    {unit.tower && <p className="text-xs text-imi-400 font-bold uppercase tracking-widest">Torre {unit.tower}</p>}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-accent-600 uppercase tracking-tighter">Valor</p>
                                    <p className="text-xl font-bold text-imi-900">
                                        {formatBRL(unit.totalPrice)}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-imi-50 p-4 rounded-xl">
                                <div>
                                    <span className="text-imi-400 font-bold uppercase tracking-tighter blcok mb-1">Área Privativa</span>
                                    <p className="font-bold text-imi-900 text-sm">{unit.area.toFixed(2)}m²</p>
                                </div>
                                {unit.position && (
                                    <div>
                                        <span className="text-imi-400 font-bold uppercase tracking-tighter block mb-1">Posição Sol</span>
                                        <p className="font-bold text-imi-900 text-sm">{unit.position}</p>
                                    </div>
                                )}
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-14 font-bold text-sm uppercase tracking-[0.2em]"
                                onClick={() => handleWhatsApp(unit)}
                            >
                                <MessageCircle className="w-5 h-5 mr-3" />
                                Simular fluxo
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Botão Ver Mais */}
                {development.units.length > 10 && !showAll && (
                    <div className="mt-12 text-center">
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-12 h-14 font-bold text-sm uppercase tracking-[0.2em] border-imi-300 hover:border-imi-900"
                            onClick={() => setShowAll(true)}
                        >
                            Ver todas as {development.units.length} unidades
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
