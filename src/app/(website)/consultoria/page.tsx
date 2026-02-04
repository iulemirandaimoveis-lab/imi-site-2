import { HeroSection } from '@/components/consultoria/HeroSection';
import { ForWhom } from '@/components/consultoria/ForWhom';
import { LocationsSection } from '@/components/consultoria/LocationsSection';
import { InvestmentSimulator } from '@/components/consultoria/InvestmentSimulator';
import { LeverageCalculator } from '@/components/consultoria/LeverageCalculator';
import { StressTestCalculator } from '@/components/consultoria/StressTestCalculator';
import { QualificationCTA } from '@/components/consultoria/QualificationCTA';
import { LegalDisclaimer } from '@/components/consultoria/LegalDisclaimer';
import Header from '@/components/layout/Header';

export const metadata = {
    title: 'Consultoria - Renda Imobiliária Internacional | IMI',
    description: 'Gere renda em dólar com imóveis internacionais. Estrutura jurídica, gestão profissional e crédito inteligente.'
};

export default function ConsultoriaPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header should be included in layout, but added here if standalone layout needed, mostly likely layout.tsx handles it */}

            {/* Hero */}
            <HeroSection />

            {/* Para quem é / não é */}
            <ForWhom />

            {/* Localizações */}
            <LocationsSection />

            {/* Simulador principal */}
            <section className="py-12 md:py-24 bg-neutral-50" id="simulator">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Ferramentas Exclusivas</span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-4 text-neutral-900">
                                Simule seu Investimento em Tempo Real
                            </h2>
                            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                                Ajuste os valores, entrada e taxas para visualizar o potencial de retorno (Cash-on-Cash) e fluxo de caixa mensal.
                            </p>
                        </div>

                        <InvestmentSimulator />
                    </div>
                </div>
            </section>

            {/* Calculadoras avançadas */}
            <section className="py-12 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-12">

                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-neutral-900">
                                Teste de Robustez & Alavancagem
                            </h2>
                            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
                                Investidor profissional não conta com a sorte. Teste cenários adversos e entenda como o crédito bancário americano potencializa seus ganhos.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                            <div className="h-full">
                                <LeverageCalculator />
                            </div>
                            <div className="h-full">
                                <StressTestCalculator />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <QualificationCTA />

            {/* Disclaimer */}
            <section className="py-8 md:py-12 bg-neutral-50 px-6">
                <div className="container mx-auto max-w-4xl">
                    <LegalDisclaimer />
                </div>
            </section>

        </div>
    );
}
