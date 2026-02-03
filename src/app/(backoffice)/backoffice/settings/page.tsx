'use client'

import { useState } from 'react'
import {
    UserIcon,
    KeyIcon,
    BellIcon,
    Cog6ToothIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')
    const [isSaving, setIsSaving] = useState(false)

    const tabs = [
        { id: 'profile', name: 'Perfil', icon: UserIcon },
        { id: 'security', name: 'Segurança', icon: ShieldCheckIcon },
        { id: 'notifications', name: 'Notificações', icon: BellIcon },
        { id: 'system', name: 'Sistema', icon: Cog6ToothIcon },
    ]

    const handleSave = async () => {
        setIsSaving(true)
        // Simular salvamento
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        alert('Configurações salvas com sucesso!')
    }

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="px-4 py-4 md:px-8 md:py-6">
                    <h1 className="text-xl md:text-3xl font-display font-bold text-neutral-900">
                        Configurações
                    </h1>
                    <p className="text-sm md:text-base text-neutral-600 mt-1">
                        Gerencie suas preferências e configurações do sistema
                    </p>
                </div>

                {/* Tabs */}
                <div className="px-4 md:px-8 overflow-x-auto">
                    <div className="flex gap-2 border-b border-neutral-200 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary-700 text-primary-700'
                                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8">
                <div className="max-w-4xl">
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                                Informações do Perfil
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Iule Miranda"
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="iule@imi.com"
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                            CRECI
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="17933"
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                            CNAI
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="53290"
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                                Segurança
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Senha Atual
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Confirmar Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    />
                                </div>

                                <div className="pt-4 border-t border-neutral-200">
                                    <button className="px-6 py-3 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors font-medium">
                                        Alterar Senha
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                                Preferências de Notificações
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { id: 'new-lead', label: 'Novos leads cadastrados', description: 'Receber notificação quando um novo lead for cadastrado' },
                                    { id: 'property-view', label: 'Visualizações de imóveis', description: 'Receber notificação quando um imóvel for visualizado' },
                                    { id: 'high-engagement', label: 'Alto engajamento', description: 'Receber notificação quando um lead demonstrar alto interesse' },
                                    { id: 'weekly-report', label: 'Relatório semanal', description: 'Receber relatório semanal por email' },
                                ].map((notification) => (
                                    <div key={notification.id} className="flex items-start justify-between p-4 bg-neutral-50 rounded-xl">
                                        <div className="flex-1">
                                            <p className="font-semibold text-neutral-900">{notification.label}</p>
                                            <p className="text-sm text-neutral-600 mt-1">{notification.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'system' && (
                        <div className="bg-white rounded-2xl p-8 border border-neutral-200">
                            <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">
                                Configurações do Sistema
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Fuso Horário
                                    </label>
                                    <select className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none bg-white">
                                        <option>America/Recife (UTC-3)</option>
                                        <option>America/Sao_Paulo (UTC-3)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                                        Idioma
                                    </label>
                                    <select className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none bg-white">
                                        <option>Português (Brasil)</option>
                                        <option>English (US)</option>
                                    </select>
                                </div>

                                <div className="pt-4 border-t border-neutral-200">
                                    <h3 className="font-semibold text-neutral-900 mb-4">Informações do Sistema</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Versão:</span>
                                            <span className="font-medium">1.0.0</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Última atualização:</span>
                                            <span className="font-medium">01/02/2026</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-neutral-600">Banco de dados:</span>
                                            <span className="font-medium text-green-600">Conectado</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-8 py-3 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50"
                        >
                            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
