'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, CheckCircle, Clock, X, Calendar, Phone, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Toast, { useToast } from '@/components/ui/Toast'

interface Consultation {
    id: string
    client_name: string
    client_email: string
    client_phone: string | null
    consultation_type: string
    status: string
    notes: string | null
    scheduled_at: string | null
    completed_at: string | null
    created_at: string
}

export default function ConsultationPage() {
    const supabase = createClient()
    const { toasts, showToast, removeToast } = useToast()
    const [consultations, setConsultations] = useState<Consultation[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null)
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        client_name: '',
        client_email: '',
        client_phone: '',
        consultation_type: 'avaliacao',
        status: 'pending',
        notes: '',
        scheduled_at: ''
    })

    useEffect(() => {
        fetchConsultations()
    }, [filterStatus])

    async function fetchConsultations() {
        setIsLoading(true)
        try {
            let query = supabase
                .from('consultations')
                .select('*')
                .order('created_at', { ascending: false })

            if (filterStatus !== 'all') {
                query = query.eq('status', filterStatus)
            }

            const { data, error } = await query
            if (error) {
                console.error('Error fetching consultations:', error)
                throw error
            }
            setConsultations(data || [])
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao carregar consultorias', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!formData.client_name || !formData.client_email) {
            showToast('Nome e Email são obrigatórios', 'error')
            return
        }

        setIsSaving(true)
        try {
            const payload = {
                ...formData,
                scheduled_at: formData.scheduled_at || null
            }

            if (editingConsultation) {
                const { error } = await supabase
                    .from('consultations')
                    .update(payload)
                    .eq('id', editingConsultation.id)
                if (error) {
                    console.error('Error updating consultation:', error)
                    throw error
                }
                showToast('Consultoria atualizada', 'success')
            } else {
                const { error } = await supabase
                    .from('consultations')
                    .insert([payload])
                if (error) {
                    console.error('Error inserting consultation:', error)
                    throw error
                }
                showToast('Consultoria agendada', 'success')
            }

            setIsModalOpen(false)
            resetForm()
            fetchConsultations()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao salvar', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Excluir este agendamento?')) return

        try {
            const { error } = await supabase
                .from('consultations')
                .delete()
                .eq('id', id)

            if (error) {
                console.error('Error deleting consultation:', error)
                throw error
            }
            showToast('Consultoria excluída', 'success')
            fetchConsultations()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast('Erro ao excluir', 'error')
        }
    }

    async function handleComplete(id: string) {
        try {
            const { error } = await supabase
                .from('consultations')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString()
                })
                .eq('id', id)

            if (error) {
                console.error('Error completing consultation:', error)
                throw error
            }
            showToast('Consultoria marcada como concluída', 'success')
            fetchConsultations()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast('Erro ao atualizar status', 'error')
        }
    }

    function openEditModal(consultation: Consultation) {
        setEditingConsultation(consultation)
        setFormData({
            client_name: consultation.client_name,
            client_email: consultation.client_email,
            client_phone: consultation.client_phone || '',
            consultation_type: consultation.consultation_type,
            status: consultation.status,
            notes: consultation.notes || '',
            scheduled_at: consultation.scheduled_at ? new Date(consultation.scheduled_at).toISOString().slice(0, 16) : ''
        })
        setIsModalOpen(true)
    }

    function resetForm() {
        setFormData({
            client_name: '',
            client_email: '',
            client_phone: '',
            consultation_type: 'avaliacao',
            status: 'pending',
            notes: '',
            scheduled_at: ''
        })
        setEditingConsultation(null)
    }

    function getStatusColor(status: string) {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'completed': return 'bg-green-100 text-green-800 border-green-200'
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
            default: return 'bg-slate-100 text-slate-800 border-slate-200'
        }
    }

    function getStatusLabel(status: string) {
        switch (status) {
            case 'pending': return 'Pendente'
            case 'scheduled': return 'Agendada'
            case 'completed': return 'Concluída'
            case 'cancelled': return 'Cancelada'
            default: return status
        }
    }

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                    <div className="grid gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>)}
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

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900">Agenda & Consultoria</h1>
                    <p className="text-slate-600 mt-1">Gerencie os agendamentos e leads</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Agendamento
                </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
                {['all', 'pending', 'scheduled', 'completed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                            ? 'bg-imi-900 text-white shadow-md'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {status === 'all' ? 'Todos' : getStatusLabel(status)}
                    </button>
                ))}
            </div>

            <div className="grid gap-4">
                {consultations.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500">Nenhum agendamento encontrado.</p>
                    </div>
                ) : (
                    consultations.map((consultation) => (
                        <div key={consultation.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-imi-200 transition-all shadow-sm hover:shadow-md">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                            {consultation.client_name}
                                            <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(consultation.status)}`}>
                                                {getStatusLabel(consultation.status)}
                                            </span>
                                        </h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-2 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" /> {consultation.client_email}
                                        </div>
                                        {consultation.client_phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-slate-400" /> {consultation.client_phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 capitalize">
                                            <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold">Tipo: {consultation.consultation_type.replace('_', ' ')}</span>
                                        </div>
                                        {consultation.scheduled_at && (
                                            <div className="flex items-center gap-2 text-blue-700 font-medium">
                                                <Clock className="w-4 h-4" />
                                                {new Date(consultation.scheduled_at).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                            </div>
                                        )}
                                    </div>

                                    {consultation.notes && (
                                        <div className="p-3 bg-slate-50 rounded border border-slate-100 text-sm text-slate-700 italic border-l-4 border-l-imi-200">
                                            "{consultation.notes}"
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-start gap-2 border-t pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
                                    {consultation.status !== 'completed' && (
                                        <Button size="sm" onClick={() => handleComplete(consultation.id)} title="Concluir" className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button size="sm" variant="outline" onClick={() => openEditModal(consultation)} title="Editar">
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete(consultation.id)} title="Excluir" className="text-red-600 hover:bg-red-50 hover:border-red-200">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
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
                                {editingConsultation ? 'Editar Agendamento' : 'Novo Agendamento'}
                            </h2>
                            <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full">
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <Input
                                label="Nome do Cliente *"
                                value={formData.client_name}
                                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Email *"
                                    type="email"
                                    value={formData.client_email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                                    required
                                />
                                <Input
                                    label="Telefone / WhatsApp"
                                    value={formData.client_phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-imi-900 mb-2">Tipo de Consultoria</label>
                                    <select
                                        value={formData.consultation_type}
                                        onChange={(e) => setFormData(prev => ({ ...prev, consultation_type: e.target.value }))}
                                        className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-imi-900"
                                    >
                                        <option value="avaliacao">Avaliação de Imóvel</option>
                                        <option value="credito">Crédito Imobiliário</option>
                                        <option value="investimento">Consultoria de Investimento</option>
                                        <option value="compra">Assessoria de Compra</option>
                                        <option value="venda">Assessoria de Venda</option>
                                    </select>
                                </div>
                                <Input
                                    label="Data e Hora"
                                    type="datetime-local"
                                    value={formData.scheduled_at}
                                    onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-imi-900 mb-2">Status</label>
                                <div className="flex gap-4">
                                    {['pending', 'scheduled', 'completed', 'cancelled'].map(status => (
                                        <label key={status} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={formData.status === status}
                                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                                className="w-4 h-4 text-imi-900 focus:ring-imi-900"
                                            />
                                            <span className="text-sm capitalize">{getStatusLabel(status)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Textarea
                                label="Notas / Observações"
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                rows={4}
                                placeholder="Detalhes sobre o interesse do cliente..."
                            />

                            <div className="flex gap-4 pt-4 border-t border-slate-200">
                                <Button type="submit" className="flex-1 h-12" disabled={isSaving}>
                                    {isSaving ? 'Salvando...' : (editingConsultation ? 'Salvar Alterações' : 'Confirmar Agendamento')}
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
