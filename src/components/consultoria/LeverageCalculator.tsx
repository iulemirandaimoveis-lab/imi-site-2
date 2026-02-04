'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

export function LeverageCalculator() {
    const [propertyValue, setPropertyValue] = useState(500000);
    const [appreciationRate, setAppreciationRate] = useState(5); // 5% per year

    // Scenario A: All Cash
    const cashInvestment = propertyValue;
    const cashProfit5Years = propertyValue * Math.pow((1 + appreciationRate / 100), 5) - propertyValue;
    const cashRoi = (cashProfit5Years / cashInvestment) * 100;

    // Scenario B: Leveraged (40% Down)
    const downPayment = propertyValue * 0.40;
    const loanAmount = propertyValue - downPayment;
    // For simplicity, assuming rent covers mortgage (breakeven cashflow)
    // Profit is purely appreciation on the FULL asset value, but gained on a SMALLER investment
    const leveragedProfit5Years = (propertyValue * Math.pow((1 + appreciationRate / 100), 5)) - propertyValue;
    // Debt stays naturally constant (amortization ignored for simpler visual impact of leverage)
    const leveragedRoi = (leveragedProfit5Years / downPayment) * 100;

    return (
        <Card className="p-8 h-full bg-white border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">Poder da Alavancagem</h3>
            <p className="text-sm text-neutral-500 mb-6">Como o financiamento multiplica seu retorno sobre o capital investido.</p>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Valorização Anual Esperada: <span className="text-primary-700 font-bold">{appreciationRate}%</span>
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        step="0.5"
                        value={appreciationRate}
                        onChange={(e) => setAppreciationRate(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    {/* Scenario A */}
                    <div className="p-4 bg-neutral-50 rounded-lg text-center border border-neutral-100">
                        <p className="text-xs font-semibold text-neutral-500 uppercase">Pagamento à Vista (Cash)</p>
                        <p className="text-2xl font-bold text-neutral-800 mt-2">{cashRoi.toFixed(0)}%</p>
                        <p className="text-xs text-neutral-400">ROI em 5 Anos</p>
                    </div>

                    {/* Scenario B */}
                    <div className="p-4 bg-primary-50 rounded-lg text-center border border-primary-100 ring-1 ring-primary-500/20">
                        <p className="text-xs font-semibold text-primary-700 uppercase">Financiado (Alavancado)</p>
                        <p className="text-2xl font-bold text-primary-700 mt-2">{leveragedRoi.toFixed(0)}%</p>
                        <p className="text-xs text-primary-600/70">ROI em 5 Anos</p>
                    </div>
                </div>

                <div className="text-xs text-neutral-500 bg-neutral-50 p-3 rounded mt-4">
                    <span className="font-bold">Insight:</span> Ao usar o dinheiro do banco (com juros saudáveis), você ganha a valorização sobre o valor TOTAL do imóvel (${propertyValue.toLocaleString()}), tendo investido apenas a entrada (${downPayment.toLocaleString()}).
                </div>
            </div>
        </Card>
    );
}
