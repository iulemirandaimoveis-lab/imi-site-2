'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    Rocket,
    Key,
    Waves,
    Home,
    Gem,
    Check
} from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

interface FilterOption {
    label: string;
    value: string;
    icon: React.ElementType;
}

interface DevelopmentFiltersProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const filters: FilterOption[] = [
    { label: 'Todos', value: 'all', icon: Building2 },
    { label: 'Lançamento', value: 'launch', icon: Rocket },
    { label: 'Pronta Entrega', value: 'ready', icon: Key },
    { label: 'Frente Mar', value: 'frente-mar', icon: Waves },
    { label: 'Casas', value: 'casas', icon: Home },
    { label: 'Luxo', value: 'luxo', icon: Gem },
];

export default function DevelopmentFilters({ activeFilter, onFilterChange }: DevelopmentFiltersProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    // Efeito de sombra/fade nas bordas para indicar scroll
    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
            <div className="container-custom relative">
                {/* Gradiente Esquerdo (Indicador de Scroll) */}
                <AnimatePresence>
                    {showLeftArrow && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Gradiente Direito (Indicador de Scroll) */}
                <AnimatePresence>
                    {showRightArrow && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Container de Scroll */}
                <div
                    ref={containerRef}
                    className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x py-4 px-1"
                >
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter.value;
                        const Icon = filter.icon;

                        return (
                            <button
                                key={filter.value}
                                onClick={() => onFilterChange(filter.value)}
                                className={cn(
                                    "relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 snap-start shrink-0 border outline-none",
                                    isActive
                                        ? "bg-navy-900 border-navy-900 text-white shadow-lg shadow-navy-900/20 scale-105"
                                        : "bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-slate-100 hover:border-slate-300 active:scale-95"
                                )}
                            >
                                {/* Ícone com animação de feedback */}
                                <Icon className={cn(
                                    "w-4 h-4 transition-transform duration-300",
                                    isActive ? "scale-110 text-gold-500" : "text-slate-400 group-hover:text-slate-600"
                                )} />

                                <span className="tracking-tight uppercase text-[11px] whitespace-nowrap">
                                    {filter.label}
                                </span>

                                {/* Badge de Verificado/Selecionado Estilo Apple */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilterIndicator"
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center border-2 border-white"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                    >
                                        <Check className="w-2.5 h-2.5 text-navy-900 stroke-[4px]" />
                                    </motion.div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
