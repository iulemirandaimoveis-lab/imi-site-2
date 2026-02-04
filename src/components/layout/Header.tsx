'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navigation = [
    { label: 'IMI - Apresentação', href: '/' },
    { label: 'Avaliações', href: '/avaliacoes' },
    { label: 'Imóveis', href: '/imoveis' },
    { label: 'Consultoria', href: '/consultoria' },
    { label: 'Inteligência', href: '/inteligencia' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
];

const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, staggerChildren: 0.07 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-3xl font-black text-navy-700 tracking-tight">IMI</span>
                        <span className="text-base font-semibold text-gray-600 tracking-wide">Inteligência Imobiliária</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10 lg:gap-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-gray-700 font-medium hover:text-navy-600 transition-colors duration-300 group py-2"
                            >
                                {item.label}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-4 rounded-xl hover:bg-gray-100/80 transition text-navy-600"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden bg-gradient-to-b from-white to-offwhite shadow-xl overflow-hidden"
                    >
                        <div className="px-8 py-12 space-y-8">
                            {navigation.map((item) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-xl font-semibold text-gray-900 hover:text-navy-600 transition duration-300 py-4 border-b border-gray-100 last:border-none"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
