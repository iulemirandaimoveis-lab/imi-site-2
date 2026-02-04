'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

export function InvestmentSimulator() {
    const [propertyValue, setPropertyValue] = useState(500000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(40);
    const [interestRate, setInterestRate] = useState(6.5);
    const [rentalYield, setRentalYield] = useState(8); // Short term average

    const [monthlyCashflow, setMonthlyCashflow] = useState(0);
    const [cocReturn, setCocReturn] = useState(0);

    // Calculation Logic
    useEffect(() => {
        const downPayment = propertyValue * (downPaymentPercent / 100);
        const loanAmount = propertyValue - downPayment;

        // Monthly Mortgage (Simple approximation)
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = 30 * 12; // 30 Years
        const monthlyMortgage = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Expenses (Approx 40% of gross rent for Short Term - includes management, HOA, taxes)
        const grossMonthlyIncome = (propertyValue * (rentalYield / 100)) / 12;
        const expenses = grossMonthlyIncome * 0.40;

        const netOperatingIncome = grossMonthlyIncome - expenses;
        const cashflow = netOperatingIncome - monthlyMortgage;

        const annualCashflow = cashflow * 12;
        const initialInvestment = downPayment + (propertyValue * 0.04); // Closing costs approx 4%

        const cashOnCash = (annualCashflow / initialInvestment) * 100;

        setMonthlyCashflow(cashflow);
        setCocReturn(cashOnCash);
    }, [propertyValue, downPaymentPercent, interestRate, rentalYield]);

    return (
        <Card className="p-8 bg-white shadow-xl border-neutral-200" id="simulator">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Inputs */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary-600 rounded-full" />
                            Parâmetros do Investimento
                        </h3>

                        <div className="space-y-6">
                            {/* Property Value */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Valor do Imóvel: <span className="text-primary-700 font-bold">${propertyValue.toLocaleString()}</span>
                                </label>
                                <input
                                    type="range"
                                    min="200000"
                                    max="2000000"
                                    step="50000"
                                    value={propertyValue}
                                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                    <span>$200k</span>
                                    <span>$2M+</span>
                                </div>
                            </div>

                            {/* Down Payment */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Entrada (Down Payment): <span className="text-primary-700 font-bold">{downPaymentPercent}%</span>
                                    <span className="text-xs text-neutral-500 ml-2">(${(propertyValue * (downPaymentPercent / 100)).toLocaleString()})</span>
                                </label>
                                <input
                                    type="range"
                                    min="25"
                                    max="100"
                                    step="5"
                                    value={downPaymentPercent}
                                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Taxa de Juros (Anual): <span className="text-primary-700 font-bold">{interestRate}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="4"
                                    max="9"
                                    step="0.25"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                            </div>

                            {/* Yield */}
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Retorno Bruto (Yield): <span className="text-primary-700 font-bold">{rentalYield}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="4"
                                    max="12"
                                    step="0.5"
                                    value={rentalYield}
                                    onChange={(e) => setRentalYield(Number(e.target.value))}
                                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                                />
                                <p className="text-xs text-neutral-500 mt-1">Estimativa baseada em Short-Term Rental (Airbnb)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outputs */}
                <div className="bg-neutral-900 rounded-2xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary-600 rounded-full opacity-10 blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 p-32 bg-secondary-900 rounded-full opacity-10 blur-3xl -ml-16 -mb-16"></div>

                    <div className="relative z-10 space-y-8">
                        <div>
                            <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Cashflow Mensal Estimado</p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-4xl font-display font-bold text-green-400">
                                    ${Math.max(0, monthlyCashflow).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-neutral-400">/mês</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Líquido após hipoteca e despesas operacionais</p>
                        </div>

                        <div className="w-full h-px bg-neutral-800" />

                        <div>
                            <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider">Retorno sobre Capital (CoC)</p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className={`text-4xl font-display font-bold ${cocReturn > 0 ? 'text-blue-400' : 'text-red-400'}`}>
                                    {cocReturn.toFixed(1)}%
                                </span>
                                <span className="text-neutral-400">a.a.</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">Retorno percentual sobre o dinheiro investido (Entrada + Custos)</p>
                        </div>

                        <div className="pt-4">
                            <button className="w-full py-3 px-4 bg-white text-neutral-900 font-bold rounded-lg hover:bg-neutral-100 transition-colors">
                                Receber Relatório Detalhado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs text-neutral-400 mt-6 text-center italic">
                *Simulação ilustrativa. Não considere como garantia de ganhos. Valores variam conforme localização e gestão.
            </p>
        </Card>
    );
}
