import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

async function getDashboardData() {
    // Fetch stats via Prisma/Supabase
    // Note: 'view' table does not exist, and PropertyStatus uses 'AVAILABLE' not 'ACTIVE'
    const [totalLeads, totalProperties, totalViews, totalRevenueResult] = await Promise.all([
        prisma.lead.count(),
        prisma.property.count({ where: { status: 'AVAILABLE' } }), // Fixed enum
        0, // prisma.view.count() - Table does not exist
        prisma.property.aggregate({ _sum: { listPrice: true } }),
    ]);

    // Handle Decimal or number return type safely
    const revenueVal = totalRevenueResult._sum.listPrice;
    const totalRevenue = revenueVal ? Number(revenueVal) : 0;

    const recentLeads = await prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true },
    });

    return { stats: { totalLeads, totalProperties, totalViews, totalRevenue }, recentLeads };
}

export default async function DashboardPage() {
    const { stats, recentLeads } = await getDashboardData();

    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600"></div></div>}>
            <div className="p-6 lg:p-8 space-y-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700">Leads Totais</h3>
                        <p className="text-3xl font-bold text-navy-600 mt-2">{stats.totalLeads}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700">Imóveis Ativos</h3>
                        <p className="text-3xl font-bold text-navy-600 mt-2">{stats.totalProperties}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700">Visualizações (30d)</h3>
                        <p className="text-3xl font-bold text-navy-600 mt-2">{stats.totalViews}</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700">Valor em Carteira</h3>
                        <p className="text-3xl font-bold text-gold-500 mt-2">
                            {stats.totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Leads Recentes</h2>
                    {recentLeads.length === 0 ? (
                        <p className="text-gray-600 text-center">Nenhum lead recente.</p>
                    ) : (
                        <div className="space-y-4">
                            {recentLeads.map((lead) => (
                                <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition border-b border-gray-100 last:border-none">
                                    <div>
                                        <p className="font-semibold text-gray-900">{lead.name || 'Sem nome'}</p>
                                        <p className="text-sm text-gray-600">{lead.email}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Ações Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/backoffice/leads" className="bg-navy-600 text-white p-6 rounded-xl shadow-sm hover:bg-navy-700 transition text-center font-semibold">
                        Adicionar Lead
                    </Link>
                    <Link href="/backoffice/properties/new" className="bg-navy-600 text-white p-6 rounded-xl shadow-sm hover:bg-navy-700 transition text-center font-semibold">
                        Novo Imóvel
                    </Link>
                    <Link href="/backoffice/reports" className="bg-navy-600 text-white p-6 rounded-xl shadow-sm hover:bg-navy-700 transition text-center font-semibold">
                        Gerar Relatório
                    </Link>
                </div>
            </div>
        </Suspense>
    );
}
