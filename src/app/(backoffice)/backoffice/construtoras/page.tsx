'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Edit, Trash2, Building } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { uploadMultipleFiles, deleteFile } from '@/lib/supabase/storage'

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
            .order('name')

        if (!error && data) {
            setDevelopers(data)
        }
        setIsLoading(false)
    }

    async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const { urls, errors } = await uploadMultipleFiles('developers', [file])

        if (urls.length > 0) {
            setFormData(prev => ({ ...prev, logo_url: urls[0] }))
        }

        if (errors.length > 0) {
            console.error('Upload errors:', errors)
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
            const fileName = logoUrl.split('/').pop()
            if (fileName) {
                await deleteFile('developers', fileName)
            }
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
                </Button>\n      </div>

            <div className="grid gap-6">
                {developers.map((dev) => (
          <div key={dev.id} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className=\"flex items-start justify-between\">
              <div className=\"flex items-center gap-6\">
                <div className=\"w-20 h-20 bg-slate-50 rounded-lg flex items-center justify-center p-2\">
                  {dev.logo_url ? (\n                    <img src={dev.logo_url} alt={dev.name} className=\"max-w-full max-h-full object-contain\" />\n                  ) : (\n                    <Building className=\"w-10 h-10 text-slate-300\" />\n                  )}\n                </div>
                <div>
                  <h3 className=\"text-xl font-bold text-navy-900\">{dev.name}</h3>
                  <p className=\"text-sm text-slate-500\">{dev.website || 'Sem website'}</p>
        </div>
              </div >
        <div className=\"flex gap-2\">
            < Button size =\"sm\" variant=\"outline\" onClick={() => openEditModal(dev)}>
                < Edit className =\"w-4 h-4\" />
                </Button >
        <Button \ n size=\"sm\" \n                  variant=\"outline\" \n                  onClick={() => handleDelete(dev.id, dev.logo_url)}\n                >\n                  <Trash2 className=\"w-4 h-4\" />\n                </Button>
              </div >
            </div >
          </div >
        ))
}
      </div >

    { isModalOpen && (
        <div className=\"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4\">
            < div className =\"bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8\">
                < h2 className =\"text-2xl font-bold text-navy-900 mb-6\">
{ editingDeveloper ? 'Editar Construtora' : 'Nova Construtora' }
            </h2 >

    <form onSubmit={handleSubmit} className=\"space-y-6\">
        < Input\n                label =\"Nome da Construtora\"\n                value={formData.name}\n                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}\n                required\n              />

            < div >
            <label className=\"block text-sm font-semibold text-navy-900 mb-2\">\n                  Logo\n                </label>
                < input\n                  type =\"file\"\n                  accept=\"image/*\"\n                  onChange={handleLogoUpload}\n                  className=\"w-full\"\n                  disabled={isUploading}\n                />
{
    isUploading && <p className=\"text-sm text-slate-600 mt-2\">Enviando...</p>}
    {
        formData.logo_url && (\n < img src = { formData.logo_url } alt =\"Preview\" className=\"mt-4 h-20 object-contain\" />\n                )}\n              </div>

            < Textarea\n                label =\"Descrição\"\n                value={formData.description}\n                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}\n                rows={4}\n              />

                < div className =\"grid md:grid-cols-2 gap-4\">\n                <Input\n                  label=\"CNPJ\"\n                  value={formData.cnpj}\n                  onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}\n                />\n                <Input\n                  label=\"Website\"\n                  value={formData.website}\n                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}\n                />\n              </div>

                    < div className =\"grid md:grid-cols-2 gap-4\">\n                <Input\n                  label=\"Telefone\"\n                  value={formData.phone}\n                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}\n                />\n                <Input\n                  label=\"E-mail\"\n                  type=\"email\"\n                  value={formData.email}\n                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}\n                />\n              </div>

                        < div className =\"flex gap-4\">\n                <Button type=\"submit\" className=\"flex-1\">\n                  {editingDeveloper ? 'Atualizar' : 'Criar'}\n                </Button>\n                <Button \n                  type=\"button\" \n                  variant=\"outline\" \n                  className=\"flex-1\"\n                  onClick={() => {\n                    setIsModalOpen(false)\n                    resetForm()\n                  }}\n                >\n                  Cancelar\n                </Button>
              </div >
            </form >
          </div >
        </div >
      )
    } \n    </div >\n  ) \n
}
