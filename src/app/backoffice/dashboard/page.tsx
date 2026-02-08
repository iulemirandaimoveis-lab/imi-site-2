'use client';

import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    LayoutDashboard,
    Users,
    Building2,
    TrendingUp,
    Calendar,
    Banknote,
    FileText,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { format, subWeeks, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const supabase = createClient();

export default function DashboardPage() {
    // 1. Fetch Summary Data
    const { data: summary, isLoading: loadingStats } = useSWR('dashboard-summary', async () => {
        const [leads, imoveis, consults, credit, appraisals] = await Promise.all([
            supabase.from('leads').select('*', { count: 'exact', head: true }),
            supabase.from('developments').select('*', { count: 'exact', head: true }),
            supabase.from('consultations').select('*', { count: 'exact', head: true }),
            supabase.from('credit_requests').select('*', { count: 'exact', head: true }),
            supabase.from('appraisal_requests').select('*', { count: 'exact', head: true }),
        ]);

        return {
            leads: leads.count || 0,
            imoveis: imoveis.count || 0,
            consults: consults.count || 0,
            credit: credit.count || 0,
            appraisals: appraisals.count || 0,
        };
    });

    // 2. Fetch Recent Activity
    const { data: recent, isLoading: loadingRecent } = useSWR('recent-activity', async () => {
        const [leads, consults] = await Promise.all([
            supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
            supabase.from('consultations').select('*').order('created_at', { ascending: false }).limit(5),
        ]);
        return { leads: leads.data || [], consults: consults.data || [] };
    });

    // 3. Prepare Chart Data (Past 8 Weeks)
    const { data: chartData } = useSWR('chart-data', async () => {
        const { data: leads } = await supabase.from('leads').select('created_at');
        if (!leads) return [];

        const weeks = Array.from({ length: 8 }).map((_, i) => {
            const date = subWeeks(new Date(), i);
            const start = startOfWeek(date);
            const end = endOfWeek(date);
            const count = leads.filter(l =>
                isWithinInterval(new Date(l.created_at), { start, end })
            ).length;

            return {
                name: format(start, 'dd/MM'),
                total: count
            };
        }).reverse();

        return weeks;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold text-imi-900 font-display">Dashboard Analítico</h1>
                <p className="text-imi-500 mt-1">Bem-vindo, estas são as métricas reais da plataforma.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    icon={<Users className="w-5 h-5 text-imi-900" />}
                    title="Total Leads"
                    value={loadingStats ? '...' : summary?.leads}
                    color="bg-blue-50"
                />
                <KPICard
                    icon={<Building2 className="w-5 h-5 text-imi-900" />}
                    title="Imóveis"
                    value={loadingStats ? '...' : summary?.imoveis}
                    color="bg-green-50"
                />
                <KPICard
                    icon={<Calendar className="w-5 h-5 text-imi-900" />}
                    title="Consultorias"
                    value={loadingStats ? '...' : summary?.consults}
                    color="bg-purple-50"
                />
                <KPICard
                    icon={<Banknote className="w-5 h-5 text-imi-900" />}
                    title="Cálculos Crédito"
                    value={loadingStats ? '...' : summary?.credit}
                    color="bg-orange-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Gráfico Principal */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-soft border border-imi-50 p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-imi-900 font-display">Crescimento de Leads</h3>
                            <p className="text-xs text-imi-400 font-bold uppercase tracking-widest">Últimas 8 semanas</p>
                        </div>
                        <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full flex items-center gap-1">
                            <TrendingUp size={14} />
                            Real-time
                        </div>
                    </div>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9a7147" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#9a7147" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#9a7147', fontWeight: 700 }}
                                />
                                <Area type="monotone" dataKey="total" stroke="#9a7147" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Últimos Leads */}
                <div className="bg-white rounded-3xl shadow-soft border border-imi-50 p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-imi-900 font-display">Últimos Leads</h3>
                        <ArrowUpRight size={20} className="text-imi-300" />
                    </div>

                    <div className="space-y-4">
                        {loadingRecent ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="h-16 bg-imi-50 animate-pulse rounded-2xl" />)
                        ) : recent?.leads.map((lead) => (
                            <div key={lead.id} className="flex items-center gap-4 p-3 hover:bg-imi-50/50 rounded-2xl transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-imi-900 flex items-center justify-center text-white font-bold text-xs">
                                    {lead.name.charAt(0)}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-sm font-bold text-imi-900 truncate">{lead.name}</div>
                                    <div className="text-[10px] text-imi-400 uppercase tracking-tighter">{lead.interest || 'Geral'}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-imi-50">
                        <h3 className="text-lg font-bold text-imi-900 font-display mb-4">Consultorias</h3>
                        <div className="space-y-4">
                            {loadingRecent ? (
                                Array(2).fill(0).map((_, i) => <div key={i} className="h-16 bg-imi-50 animate-pulse rounded-2xl" />)
                            ) : recent?.consults.map((c) => (
                                <div key={c.id} className="flex items-center gap-4 p-3 hover:bg-imi-50/50 rounded-2xl transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white font-bold text-xs">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-sm font-bold text-imi-900 truncate">{c.name}</div>
                                        <div className="text-[10px] text-imi-400 uppercase tracking-tighter">{c.consultation_type}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KPICard({ icon, title, value, color }: { icon: any, title: string, value: any, color: string }) {
    return (
        <div className="bg-white rounded-3xl shadow-soft border border-imi-50 p-6 flex items-center gap-5 hover:scale-[1.02] transition-transform duration-300">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", color)}>
                {icon}
            </div>
            <div>
                <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-1">{title}</div>
                <div className="text-2xl font-black text-imi-900 leading-none">{value}</div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
