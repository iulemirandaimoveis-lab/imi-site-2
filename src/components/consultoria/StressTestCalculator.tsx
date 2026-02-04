'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

export function StressTestCalculator() {
    const [vacancyRate, setVacancyRate] = useState(30); // 30% vacancy

    // Simple logic: Can you survive if the property is empty X% of the time?
    const grossIncome = 50000; // illustrative annual income
    const expenses = 20000;
    const mortgage = 24000;

    // Adjusted Income
    const effectiveIncome = grossIncome * ((100 - vacancyRate) / 100);
    const netPosition = effectiveIncome - expenses - mortgage;

    const isSafe = netPosition > 0;

    return (
        <Card className="p-8 h-full bg-white border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Stress Test (Teste de Estresse)</h3>
            <p className="text-sm text-neutral-500 mb-6">Seu investimento sobrevive a uma crise ou baixa ocupação?</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Taxa de Vacância (Tempo vazio): <span className="font-bold">{vacancyRate}%</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(Number(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isSafe ? 'bg-green-200 accent-green-600' : 'bg-red-200 accent-red-600'}`}
                    />
                </div>

                <div className={`p-6 rounded-lg border-2 ${isSafe ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'} transition-colors duration-300`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isSafe ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isSafe ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h4 className={`font-bold ${isSafe ? 'text-green-800' : 'text-red-800'}`}>
                                {isSafe ? 'Saldo Positivo' : 'Fluxo de Caixa Negativo'}
                            </h4>
                            <p className="text-sm text-neutral-600">
                                {isSafe
                                    ? `Mesmo com ${vacancyRate}% de desocupação, o imóvel se paga e gera lucro.`
                                    : `Cuidado: Com ${vacancyRate}% de vacância, você precisará tirar dinheiro do bolso.`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
