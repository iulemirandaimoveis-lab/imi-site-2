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

    // Close menu on resize if above mobile breakpoint
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
                    <div className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 group z-[110]" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3">
                                <span
                                    className="text-2xl font-bold text-navy-900 tracking-tight transition-colors"
                                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                                >
                                    IMI
                                </span>
                                <div className="h-6 w-px bg-gray-200"></div>
                                <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 uppercase tracking-[0.15em] leading-[1.1]">
                                    Inteligência<br />Imobiliária
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="relative text-gray-600 font-medium hover:text-navy-600 transition-colors duration-300 text-sm tracking-tight"
                                >
                                    {item.label}
                                    <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-accent-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition text-navy-600 z-[110]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="md:hidden fixed inset-x-0 top-0 pt-24 pb-12 bg-white z-[95] shadow-2xl overflow-y-auto max-h-[100vh] flex flex-col"
                        >
                            <nav className="px-6 py-4 flex flex-col space-y-1">
                                {navigation.map((item) => (
                                    <motion.div key={item.href} variants={itemVariants}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-xl font-display font-medium text-gray-800 hover:text-navy-600 py-4 px-4 hover:bg-gray-50 rounded-xl transition-all"
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Footer in Menu */}
                                <div className="mt-8 p-6 bg-neutral-50 rounded-2xl mx-4">
                                    <p className="text-sm font-bold text-neutral-900 mb-1">Iule Miranda</p>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">CRECI 17933 | CNAI 53290</p>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            {/* Spacer to push content down below fixed header */}
            <div className="h-20 lg:h-24" />
        </>
    );
}
