'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function StressTestCalculator() {
    const [vacancyRate, setVacancyRate] = useState(30);

    const grossIncome = 50000;
    const expenses = 20000;
    const mortgage = 24000;

    const effectiveIncome = grossIncome * ((100 - vacancyRate) / 100);
    const netPosition = effectiveIncome - expenses - mortgage;

    const isSafe = netPosition > 0;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-soft border border-imi-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-imi-900 mb-2 font-display">Teste de Estresse</h3>
            <p className="text-sm text-imi-500 mb-8">Avalie a resiliência do seu investimento frente a períodos de baixa ocupação.</p>

            <div className="space-y-8 flex-grow">
                <div>
                    <div className="flex justify-between mb-4">
                        <label className="text-xs font-bold text-imi-500 uppercase tracking-widest">
                            Simular Taxa de Vacância
                        </label>
                        <span className={`font-bold ${vacancyRate > 50 ? 'text-red-500' : 'text-imi-900'}`}>{vacancyRate}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(Number(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer transition-colors duration-500 ${isSafe ? 'bg-imi-100 accent-imi-900' : 'bg-red-100 accent-red-500'}`}
                    />
                </div>

                <div className={`p-8 rounded-2xl border-2 transition-all duration-500 flex flex-col items-center text-center ${isSafe ? 'bg-green-50/50 border-green-100' : 'bg-red-50 border-red-100 shadow-lg shadow-red-500/10'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isSafe ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {isSafe ? <CheckCircle2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8 animate-pulse" />}
                    </div>

                    <h4 className={`text-xl font-bold mb-3 font-display ${isSafe ? 'text-green-900' : 'text-red-900'}`}>
                        {isSafe ? 'Investimento Resiliente' : 'Alerta de Fluxo de Caixa'}
                    </h4>

                    <p className={`text-sm leading-relaxed ${isSafe ? 'text-green-700/80' : 'text-red-700/80'}`}>
                        {isSafe
                            ? `Mesmo com o imóvel vazio em ${vacancyRate}% do ano, sua operação continua solvente e saudável.`
                            : `Atenção: Com ${vacancyRate}% de vacância, o aluguel não cobre as despesas e financiamento no cenário simulado.`
                        }
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-1">Ponto de Equilíbrio</div>
                        <div className="text-sm font-bold text-imi-900">12% de Vacância</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-1">Margem de Segurança</div>
                        <div className="text-sm font-bold text-imi-900">Alta</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
