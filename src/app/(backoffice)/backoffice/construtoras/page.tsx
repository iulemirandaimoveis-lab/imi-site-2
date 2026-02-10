'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Toast, { useToast } from '@/components/ui/Toast'
import { uploadFile, deleteFile } from '@/lib/supabase/storage'

interface Developer {
    id: string
    name: string
    logo_url: string | null
    description: string | null
    website: string | null
    cnpj: string | null
    phone: string | null
    email: string | null
    active: boolean
    created_at: string
}

export default function DevelopersPage() {
    const supabase = createClient()
    const { toasts, showToast, removeToast } = useToast()
    const [developers, setDevelopers] = useState<Developer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        logo_url: '',
        description: '',
        website: '',
        cnpj: '',
        phone: '',
        email: '',
        active: true
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchDevelopers()
    }, [])

    async function fetchDevelopers() {
        setIsLoading(true)
        try {
            const { data, error } = await supabase
                .from('developers')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching:', error)
                throw error
            }
            setDevelopers(data || [])
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao carregar construtoras', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    function validateForm() {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório'
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido'
        }

        if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
            newErrors.website = 'URL inválida (deve começar com http:// ou https://)'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            showToast('Apenas imagens são permitidas', 'error')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast('Imagem deve ter no máximo 5MB', 'error')
            return
        }

        setIsUploading(true)
        try {
            const timestamp = Date.now()
            const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`

            const { url, error } = await uploadFile('developers', fileName, file)

            if (error) throw error
            if (url) {
                setFormData(prev => ({ ...prev, logo_url: url }))
                showToast('Logo enviado com sucesso', 'success')
            }
        } catch (err: any) {
            showToast(err.message || 'Erro ao enviar logo', 'error')
        } finally {
            setIsUploading(false)
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!validateForm()) {
            showToast('Corrija os erros no formulário', 'error')
            return
        }

        setIsSaving(true)
        try {
            if (editingDeveloper) {
                const { error } = await supabase
                    .from('developers')
                    .update(formData)
                    .eq('id', editingDeveloper.id)

                if (error) {
                    console.error('Error updating:', error)
                    throw error
                }
                showToast('Construtora atualizada com sucesso', 'success')
            } else {
                const { error } = await supabase
                    .from('developers')
                    .insert([formData])

                if (error) {
                    console.error('Error inserting:', error)
                    throw error
                }
                showToast('Construtora criada com sucesso', 'success')
            }

            setIsModalOpen(false)
            resetForm()
            fetchDevelopers()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao salvar construtora', 'error')
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string, logoUrl: string | null) {
        if (!confirm('Tem certeza que deseja excluir esta construtora?')) return

        try {
            if (logoUrl) {
                const path = logoUrl.split('/').pop()
                if (path) await deleteFile('developers', path)
            }

            const { error } = await supabase
                .from('developers')
                .delete()
                .eq('id', id)

            if (error) {
                console.error('Error deleting:', error)
                throw error
            }
            showToast('Construtora excluída com sucesso', 'success')
            fetchDevelopers()
        } catch (err: any) {
            console.error('Caught error:', err)
            showToast(err.message || 'Erro ao excluir construtora', 'error')
        }
    }

    function openEditModal(developer: Developer) {
        setEditingDeveloper(developer)
        setFormData({
            name: developer.name,
            logo_url: developer.logo_url || '',
            description: developer.description || '',
            website: developer.website || '',
            cnpj: developer.cnpj || '',
            phone: developer.phone || '',
            email: developer.email || '',
            active: developer.active
        })
        setErrors({})
        setIsModalOpen(true)
    }

    function resetForm() {
        setFormData({
            name: '',
            logo_url: '',
            description: '',
            website: '',
            cnpj: '',
            phone: '',
            email: '',
            active: true
        })
        setEditingDeveloper(null)
        setErrors({})
    }

    if (isLoading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8">
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => removeToast(toast.id)}
                />
            ))}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-imi-900">Construtoras</h1>
                    <p className="text-slate-600 mt-1">{developers.length} construtoras cadastradas</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Nova Construtora
                </Button>
            </div>

            {
                developers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <p className="text-slate-600 mb-4">Nenhuma construtora cadastrada</p>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="w-5 h-5 mr-2" />
                            Cadastrar Primeira Construtora
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            developers.map((developer) => (
                                <div key={developer.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                                    {developer.logo_url ? (
                                        <img
                                            src={developer.logo_url}
                                            alt={developer.name}
                                            className="w-full h-32 object-contain mb-4 bg-slate-50 rounded-lg p-4"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                                            <Upload className="w-8 h-8 text-slate-400" />
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold text-imi-900 mb-2">{developer.name}</h3>

                                    {developer.description && (
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{developer.description}</p>
                                    )}

                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${developer.active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {developer.active ? 'Ativa' : 'Inativa'}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => openEditModal(developer)} className="flex-1">
                                            <Edit className="w-4 h-4 mr-1" />
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(developer.id, developer.logo_url)}
                                            className="flex-1"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                )
            }

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-imi-900">
                                {editingDeveloper ? 'Editar Construtora' : 'Nova Construtora'}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false)
                                    resetForm()
                                }}
                                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <Input
                                label="Nome *"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                error={errors.name}
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-imi-900 mb-2">
                                    Logo
                                </label>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="w-full text-sm"
                                            disabled={isUploading}
                                        />
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG ou SVG até 5MB</p>
                                    </div>
                                    {isUploading && (
                                        <span className="text-sm text-slate-600">Enviando...</span>
                                    )}
                                </div>
                                {formData.logo_url && (
                                    <div className="mt-4 relative inline-block">
                                        <img src={formData.logo_url} alt="Preview" className="h-24 object-contain bg-slate-50 rounded-lg p-2" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, logo_url: '' }))}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Textarea
                                label="Descrição"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={4}
                            />

                            <Input
                                label="Website"
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                                error={errors.website}
                                placeholder="https://exemplo.com.br"
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="CNPJ"
                                    value={formData.cnpj}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                                    placeholder="00.000.000/0000-00"
                                />
                                <Input
                                    label="Telefone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    placeholder="(81) 99999-9999"
                                />
                            </div>

                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                error={errors.email}
                                placeholder="contato@construtora.com.br"
                            />

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    className="w-4 h-4 rounded border-slate-300"
                                />
                                <span className="text-sm text-imi-900 font-medium">Construtora ativa</span>
                            </label>

                            <div className="flex gap-4 pt-4 border-t border-slate-200">
                                <Button type="submit" className="flex-1" disabled={isSaving}>
                                    {isSaving ? 'Salvando...' : (editingDeveloper ? 'Atualizar' : 'Criar')}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        resetForm()
                                    }}
                                    disabled={isSaving}
                                >
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
