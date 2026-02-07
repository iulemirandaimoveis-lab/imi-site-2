'use client';

import { cn } from '@/lib/utils';

interface DevelopmentFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

export default function DevelopmentFilters({ activeFilter, onFilterChange }: DevelopmentFiltersProps) {
    const filters = [
        { label: 'Todos', value: 'all' },
        { label: 'Lançamento', value: 'launch' },
        { label: 'Pronta Entrega', value: 'ready' },
        { label: 'Frente Mar', value: 'frente-mar' },
        { label: 'Casas', value: 'casas' },
        { label: 'Luxo', value: 'luxo' },
    ];

    return (
        <div className="sticky top-16 lg:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 overflow-hidden">
            <div className="container-custom">
                <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-1">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => onFilterChange(filter.value)}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap snap-start border",
                                activeFilter === filter.value
                                    ? "bg-navy-900 text-white border-navy-900 shadow-md"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
