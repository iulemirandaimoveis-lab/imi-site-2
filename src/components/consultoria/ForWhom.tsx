'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const features = [
    {
        title: 'Para quem busca Renda Passiva',
        description: 'Construa um portfólio que paga seus custos de vida sem depender do seu trabalho ativo.',
        icon: CheckCircleIcon,
        positive: true
    },
    {
        title: 'Para Diversificação Global',
        description: 'Não deixe todo seu patrimônio exposto ao risco Brasil e à volatilidade cambial.',
        icon: CheckCircleIcon,
        positive: true
    },
    {
        title: 'Para Preservação de Capital',
        description: 'Imóveis em moeda forte historicamente protegem contra a inflação e crises locais.',
        icon: CheckCircleIcon,
        positive: true
    },
    {
        title: 'Não é para Especulação de Curto Prazo',
        description: 'Focamos em valorização sólida e consistente, não em apostas arriscadas.',
        icon: XCircleIcon,
        positive: false
    }
];

export function ForWhom() {
    return (
        <section className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-display font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Esta estratégia é para você?
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-neutral-600">
                        Nossa consultoria é especializada em investidores que buscam solidez, segurança e renda recorrente.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex flex-col items-start">
                                <div className={`rounded-lg p-2 ring-1 ring-inset ${feature.positive ? 'bg-primary-50 ring-primary-200' : 'bg-red-50 ring-red-200'}`}>
                                    <feature.icon className={`h-6 w-6 ${feature.positive ? 'text-primary-700' : 'text-red-700'}`} aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-neutral-900 leading-7">
                                    {feature.title}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-neutral-600">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
