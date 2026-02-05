'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navigation = [
    { label: 'IMI - Apresentação', href: '/' },
    { label: 'Avaliações', href: '/avaliacoes' },
    { label: 'Imóveis', href: '/imoveis' },
    { label: 'Crédito', href: '/credito' },
    { label: 'Consultoria', href: '/consultoria' },
    { label: 'Inteligência', href: '/inteligencia' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
];

const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
            staggerChildren: 0.05,
        },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="flex items-center gap-3">
                            <span
                                className="text-2xl font-bold text-navy-900 tracking-tight transition-colors"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                IMI
                            </span>
                            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                            <span className="hidden sm:block text-[11px] font-medium text-gray-500 uppercase tracking-[0.15em] leading-[1.1]">
                                Inteligência<br />Imobiliária
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-10">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-gray-600 font-medium hover:text-navy-600 transition-colors duration-300 group"
                            >
                                {item.label}
                                <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-accent-600 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-4 rounded-xl hover:bg-gray-100/80 transition text-navy-600"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden fixed inset-0 top-[80px] bg-white z-[100] overflow-y-auto pb-32 shadow-2xl"
                    >
                        <nav className="px-8 py-10 flex flex-col space-y-2">
                            {navigation.map((item) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-xl font-display font-medium text-gray-800 hover:text-navy-600 py-5 border-b border-gray-50 last:border-none"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Footer in Menu */}
                            <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                                <p className="text-sm font-bold text-gray-900 mb-1">Iule Miranda</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">CRECI 17933 | CNAI 53290</p>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
