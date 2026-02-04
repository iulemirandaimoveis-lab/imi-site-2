'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Building2, Calendar, Ticket, MessageSquare, FileText, Settings, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const sidebarItems = [
    { label: 'Dashboard', href: '/backoffice/dashboard', icon: LayoutDashboard },
    { label: 'Leads', href: '/backoffice/leads', icon: Users },
    { label: 'Imóveis', href: '/backoffice/properties', icon: Building2 },
    { label: 'Consultorias', href: '/backoffice/consultorias', icon: Calendar },
    { label: 'Relatórios', href: '/backoffice/reports', icon: FileText },
    { label: 'Configurações', href: '/backoffice/settings', icon: Settings },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const supabase = createClientComponentClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success('Sessão encerrada');
        router.push('/backoffice');
        router.refresh(); // Ensure RSC updates
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:border-r lg:border-gray-200 lg:bg-white/80 lg:backdrop-blur-xl lg:shadow-soft fixed inset-y-0 left-0 z-30">
                <div className="flex-1 flex flex-col pt-8 pb-4">
                    <div className="px-6 mb-10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">I</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">IMI Admin</span>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-navy-50 text-navy-700 font-medium"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-navy-900"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-navy-600 rounded-r-full"
                                        />
                                    )}
                                    <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} className={isActive ? "text-navy-600" : "text-gray-400 group-hover:text-navy-600"} />
                                    <span className={isActive ? "font-semibold" : "font-medium"}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors group"
                        >
                            <LogOut size={20} className="text-gray-400 group-hover:text-red-500" />
                            <span className="font-medium">Sair</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white/90 backdrop-blur-md rounded-xl shadow-soft border border-gray-100 text-gray-700 active:scale-95 transition-transform"
            >
                <Menu size={24} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-2xl shadow-2xl border-r border-gray-100 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 flex justify-between items-center border-b border-gray-100">
                                <span className="text-xl font-bold text-gray-900">Menu</span>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all",
                                                isActive
                                                    ? "bg-navy-50 text-navy-700 font-semibold"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-navy-900 font-medium"
                                            )}
                                        >
                                            <item.icon size={22} className={isActive ? "text-navy-600" : "text-gray-400"} />
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <LogOut size={20} />
                                    Sair da conta
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
