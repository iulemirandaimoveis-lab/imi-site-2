'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Bell, Search, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface UserData {
    email: string;
    name?: string;
}

export default function BackofficeHeader() {
    const [user, setUser] = useState<UserData | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notifications, setNotifications] = useState<number>(0);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                setUser({
                    email: authUser.email || '',
                    name: authUser.user_metadata?.name || authUser.email?.split('@')[0]
                });
            }
        };

        // Fetch notification count (leads not viewed in last 24h)
        const fetchNotifications = async () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const { count } = await supabase
                .from('leads')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', yesterday.toISOString())
                .is('viewed_at', null);

            setNotifications(count || 0);
        };

        fetchUser();
        fetchNotifications();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/backoffice');
        router.refresh();
    };

    return (
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/60 backdrop-blur-xl border-b border-imi-100 sticky top-0 z-20">
            {/* Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-imi-400" />
                    <input
                        type="text"
                        placeholder="Buscar leads, imóveis..."
                        className="w-full pl-12 pr-4 py-2.5 bg-imi-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent-500/20 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <Link
                    href="/backoffice/leads"
                    className="relative p-2.5 rounded-xl bg-imi-50 hover:bg-imi-100 transition-colors"
                >
                    <Bell className="w-5 h-5 text-imi-600" />
                    {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {notifications > 9 ? '9+' : notifications}
                        </span>
                    )}
                </Link>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-3 pl-3 pr-4 py-2 bg-imi-50 hover:bg-imi-100 rounded-xl transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-imi-900 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left hidden xl:block">
                            <p className="text-sm font-medium text-imi-900 truncate max-w-[120px]">
                                {user?.name || 'Admin'}
                            </p>
                            <p className="text-[10px] text-imi-400 uppercase tracking-wider">Administrador</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-imi-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showUserMenu && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowUserMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-imi-100 py-2 z-50"
                                >
                                    <div className="px-4 py-3 border-b border-imi-100">
                                        <p className="text-sm font-medium text-imi-900 truncate">{user?.email}</p>
                                        <p className="text-xs text-imi-400">Logado como administrador</p>
                                    </div>
                                    <Link
                                        href="/backoffice/settings"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-imi-600 hover:bg-imi-50 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Configurações
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sair
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
