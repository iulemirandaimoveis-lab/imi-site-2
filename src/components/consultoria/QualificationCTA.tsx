'use client';

import Button from '@/components/ui/Button';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export function QualificationCTA() {
    return (
        <section className="relative py-24 bg-primary-900 overflow-hidden isolate">
            {/* Abstract Background */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.primary.100),theme(colors.neutral.900))] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-neutral-900 shadow-xl shadow-primary-600/10 ring-1 ring-primary-500 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
                        Vamos estruturar seu plano internacional?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
                        Agende uma sessão estratégica com nossos especialistas para analisar seu perfil e apresentar as melhores teses de investimento disponíveis hoje.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="bg-white text-primary-900 hover:bg-neutral-100 ring-1 ring-white/10" asChild>
                            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20queria%20agendar%20uma%20sess%C3%A3o%20estrat%C3%A9gica%20sobre%20im%C3%B3veis%20internacionais.">
                                Agendar Sessão Gratuita
                            </a>
                        </Button>
                        <a href="#simulator" className="text-sm font-semibold leading-6 text-white flex items-center gap-1 group">
                            Voltar ao simulador <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

