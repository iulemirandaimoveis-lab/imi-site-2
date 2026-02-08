'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Building2,
    Building,
    Calendar,
    Settings,
    X,
    Menu,
    LogOut,
    Banknote,
    FileText,
    FileEdit,
    Sparkles
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const sidebarItems = [
    { label: 'Dashboard', href: '/backoffice/dashboard', icon: LayoutDashboard },
    { label: 'Imóveis', href: '/backoffice/imoveis', icon: Building2 },
    { label: 'Construtoras', href: '/backoffice/construtoras', icon: Building },
    { label: 'Leads', href: '/backoffice/leads', icon: Users },
    { label: 'Conteúdos', href: '/backoffice/conteudos', icon: Sparkles, badge: 'IA' },
    { label: 'Consultorias', href: '/backoffice/consultations', icon: Calendar },
    { label: 'Crédito', href: '/backoffice/credito', icon: Banknote },
    { label: 'Avaliações', href: '/backoffice/avaliacoes', icon: FileText },
    { label: 'Conteúdo', href: '/backoffice/conteudo', icon: FileEdit },
    { label: 'Configurações', href: '/backoffice/settings', icon: Settings },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/backoffice');
        router.refresh();
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:border-imi-100 lg:bg-white/80 lg:backdrop-blur-xl lg:shadow-soft fixed inset-y-0 left-0 z-30 overflow-y-auto">
                <div className="p-6 flex flex-col h-full">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-imi-900 font-display">IMI Admin</h2>
                        <p className="text-sm text-imi-400 mt-1 uppercase tracking-widest text-[10px] font-bold">Inteligência Imobiliária</p>
                    </div>

                    <nav className="space-y-1 flex-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-imi-50 text-imi-900 shadow-soft'
                                        : 'text-imi-500 hover:bg-imi-50 hover:text-imi-900'
                                        }`}
                                >
                                    <item.icon size={20} className={isActive ? 'text-accent-500' : ''} />
                                    <span className="font-medium">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto px-2 py-0.5 text-[9px] font-black bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full uppercase tracking-wider">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 mt-4"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/80 backdrop-blur-xl rounded-full shadow-soft hover:shadow-md transition-all duration-300 border border-imi-100"
            >
                <Menu size={24} className="text-imi-900" />
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 z-50 bg-imi-900/20 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-imi-900 font-display">IMI Admin</h2>
                                        <p className="text-sm text-imi-400 mt-1 uppercase tracking-widest text-[10px] font-bold">Inteligência Imobiliária</p>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-imi-50 rounded-lg transition-colors"
                                    >
                                        <X size={24} className="text-imi-900" />
                                    </button>
                                </div>

                                <nav className="space-y-2 flex-1">
                                    {sidebarItems.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 active:scale-95 ${isActive
                                                    ? 'bg-imi-50 text-imi-900 border-l-4 border-accent-500 pl-3'
                                                    : 'text-imi-500 hover:bg-imi-50 hover:text-imi-900'
                                                    }`}
                                            >
                                                <item.icon size={24} className={isActive ? 'text-accent-500' : ''} />
                                                <span className="font-semibold text-lg">{item.label}</span>
                                                {item.badge && (
                                                    <span className="ml-auto px-2 py-1 text-[10px] font-black bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full uppercase tracking-wider">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 mt-4 active:scale-95"
                                >
                                    <LogOut size={24} />
                                    <span className="font-semibold text-lg">Sair</span>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
