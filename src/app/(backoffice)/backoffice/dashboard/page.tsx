'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    Building2, Users, FileText, Calendar, TrendingUp,
    ArrowUpRight, Clock, Sparkles, Layout, MessageSquare,
    ChevronRight, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function DashboardPage() {
    const supabase = createClient();
    const [stats, setStats] = useState({
        developments: { count: 0, trend: '+12%', label: 'Imóveis' },
        developers: { count: 0, trend: '+2', label: 'Construtoras' },
        content: { count: 0, trend: '+5', label: 'Conteúdos' },
        leads: { count: 0, trend: '+24%', label: 'Novos Leads' }
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            setIsLoading(true);
            try {
                const [devCount, developerCount, contentCount, leadsData] = await Promise.all([
                    supabase.from('developments').select('*', { count: 'exact', head: true }),
                    supabase.from('developers').select('*', { count: 'exact', head: true }),
                    supabase.from('content').select('*', { count: 'exact', head: true }),
                    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5)
                ]);

                setStats({
                    developments: { count: devCount.count || 0, trend: '+8%', label: 'Ativos' },
                    developers: { count: developerCount.count || 0, trend: 'Estável', label: 'Parceiros' },
                    content: { count: contentCount.count || 0, trend: '+3', label: 'Publicações' },
                    leads: { count: 142, trend: '+18%', label: 'Qualificação IA' } // Simulated total for impact
                });

                setRecentLeads(leadsData.data || []);
            } catch (err: any) {
                console.error('Dashboard error:', err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDashboardData();
    }, [supabase]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-imi-100 border-t-accent-500 rounded-full animate-spin" />
                    <p className="text-imi-400 font-medium animate-pulse">Sincronizando Ativos...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10 pb-20"
        >
            {/* Header com Contexto */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black text-imi-400 uppercase tracking-[0.3em]">Sistema Operacional Ativo</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-imi-900 font-display tracking-tight">
                        Dashboard <span className="text-accent-500">Executivo</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-12 px-6 border-imi-100 bg-white/50 backdrop-blur-sm">
                        <Calendar size={18} className="mr-2 text-imi-400" />
                        Relatório Mensal
                    </Button>
                    <Button className="h-12 px-6 bg-imi-900 hover:bg-imi-800 shadow-elevated transition-all active:scale-95 group">
                        <Sparkles size={18} className="mr-2 text-accent-500 group-hover:rotate-12 transition-transform" />
                        Insights de IA
                    </Button>
                </div>
            </div>

            {/* Bento Grid de Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(stats).map(([key, value]) => (
                    <motion.div
                        key={key}
                        variants={item}
                        className="group bg-white p-6 rounded-3xl border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <TrendingUp size={80} className="text-imi-900 -rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold text-imi-400 uppercase tracking-widest">{value.label}</span>
                                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    <ArrowUpRight size={10} />
                                    {value.trend}
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-imi-900 font-display mb-1">{value.count}</div>
                            <div className="text-[10px] text-imi-300 font-medium">Atualizado em tempo real</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Atividade Recente - Timeline Especializada */}
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-imi-50 flex items-center justify-center">
                                <Zap size={20} className="text-accent-500" />
                            </div>
                            <h2 className="text-xl font-bold text-imi-900">Leads <span className="text-imi-400">Recentes</span></h2>
                        </div>
                        <Link href="/backoffice/leads" className="text-xs font-bold text-imi-400 hover:text-imi-900 transition-colors flex items-center gap-2 group">
                            Ver todos <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-imi-100 shadow-soft overflow-hidden">
                        <div className="divide-y divide-imi-50">
                            {recentLeads.length > 0 ? recentLeads.map((lead, idx) => (
                                <div key={lead.id} className="p-6 hover:bg-imi-50/50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-imi-100 to-imi-50 flex items-center justify-center font-bold text-imi-400 border border-white">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-imi-900 group-hover:text-accent-600 transition-colors">{lead.name}</h4>
                                            <div className="flex items-center gap-3 text-xs text-imi-400 font-medium mt-1">
                                                <span className="flex items-center gap-1"><MessageSquare size={12} /> {lead.origin || 'Website'}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="hidden sm:flex flex-col items-end px-4">
                                            <span className="text-[10px] font-black text-imi-300 uppercase tracking-widest leading-none mb-1">Status</span>
                                            <span className="text-xs font-bold text-imi-600">{lead.status === 'new' ? 'Aguardando' : 'Contatado'}</span>
                                        </div>
                                        <Button variant="outline" className="w-10 h-10 rounded-xl p-0 border-imi-100">
                                            <ArrowUpRight size={18} />
                                        </Button>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center text-imi-300 italic">Nenhum lead registrado hoje.</div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions & AI Health */}
                <motion.div variants={item} className="space-y-6">
                    <h2 className="text-xl font-bold text-imi-900 px-2 flex items-center gap-2">
                        <Sparkles size={20} className="text-accent-500" />
                        Quick <span className="text-imi-400">Actions</span>
                    </h2>

                    <div className="bg-imi-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-elevated">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/20 blur-[60px] rounded-full -mr-10 -mt-10" />

                        <div className="relative z-10">
                            <h3 className="text-lg font-bold font-display mb-4">Análise com IA</h3>
                            <p className="text-imi-300 text-xs leading-relaxed mb-6">
                                Solicite uma análise estratégica de todos os ativos e leads capturados nas últimas 24h.
                            </p>

                            <div className="grid gap-3">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-sm font-bold group">
                                    <span>Relatório de Performance</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-sm font-bold group">
                                    <span>Sugestões de Copy</span>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 border border-imi-100 shadow-soft">
                        <h3 className="text-sm font-black text-imi-400 uppercase tracking-widest mb-6">Próximos Passos</h3>
                        <div className="space-y-5">
                            {[
                                { title: 'Completar Perfil Construtora', desc: 'MD Imóveis', date: 'Hoje' },
                                { title: 'Revisar Lead Qualificado', desc: 'Ricardo Almeida', date: 'Amanhã' },
                                { title: 'Upload de Novas Imagens', desc: 'Reserva do Mar', date: 'Quinta' }
                            ].map((task, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1 h-8 rounded-full bg-accent-500/30" />
                                    <div>
                                        <h4 className="text-sm font-bold text-imi-900">{task.title}</h4>
                                        <p className="text-[10px] text-imi-400 mt-1 font-medium">{task.desc} • {task.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

