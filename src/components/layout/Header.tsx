'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface HeaderProps {
    lang: string;
    dict: {
        presentation: string;
        services: string;
        properties: string;
        credit: string;
        consulting: string;
        intelligence: string;
        projects: string;
        about: string;
        contact: string;
        whatsapp: string;
    }
}

const langOptions = [
    {
        code: 'pt', label: 'Português', flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                <rect width="640" height="480" fill="#009c3b" />
                <polygon points="320,40 600,240 320,440 40,240" fill="#ffdf00" />
                <circle cx="320" cy="240" r="80" fill="#002776" />
            </svg>
        )
    },
    {
        code: 'en', label: 'English', flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                <rect width="640" height="480" fill="#012169" />
                <path d="m0 0 640 480M640 0 0 480" stroke="#fff" strokeWidth="80" />
                <path d="m0 0 640 480M640 0 0 480" stroke="#C8102E" strokeWidth="50" />
                <rect x="240" width="160" height="480" fill="#fff" />
                <rect y="160" width="640" height="160" fill="#fff" />
                <rect x="268" width="104" height="480" fill="#C8102E" />
                <rect y="188" width="640" height="104" fill="#C8102E" />
            </svg>
        )
    },
    {
        code: 'ja', label: '日本語', flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                <rect width="640" height="480" fill="#fff" />
                <circle cx="320" cy="240" r="120" fill="#bc002d" />
            </svg>
        )
    },
    {
        code: 'ar', label: 'العربية', flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                <rect width="640" height="160" fill="#00732f" />
                <rect y="160" width="640" height="160" fill="#fff" />
                <rect y="320" width="640" height="160" fill="#000" />
                <polygon points="0,0 200,240 0,480" fill="#ce1126" />
            </svg>
        )
    },
    {
        code: 'es', label: 'Español', flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-3.5 rounded-sm shadow-sm group-hover:scale-110 transition-transform">
                <rect width="640" height="480" fill="#c60b1e" />
                <rect y="120" width="640" height="240" fill="#ffc400" />
            </svg>
        )
    },
];

export default function Header({ lang, dict }: HeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { label: dict.services, href: `/${lang}/avaliacoes` },
        { label: dict.properties, href: `/${lang}/imoveis` },
        { label: dict.credit, href: `/${lang}/credito` },
        { label: dict.consulting, href: `/${lang}/consultoria` },
        { label: dict.intelligence, href: `/${lang}/inteligencia` },
        { label: dict.about, href: `/${lang}/sobre` },
        { label: dict.contact, href: `/${lang}/contato` },
    ];

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
        <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-imi-100 shadow-header">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href={`/${lang}`} className="flex items-center space-x-3 group z-[110]" onClick={() => setIsOpen(false)}>
                        <div className="flex items-center gap-3">
                            <span
                                className="text-2xl font-bold text-imi-900 tracking-tight transition-colors"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                IMI
                            </span>
                            <div className="h-6 w-px bg-imi-100"></div>
                            <span className="text-[10px] sm:text-[11px] font-medium text-imi-400 uppercase tracking-[0.15em] leading-[1.1]">
                                Inteligência<br />Imobiliária
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative text-sm font-medium tracking-tight transition-colors duration-300",
                                    pathname === item.href
                                        ? "text-imi-900 after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-accent-500"
                                        : "text-imi-400 hover:text-imi-900"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Lang Selector with Flags */}
                        <div className="flex items-center gap-2 ml-4 border-l border-imi-100 pl-4">
                            {langOptions.map((opt) => (
                                <Link
                                    key={opt.code}
                                    href={`/${opt.code}`}
                                    className={cn(
                                        "group flex items-center justify-center p-1 rounded-md transition-all",
                                        lang === opt.code ? "bg-imi-50 ring-1 ring-imi-200" : "grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                                    )}
                                    title={opt.label}
                                >
                                    {opt.flag}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* tablet/Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-imi-50 transition text-imi-900 z-[110]"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="fixed inset-0 bg-imi-900/20 backdrop-blur-sm z-[90] lg:hidden"
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
                        className="lg:hidden fixed inset-x-0 top-0 pt-[env(safe-area-inset-top,20px)] bg-white z-[95] shadow-2xl overflow-y-auto h-[100dvh] flex flex-col"
                    >
                        <div className="h-16 flex items-center justify-end px-6 mb-4">
                            {/* Placeholder for safe area toggle */}
                        </div>

                        <nav className="px-6 flex flex-col space-y-1">
                            {navigation.map((item) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block text-lg font-medium py-3 px-4 rounded-xl transition-all h-12 flex items-center",
                                            pathname === item.href
                                                ? "text-imi-900 bg-imi-50 border-l-2 border-accent-500"
                                                : "text-imi-500 hover:text-imi-900 hover:bg-imi-50"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="pt-6 mt-6 border-t border-imi-100">
                                <Button asChild fullWidth variant="primary" className="h-14">
                                    <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">
                                        {dict.whatsapp}
                                    </a>
                                </Button>
                            </motion.div>

                            {/* Mobile Lang Selector with Flags and Labels */}
                            <div className="mt-8 grid grid-cols-1 gap-2">
                                {langOptions.map((opt) => (
                                    <motion.div key={opt.code} variants={itemVariants}>
                                        <Link
                                            href={`/${opt.code}`}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-2xl transition-all",
                                                lang === opt.code ? "bg-imi-50 border border-imi-100" : "grayscale opacity-70 hover:grayscale-0"
                                            )}
                                        >
                                            <div className="w-8">{opt.flag}</div>
                                            <span className={cn("text-sm font-bold uppercase", lang === opt.code ? "text-imi-900" : "text-imi-400")}>
                                                {opt.label}
                                            </span>
                                            {lang === opt.code && (
                                                <div className="ml-auto w-2 h-2 rounded-full bg-accent-500" />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile Footer in Menu */}
                            <div className="mt-8 p-6 bg-imi-50 rounded-2xl mb-12">
                                <p className="text-sm font-bold text-imi-900 mb-1">Iule Miranda</p>
                                <p className="text-[10px] text-imi-400 uppercase tracking-widest">CRECI 17933 | CNAI 53290</p>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

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
