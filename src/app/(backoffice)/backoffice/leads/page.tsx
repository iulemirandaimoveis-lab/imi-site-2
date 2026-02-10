'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
    Plus, Edit, Trash2, Phone, Mail, MessageCircle,
    Star, Search, Filter, X, Check, Loader2, Sparkles,
    Calendar, ArrowUpRight, User, Hash, Zap, ChevronRight, Users
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    development_id: string | null
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
    const [isQualifying, setIsQualifying] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'new',
        source: 'site',
        interest: '',
        notes: '',
        ai_priority: 'medium',
        development_id: ''
    })

    const fetchLeads = useCallback(async () => {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setLeads(data || [])
        } catch (err: any) {
            showToast(err.message || 'Erro ao carregar leads', 'error')
        } finally {
            setIsLoading(false)
        }
    }, [supabase, showToast])

    useEffect(() => {
        fetchLeads()
    }, [fetchLeads])

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
        if (!formData.name) { showToast('Nome é obrigatório', 'error'); return }
        setIsSaving(true)
        try {
            if (editingLead) {
                const { error } = await supabase.from('leads').update(formData).eq('id', editingLead.id)
                if (error) throw error
                showToast('Lead atualizado', 'success')
            } else {
                const { error } = await supabase.from('leads').insert([formData])
                if (error) throw error
                showToast('Lead criado', 'success')
            }
            setIsModalOpen(false)
            resetForm()
            fetchLeads()
        } catch (err: any) {
            showToast(err.message || 'Erro ao salvar lead', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir permanentemente?')) return
        try {
            const { error } = await supabase.from('leads').delete().eq('id', id)
            if (error) throw error
            showToast('Excluído', 'success')
            fetchLeads()
        } catch (err: any) {
            showToast('Erro ao excluir', 'error')
        }
    }

    async function handleStatusChange(id: string, newStatus: string) {
        try {
            const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id)
            if (error) throw error
            showToast('Status atualizado', 'success')
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
        } catch (err: any) {
            showToast('Erro ao atualizar status', 'error')
        }
    }

    async function handleQualifyLead(id: string) {
        setIsQualifying(id);
        try {
            const response = await fetch('/api/ai/qualify-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lead_id: id })
            });
            if (!response.ok) throw new Error('Falha na IA');
            showToast('Inteligência Artificial processou o lead!', 'success');
            fetchLeads();
        } catch (error: any) {
            showToast('Erro na IA: Verifique as credenciais Anthropic', 'error');
        } finally {
            setIsQualifying(null);
        }
    }

    function resetForm() {
        setFormData({ name: '', email: '', phone: '', status: 'new', source: 'site', interest: '', notes: '', ai_priority: 'medium', development_id: '' })
        setEditingLead(null)
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
            ai_priority: lead.ai_priority || 'medium',
            development_id: lead.development_id || ''
        })
        setIsModalOpen(true)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    }

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 p-8 h-[60vh] justify-center items-center">
                <div className="w-10 h-10 border-4 border-imi-100 border-t-accent-500 rounded-full animate-spin" />
                <p className="text-imi-300 font-bold uppercase tracking-widest text-xs">Mapeando CRM...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-20">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                        <span className="text-[10px] font-black text-imi-400 uppercase tracking-[0.3em]">Módulo de Conversão</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-imi-900 font-display tracking-tight">
                        Leads & <span className="text-accent-500">Gestão CRM</span>
                    </h1>
                </div>

                <Button onClick={() => setIsModalOpen(true)} className="h-14 px-8 bg-imi-900 text-white rounded-2xl shadow-elevated group active:scale-95 transition-all">
                    <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
                    Adicionar Lead
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-imi-100 p-3 shadow-soft flex flex-col lg:flex-row gap-2">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-imi-300 group-focus-within:text-accent-500 transition-colors w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar investidor ou lead..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 h-14 bg-white border border-transparent rounded-[2rem] text-imi-900 placeholder:text-imi-300 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2 p-1">
                    {['all', 'new', 'contacted', 'qualified', 'won'].map((st) => (
                        <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-6 h-12 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${statusFilter === st
                                ? 'bg-imi-900 text-white shadow-card'
                                : 'bg-transparent text-imi-400 hover:bg-imi-50'}`}
                        >
                            {st === 'all' ? 'Todos' : st === 'new' ? 'Novos' : st === 'contacted' ? 'Contatos' : st === 'qualified' ? 'Qualificados' : 'Ganhos'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main List */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-4"
            >
                {filteredLeads.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-imi-100">
                        <div className="w-16 h-16 bg-imi-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="text-imi-200" size={32} />
                        </div>
                        <p className="text-imi-400 font-medium">Nenhum rastro encontrado na base no momento.</p>
                    </div>
                ) : (
                    filteredLeads.map((lead) => (
                        <motion.div
                            key={lead.id}
                            variants={itemVariants}
                            className="bg-white rounded-[2rem] p-6 lg:p-8 border border-imi-100 shadow-soft hover:shadow-card-hover transition-all duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group"
                        >
                            <div className="flex-1 flex flex-col sm:flex-row gap-6">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-imi-100 to-imi-50 flex items-center justify-center font-bold text-imi-400 border border-white text-xl shadow-soft">
                                    {lead.name.charAt(0)}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-xl font-bold text-imi-900 group-hover:text-accent-600 transition-colors uppercase tracking-tight">{lead.name}</h3>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${lead.ai_priority === 'critical' ? 'bg-red-50 text-red-600 border-red-100' :
                                            lead.ai_priority === 'high' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                'bg-imi-50 text-imi-400 border-imi-100'
                                            }`}>
                                            {lead.ai_priority || 'medium'}
                                        </div>
                                        {lead.ai_score && (
                                            <div className="flex items-center gap-1 bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-[10px] font-black border border-accent-100">
                                                <Zap size={10} className="fill-accent-500" />
                                                SCORE {lead.ai_score}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-imi-500 font-medium">
                                        <span className="flex items-center gap-2"><Mail size={14} className="text-imi-300" /> {lead.email || 'Private'}</span>
                                        <span className="flex items-center gap-2"><Phone size={14} className="text-imi-300" /> {lead.phone || 'No Phone'}</span>
                                        <span className="flex items-center gap-2"><ArrowUpRight size={14} className="text-imi-300" /> {lead.interest || 'General'}</span>
                                    </div>

                                    {lead.notes && (
                                        <p className="text-xs text-imi-400 italic bg-imi-50/50 p-3 rounded-xl border-l-4 border-accent-200 line-clamp-1 group-hover:line-clamp-none transition-all">
                                            "{lead.notes}"
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 w-full md:w-auto">
                                <div className="space-y-2 w-full sm:w-auto">
                                    <span className="text-[10px] font-black text-imi-300 uppercase tracking-widest block text-right">Mudar Fluxo</span>
                                    <select
                                        value={lead.status}
                                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                        className="h-10 px-4 rounded-xl border border-imi-100 bg-white text-xs font-bold text-imi-600 focus:outline-none focus:ring-2 focus:ring-accent-500 w-full sm:w-40"
                                    >
                                        <option value="new">Novo Lead</option>
                                        <option value="contacted">Em Contato</option>
                                        <option value="qualified">Qualificado</option>
                                        <option value="won">Investimento Feito</option>
                                        <option value="lost">Status Perdido</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQualifyLead(lead.id)}
                                        disabled={!!isQualifying}
                                        className={`flex items-center gap-2 h-12 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isQualifying === lead.id
                                            ? 'bg-accent-50 text-accent-600'
                                            : 'bg-accent-500 text-white shadow-elevated hover:bg-gold-600 active:scale-95'
                                            }`}
                                    >
                                        {isQualifying === lead.id ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                                        Qualificar IA
                                    </button>
                                    <button onClick={() => openEditModal(lead)} className="w-12 h-12 rounded-2xl border border-imi-100 flex items-center justify-center text-imi-400 hover:text-imi-900 hover:bg-imi-50 transition-all active:scale-95">
                                        <Edit size={20} />
                                    </button>
                                    <button onClick={() => handleDelete(lead.id)} className="w-12 h-12 rounded-2xl border border-red-50 flex items-center justify-center text-red-200 hover:text-red-600 hover:bg-red-50 transition-all active:scale-95">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-imi-900/40 backdrop-blur-md z-50 flex items-center justify-end p-0 sm:p-4 overflow-hidden">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        className="bg-white w-full max-w-xl h-full sm:h-auto sm:rounded-[3rem] shadow-2xl overflow-y-auto"
                    >
                        <div className="p-10 space-y-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl font-bold text-imi-900 font-display">{editingLead ? 'Editar' : 'Registrar'} Investidor</h2>
                                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-imi-50 flex items-center justify-center text-imi-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-imi-400 uppercase tracking-widest block mb-1">Identificação</label>
                                    <Input value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Nome Completo" className="h-14 rounded-2xl border-imi-100" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="E-mail" className="h-14 rounded-2xl border-imi-100" />
                                        <Input value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Telefone/WhatsApp" className="h-14 rounded-2xl border-imi-100" />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-imi-50">
                                    <label className="text-[10px] font-black text-imi-400 uppercase tracking-widest block mb-1">Status do Pipeline</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['new', 'contacted', 'qualified', 'won', 'lost'].map(s => (
                                            <button
                                                key={s} type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, status: s }))}
                                                className={`h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.status === s ? 'bg-imi-900 text-white border-imi-900' : 'bg-white text-imi-400 border-imi-100'}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-imi-50">
                                    <label className="text-[10px] font-black text-imi-400 uppercase tracking-widest block mb-1">Interesse e Contexto</label>
                                    <Input value={formData.interest} onChange={(e) => setFormData(prev => ({ ...prev, interest: e.target.value }))} placeholder="Imóvel ou Região de Interesse" className="h-14 rounded-2xl border-imi-100" />
                                    <Textarea value={formData.notes} onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))} placeholder="Observações estratégicas..." rows={4} className="rounded-2xl border-imi-100" />
                                </div>

                                <div className="pt-10 flex gap-4">
                                    <Button type="submit" disabled={isSaving} className="flex-1 h-14 bg-imi-900 text-white rounded-2xl shadow-elevated font-black text-xs uppercase tracking-widest">
                                        {isSaving ? 'Processando...' : (editingLead ? 'Salvar Mudanças' : 'Confirmar Registro')}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-14 border-imi-100 rounded-2xl font-black text-xs uppercase tracking-widest">
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

