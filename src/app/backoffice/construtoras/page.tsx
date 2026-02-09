'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Edit, Trash2, Upload } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
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
    const supabase = createClientComponentClient()
    const [developers, setDevelopers] = useState<Developer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null)
    const [isUploading, setIsUploading] = useState(false)

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

    useEffect(() => {
        fetchDevelopers()
    }, [])

    async function fetchDevelopers() {
        const { data, error } = await supabase
            .from('developers')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setDevelopers(data)
        }
        setIsLoading(false)
    }

    async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const timestamp = Date.now()
        const fileName = `${timestamp}-${file.name}`

        const { url, error } = await uploadFile('developers', fileName, file)

        if (url) {
            setFormData(prev => ({ ...prev, logo_url: url }))
        }
        setIsUploading(false)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (editingDeveloper) {
            await supabase
                .from('developers')
                .update(formData)
                .eq('id', editingDeveloper.id)
        } else {
            await supabase
                .from('developers')
                .insert([formData])
        }

        setIsModalOpen(false)
        resetForm()
        fetchDevelopers()
    }

    async function handleDelete(id: string, logoUrl: string | null) {
        if (!confirm('Tem certeza que deseja excluir esta construtora?')) return

        if (logoUrl) {
            const path = logoUrl.split('/').pop()
            if (path) await deleteFile('developers', path)
        }

        await supabase
            .from('developers')
            .delete()
            .eq('id', id)

        fetchDevelopers()
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
    }

    if (isLoading) {
        return <div className="p-8">Carregando...</div>
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-navy-900">Construtoras</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Nova Construtora
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {developers.map((developer) => (
                    <div key={developer.id} className="bg-white rounded-xl p-6 border border-slate-200">
                        {developer.logo_url && (
                            <img
                                src={developer.logo_url}
                                alt={developer.name}
                                className="w-full h-32 object-contain mb-4"
                            />
                        )}
                        <h3 className="text-xl font-bold text-navy-900 mb-2">{developer.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{developer.description}</p>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => openEditModal(developer)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(developer.id, developer.logo_url)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                        <h2 className="text-2xl font-bold text-navy-900 mb-6">
                            {editingDeveloper ? 'Editar Construtora' : 'Nova Construtora'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Nome"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-navy-900 mb-2">
                                    Logo
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="flex-1"
                                        disabled={isUploading}
                                    />
                                    {isUploading && <span>Enviando...</span>}
                                </div>
                                {formData.logo_url && (
                                    <img src={formData.logo_url} alt="Preview" className="mt-4 h-24 object-contain" />
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
                            />

                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="CNPJ"
                                    value={formData.cnpj}
                                    onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}
                                />
                                <Input
                                    label="Telefone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>

                            <Input
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm text-navy-900">Ativo</span>
                            </label>

                            <div className="flex gap-4">
                                <Button type="submit" className="flex-1">
                                    {editingDeveloper ? 'Atualizar' : 'Criar'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        resetForm()
                                    }}
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
