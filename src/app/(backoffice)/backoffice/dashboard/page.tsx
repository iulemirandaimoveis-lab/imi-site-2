'use client'

import {
    UsersIcon,
    BuildingOfficeIcon,
    EyeIcon,
    BellIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

const stats = [
    {
        name: 'Total de Leads',
        value: '24',
        change: '+12%',
        changeType: 'positive',
        icon: UsersIcon,
    },
    {
        name: 'Imóveis Ativos',
        value: '18',
        change: '+3',
        changeType: 'positive',
        icon: BuildingOfficeIcon,
    },
    {
        name: 'Visualizações (30d)',
        value: '1,234',
        change: '+18%',
        changeType: 'positive',
        icon: EyeIcon,
    },
    {
        name: 'Notificações',
        value: '7',
        change: 'Novas',
        changeType: 'neutral',
        icon: BellIcon,
    },
]

const recentLeads = [
    { name: 'João Silva', email: 'joao@email.com', property: 'Apto 3 quartos - Boa Viagem', time: '2h atrás' },
    { name: 'Maria Santos', email: 'maria@email.com', property: 'Casa 4 quartos - Piedade', time: '5h atrás' },
    { name: 'Pedro Costa', email: 'pedro@email.com', property: 'Cobertura - Pina', time: '1d atrás' },
]

const recentActivity = [
    { action: 'Novo lead cadastrado', user: 'João Silva', time: '2h atrás', type: 'lead' },
    { action: 'Imóvel atualizado', user: 'Sistema', time: '4h atrás', type: 'property' },
    { action: 'Relatório gerado', user: 'Iule Miranda', time: '1d atrás', type: 'report' },
]

export default function DashboardPage() {
    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-900">
                        Dashboard
                    </h1>
                    <p className="text-sm md:text-base text-neutral-600 mt-1">
                        Visão geral do sistema
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white border-2 border-neutral-200 rounded-xl hover:border-primary-500 transition-all duration-200 font-medium text-neutral-700">
                        Exportar Dados
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium">
                        Novo Imóvel
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-2xl p-6 border border-neutral-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary-100 rounded-xl">
                                <stat.icon className="h-6 w-6 text-primary-700" />
                            </div>
                            <span
                                className={`text-sm font-semibold px-3 py-1 rounded-full ${stat.changeType === 'positive'
                                    ? 'bg-green-100 text-green-700'
                                    : stat.changeType === 'negative'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-neutral-100 text-neutral-700'
                                    }`}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-600 mb-1">{stat.name}</p>
                            <p className="text-3xl font-display font-bold text-neutral-900">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Leads */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold text-neutral-900">
                            Leads Recentes
                        </h2>
                        <a
                            href="/backoffice/leads"
                            className="text-sm text-primary-700 hover:text-primary-900 font-semibold"
                        >
                            Ver todos →
                        </a>
                    </div>
                    <div className="space-y-4">
                        {recentLeads.map((lead, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                            >
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-semibold">
                                        {lead.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-neutral-900">
                                        {lead.name}
                                    </p>
                                    <p className="text-sm text-neutral-600 truncate">
                                        {lead.email}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        Interesse: {lead.property}
                                    </p>
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {lead.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-display font-bold text-neutral-900">
                            Atividade Recente
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                            >
                                <div className="flex-shrink-0">
                                    <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold ${activity.type === 'lead'
                                            ? 'bg-blue-500'
                                            : activity.type === 'property'
                                                ? 'bg-green-500'
                                                : 'bg-purple-500'
                                            }`}
                                    >
                                        {activity.type === 'lead' ? '👤' : activity.type === 'property' ? '🏠' : '📊'}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-neutral-900">
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-neutral-600">
                                        {activity.user}
                                    </p>
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {activity.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-display font-bold mb-4">
                    Ações Rápidas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Adicionar Lead</p>
                        <p className="text-sm text-white/80">Cadastrar novo cliente</p>
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Novo Imóvel</p>
                        <p className="text-sm text-white/80">Cadastrar propriedade</p>
                    </button>
                    <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-xl p-4 text-left transition-all duration-200 hover:scale-[1.02]">
                        <p className="font-semibold mb-1">Gerar Relatório</p>
                        <p className="text-sm text-white/80">Analytics e métricas</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
