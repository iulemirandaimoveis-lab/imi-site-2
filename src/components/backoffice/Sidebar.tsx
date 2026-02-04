'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Calendar,
    Building2,
    Ticket,
    MessageSquare,
    FileText,
    Settings,
    Menu,
    X,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
    { name: 'Dashboard', href: '/backoffice/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/backoffice/leads', icon: Users },
    { name: 'Consultorias', href: '/backoffice/consultations', icon: Calendar },
    { name: 'Imóveis', href: '/backoffice/properties', icon: Building2 },
    { name: 'Cupons', href: '/backoffice/coupons', icon: Ticket },
    { name: 'WhatsApp', href: '/backoffice/whatsapp', icon: MessageSquare },
    { name: 'Relatórios', href: '/backoffice/reports', icon: FileText },
    { name: 'Configurações', href: '/backoffice/settings', icon: Settings }
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Filter out login page from showing sidebar logic if handled by layout, 
    // but usually Sidebar is only included in the authenticated layout.

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors text-navy-700"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Overlay (mobile) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-40"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-40",
                    "w-72 bg-white border-r border-gray-100 shadow-xl lg:shadow-none",
                    "transform transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0",
                    mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-full flex flex-col bg-white">

                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-8 border-b border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-navy-700 tracking-tight leading-none">IMI</span>
                            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase mt-1">Backoffice</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                        <div className="px-4 py-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu Principal</p>
                        </div>
                        {navigation.map((item) => {
                            // Adjust logic to correctly highlight dashboard vs sub-routes
                            const isActive = item.href === '/backoffice/dashboard'
                                ? pathname === item.href
                                : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3.5 px-4 py-3.5 rounded-xl group relative overflow-hidden",
                                        "text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-navy-50 text-navy-700 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-navy-700"
                                    )}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-navy-600 rounded-r-full" />
                                    )}
                                    <item.icon
                                        className={cn(
                                            "w-5 h-5 transition-colors",
                                            isActive ? "text-navy-600" : "text-gray-400 group-hover:text-navy-600"
                                        )}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User section */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 font-bold border-2 border-white shadow-sm">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">
                                    Admin
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    admin@imoveis.com
                                </p>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Sair">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
}
