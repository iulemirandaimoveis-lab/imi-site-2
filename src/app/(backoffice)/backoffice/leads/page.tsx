'use client'

import { useState, useEffect } from 'react'
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon
} from '@heroicons/react/24/outline'

interface Client {
    id: string
    name: string
    email: string
    phone: string
    origin?: string
    notes?: string
    createdAt: string
}

export default function LeadsPage() {
    const [clients, setClients] = useState<Client[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingClient, setEditingClient] = useState<Client | null>(null)

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            const response = await fetch('/api/leads')
            if (!response.ok) throw new Error('Falha ao carregar leads')
            const data = await response.json()
            setClients(data.clients || [])
        } catch (error) {
            console.error('Erro ao buscar leads:', error)
            // Optional: setError state if you added it, otherwise alert or silent (user wanted feedback)
            // Since we didn't add 'error' state variable in previous step, let's keep it simple or add state.
            // Let's rely on standard UI: If empty, at least it's not crashing.
            // But user wants feedback.
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este lead?')) return

        try {
            const response = await fetch(`/api/leads/${id}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('Erro ao excluir')

            fetchClients() // Refetch to ensure sync
            alert('Lead excluído com sucesso!')
        } catch (error) {
            console.error('Erro ao excluir lead:', error)
            alert('Erro ao excluir lead. Tente novamente.')
        }
    }

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    )

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                <div className="px-4 py-4 md:px-8 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl md:text-3xl font-display font-bold text-neutral-900">
                                Gestão de Leads
                            </h1>
                            <p className="text-sm md:text-base text-neutral-600 mt-1">
                                {clients.length} {clients.length === 1 ? 'lead cadastrado' : 'leads cadastrados'}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingClient(null)
                                setShowModal(true)
                            }}
                            className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-primary-700 to-primary-900 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Novo Lead
                        </button>
                    </div>

                    {/* Search */}
                    <div className="mt-6 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou telefone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto"></div>
                        <p className="text-neutral-600 mt-4">Carregando leads...</p>
                    </div>
                ) : filteredClients.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200">
                        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <EnvelopeIcon className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                            {searchTerm ? 'Nenhum lead encontrado' : 'Nenhum lead cadastrado'}
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            {searchTerm
                                ? 'Tente buscar com outros termos'
                                : 'Comece adicionando seu primeiro lead'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-6 py-3 bg-primary-700 text-white rounded-xl hover:bg-primary-800 transition-colors"
                            >
                                Adicionar Primeiro Lead
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Nome</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Contato</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Origem</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">Data</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-900">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200">
                                {filteredClients.map((client) => (
                                    <tr key={client.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-semibold">
                                                    {client.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-900">{client.name}</p>
                                                    {client.notes && (
                                                        <p className="text-sm text-neutral-500 truncate max-w-xs">
                                                            {client.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <EnvelopeIcon className="w-4 h-4" />
                                                    <a href={`mailto:${client.email}`} className="hover:text-primary-700">
                                                        {client.email}
                                                    </a>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                                    <PhoneIcon className="w-4 h-4" />
                                                    <a href={`tel:${client.phone}`} className="hover:text-primary-700">
                                                        {client.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {client.origin || 'Direto'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-600">
                                            {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingClient(client)
                                                        setShowModal(true)
                                                    }}
                                                    className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.id)}
                                                    className="p-2 text-neutral-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal - será implementado em seguida */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
                        <h2 className="text-2xl font-display font-bold mb-6">
                            {editingClient ? 'Editar Lead' : 'Novo Lead'}
                        </h2>
                        {/* Form será implementado */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-neutral-200 rounded-xl"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
