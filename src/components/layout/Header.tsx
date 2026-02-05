'use client';

import { useState } from 'react';
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
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.4,
            ease: 'easeOut',
            when: 'beforeChildren',
            staggerChildren: 0.07,
        },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <span className="text-3xl font-extrabold text-navy-700 group-hover:text-navy-800 transition-colors">IMI</span>
                        <span className="text-base font-medium text-gray-500 tracking-wide">Inteligência Imobiliária</span>
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
                                <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-600 group-hover:w-full transition-all duration-300"></span>
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

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden bg-gradient-to-b from-white to-gray-50/90 shadow-xl overflow-hidden"
                    >
                        <nav className="px-8 py-12 space-y-8">
                            {navigation.map((item) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-xl font-medium text-gray-800 hover:text-navy-600 transition-colors duration-300 py-4 border-b border-gray-100 last:border-none"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
