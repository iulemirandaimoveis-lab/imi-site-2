'use client';

const locations = [
    {
        name: 'Orlando, FL',
        description: 'Capital mundial do turismo familiar. Alta ocupação o ano todo com Short-Term Rentals.',
        image: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Yield médio: 6-8% a.a.'
    },
    {
        name: 'Miami, FL',
        description: 'Luxo, valorização e demanda global. O centro financeiro da América Latina.',
        image: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Valorização: +12% a.a.'
    },
    {
        name: 'Dubai, UAE',
        description: 'Isenção de impostos e alto luxo. O mercado imobiliário mais dinâmico do oriente.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea936a7d40c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        stats: 'Tax-Free Income'
    }
];

export function LocationsSection() {
    return (
        <section id="locations" className="py-24 bg-neutral-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-display font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Mercados Premium Selecionados
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-neutral-600">
                        Atuamos apenas onde existe fundamentos sólidos de economia, turismo e valorização.
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {locations.map((location) => (
                        <article key={location.name} className="flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                            <div className="relative w-full">
                                <img
                                    src={location.image}
                                    alt={location.name}
                                    className="aspect-[16/9] w-full bg-neutral-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-neutral-900/10" />
                            </div>
                            <div className="max-w-xl p-8">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <span className="relative z-10 rounded-full bg-neutral-100 px-3 py-1.5 font-medium text-neutral-600 hover:bg-neutral-200">
                                        Internacional
                                    </span>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-neutral-900 group-hover:text-neutral-600">
                                        <span className="absolute inset-0" />
                                        {location.name}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-600">
                                        {location.description}
                                    </p>
                                </div>
                                <div className="mt-6 border-t border-neutral-100 pt-6 font-medium text-emerald-600 text-sm">
                                    {location.stats}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
