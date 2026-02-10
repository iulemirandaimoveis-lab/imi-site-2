'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Phone, Mail, MessageCircle, Star, Search, Filter, X, Check, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Toast, { useToast } from '@/components/ui/Toast'

interface Lead {
    id: string
    name: string
    email: string | null
    phone: string | null
    status: string
    source: string | null
    interest: string | null
    notes: string | null
    ai_score: number | null
    ai_priority: 'low' | 'medium' | 'high' | 'critical'
    last_contacted_at: string | null
    created_at: string
}

export default function LeadsPage() {
    const supabase = createClient()
    const { toasts, showToast, removeToast } = useToast()
    const [leads, setLeads] = useState<Lead[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingLead, setEditingLead] = useState<Lead | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'new',
        source: 'site',
        interest: '',
        notes: '',
        ai_priority: 'medium'
    })

    useEffect(() => {
        fetchLeads()
    }, [])

    async function fetchLeads() {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching leads:', error)
                throw error
            }
            setLeads(data || [])
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao carregar leads', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const filteredLeads = leads.filter(lead => {
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm)

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter

        return matchesSearch && matchesStatus
    })

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!formData.name) {
            showToast('Nome é obrigatório', 'error')
            return
        }

        setIsSaving(true)
        try {
            if (editingLead) {
                const { error } = await supabase
                    .from('leads')
                    .update(formData)
                    .eq('id', editingLead.id)
                if (error) {
                    console.error('Error updating lead:', error)
                    throw error
                }
                showToast('Lead atualizado com sucesso', 'success')
            } else {
                const { error } = await supabase
                    .from('leads')
                    .insert([formData])
                if (error) {
                    console.error('Error inserting lead:', error)
                    throw error
                }
                showToast('Lead criado com sucesso', 'success')
            }

            setIsModalOpen(false)
            resetForm()
            fetchLeads()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao salvar lead', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir este lead permanentemente?')) return

        try {
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id)

            if (error) {
                console.error('Error deleting lead:', error)
                throw error
            }
            showToast('Lead excluído', 'success')
            fetchLeads()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast('Erro ao excluir lead', 'error')
        }
    }

    async function handleStatusChange(id: string, newStatus: string) {
        try {
            const { error } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error
            showToast('Status atualizado', 'success')
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
        } catch (err: any) {
            showToast('Erro ao atualizar status', 'error')
        }
    }

    function openEditModal(lead: Lead) {
        setEditingLead(lead)
        setFormData({
            name: lead.name,
            email: lead.email || '',
            phone: lead.phone || '',
            status: lead.status,
            source: lead.source || 'manual',
            interest: lead.interest || '',
            notes: lead.notes || '',
            ai_priority: lead.ai_priority || 'medium'
        })
        setIsModalOpen(true)
    }

    function resetForm() {
        setFormData({
            name: '',
            email: '',
            phone: '',
            status: 'new',
            source: 'manual',
            interest: '',
            notes: '',
            ai_priority: 'medium'
        })
        setEditingLead(null)
    }

    function getPriorityBadge(priority: string) {
        switch (priority) {
            case 'critical': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold uppercase">Crítico</span>
            case 'high': return <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold uppercase">Alto</span>
            case 'medium': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold uppercase">Médio</span>
            default: return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold uppercase">Baixo</span>
        }
    }

    function getStatusLabel(status: string) {
        switch (status) {
            case 'new': return 'Novo'
            case 'contacted': return 'Contatado'
            case 'qualified': return 'Qualificado'
            case 'proposal': return 'Proposta'
            case 'won': return 'Ganho'
            case 'lost': return 'Perdido'
            default: return status
        }
    }

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                    <div className="grid gap-4">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900">Leads & CRM</h1>
                    <p className="text-slate-600 mt-1">Gerencie seus potenciais clientes</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Lead
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou telefone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-imi-900 outline-none"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-imi-900 outline-none bg-white"
                >
                    <option value="all">Todos os Status</option>
                    <option value="new">Novos</option>
                    <option value="contacted">Contatados</option>
                    <option value="qualified">Qualificados</option>
                    <option value="proposal">Em Proposta</option>
                    <option value="won">Ganhos</option>
                    <option value="lost">Perdidos</option>
                </select>
            </div>

            <div className="space-y-4">
                {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500">Nenhum lead encontrado.</p>
                    </div>
                ) : (
                    filteredLeads.map((lead) => (
                        <div key={lead.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-4 group">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-imi-900">{lead.name}</h3>
                                    {getPriorityBadge(lead.ai_priority)}
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-wider">{lead.source}</span>
                                </div>

                                <div className="grid md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-slate-600 mb-3">
                                    {lead.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" /> {lead.email}
                                        </div>
                                    )}
                                    {lead.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" /> {lead.phone}
                                            <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 ml-2">
                                                <MessageCircle className="w-4 h-4 inline" /> WhatsApp
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {lead.interest && (
                                    <p className="text-sm text-imi-700 mb-2">
                                        <span className="font-semibold">Interesse:</span> {lead.interest}
                                    </p>
                                )}

                                {lead.notes && (
                                    <div className="bg-slate-50 p-3 rounded text-sm text-slate-600 italic border-l-4 border-imi-200">
                                        "{lead.notes}"
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                    className={`text-sm font-semibold px-3 py-1 rounded-lg border cursor-pointer outline-none focus:ring-2 focus:ring-imi-900 ${lead.status === 'won' ? 'bg-green-50 border-green-200 text-green-700' :
                                        lead.status === 'lost' ? 'bg-red-50 border-red-200 text-red-700' :
                                            'bg-slate-50 border-slate-200 text-slate-700'
                                        }`}
                                >
                                    <option value="new">Novo</option>
                                    <option value="contacted">Contatado</option>
                                    <option value="qualified">Qualificado</option>
                                    <option value="proposal">Proposta</option>
                                    <option value="won">Ganho</option>
                                    <option value="lost">Perdido</option>
                                </select>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="outline" onClick={() => openEditModal(lead)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete(lead.id)} className="text-red-600 hover:bg-red-50 hover:border-red-200">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <span className="text-xs text-slate-400">
                                    {new Date(lead.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between z-10">
                            <h2 className="text-2xl font-bold text-imi-900">
                                {editingLead ? 'Editar Lead' : 'Novo Lead'}
                            </h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full">
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Nome *"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-semibold text-imi-900 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-imi-900"
                                    >
                                        <option value="new">Novo</option>
                                        <option value="contacted">Contatado</option>
                                        <option value="qualified">Qualificado</option>
                                        <option value="proposal">Proposta</option>
                                        <option value="won">Ganho</option>
                                        <option value="lost">Perdido</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                />
                                <Input
                                    label="Telefone / WhatsApp"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-imi-900 mb-2">Prioridade (IA)</label>
                                <div className="flex gap-4">
                                    {['low', 'medium', 'high', 'critical'].map(p => (
                                        <label key={p} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="priority"
                                                value={p}
                                                checked={formData.ai_priority === p}
                                                onChange={(e) => setFormData(prev => ({ ...prev, ai_priority: e.target.value as any }))}
                                                className="w-4 h-4 text-imi-900 focus:ring-imi-900"
                                            />
                                            <span className="text-sm capitalize">{p === 'low' ? 'Baixa' : p === 'medium' ? 'Média' : p === 'high' ? 'Alta' : 'Crítica'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Input
                                label="Interesse / Produto"
                                value={formData.interest}
                                onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))}
                                placeholder="Ex: Apartamento no Bessa, 3 quartos"
                            />

                            <Textarea
                                label="Notas / Histórico"
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                rows={4}
                            />

                            <div className="flex gap-4 pt-4 border-t border-slate-200">
                                <Button type="submit" className="flex-1 h-12" disabled={isSaving}>
                                    {isSaving ? 'Salvando...' : (editingLead ? 'Salvar Edição' : 'Criar Lead')}
                                </Button>
                                <Button type="button" variant="outline" className="flex-1 h-12" onClick={() => { setIsModalOpen(false); resetForm(); }} disabled={isSaving}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
