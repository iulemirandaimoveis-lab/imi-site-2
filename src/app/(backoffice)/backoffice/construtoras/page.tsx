'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
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
    const supabase = createClientComponentClient()
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

            if (error) throw error
            setDevelopers(data || [])
        } catch (err: any) {
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
        } \n\n    if (file.size > 5 * 1024 * 1024) {
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

                if (error) throw error
                showToast('Construtora atualizada com sucesso', 'success')
            } else {
                const { error } = await supabase
                    .from('developers')
                    .insert([formData])

                if (error) throw error
                showToast('Construtora criada com sucesso', 'success')
            }

            setIsModalOpen(false)
            resetForm()
            fetchDevelopers()
        } catch (err: any) {
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

            if (error) throw error
            showToast('Construtora excluída com sucesso', 'success')
            fetchDevelopers()
        } catch (err: any) {
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
        setErrors({}) \n    setIsModalOpen(true)
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
            active: true\n
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
                            <div key={i} className=\"h-64 bg-slate-200 rounded-xl\"></div>
            ))}
                </div>
            </div>
      </div >
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

            <div className=\"flex items-center justify-between mb-8\">
            <div>
                <h1 className=\"text-3xl font-bold text-navy-900\">Construtoras</h1>
            <p className=\"text-slate-600 mt-1\">{developers.length} construtoras cadastradas</p>
        </div >
        <Button onClick={() => setIsModalOpen(true)}>
            <Plus className=\"w-5 h-5 mr-2\" />
            Nova Construtora
        </Button>
      </div >

    {
        developers.length === 0 ? (
            <div className=\"text-center py-12 bg-white rounded-xl border border-slate-200\">
            <p className =\"text-slate-600 mb-4\">Nenhuma construtora cadastrada</p>\n          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className =\"w-5 h-5 mr-2\" />
            Cadastrar Primeira Construtora
          </Button>\n        </div >
      ) : (
        <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\">
    {
        developers.map((developer) => (
            <div key={developer.id} className=\"bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow\">
              { developer.logo_url ? (\n<img \n                  src = {developer.logo_url } \n                  alt = { developer.name }\n                  className =\"w-full h-32 object-contain mb-4 bg-slate-50 rounded-lg p-4\"\n                />\n              ) : (\n                <div className=\"w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center mb-4\">\n                  <Upload className=\"w-8 h-8 text-slate-400\" />\n                </div>\n              )}\n              \n              <h3 className=\"text-xl font-bold text-navy-900 mb-2\">{developer.name}</h3>\n              \n              {developer.description && (\n                <p className=\"text-slate-600 text-sm mb-4 line-clamp-2\">{developer.description}</p>\n              )}\n              \n              <div className=\"flex items-center gap-2 mb-4\">\n                <span className={`px-2 py-1 rounded text-xs font-semibold ${\n                  developer.active ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'\n                }`}>\n                  {developer.active ? 'Ativa' : 'Inativa'}\n                </span>\n              </div>\n              \n              <div className=\"flex gap-2\">\n                <Button size=\"sm\" variant=\"outline\" onClick={() => openEditModal(developer)} className=\"flex-1\">\n                  <Edit className=\"w-4 h-4 mr-1\" />\n                  Editar\n                </Button>\n                <Button \n                  size=\"sm\" \n                  variant=\"outline\" \n                  onClick={() => handleDelete(developer.id, developer.logo_url)}\n                  className=\"flex-1\"\n                >\n                  <Trash2 className=\"w-4 h-4 mr-1\" />\n                  Excluir\n                </Button>\n              </div>\n            </div>\n          ))}\n        </div>
        )
    } \n\n      { isModalOpen && (\n < div className =\"fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4\">\n          <div className=\"bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto\">\n            <div className=\"sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between\">\n              <h2 className=\"text-2xl font-bold text-navy-900\">\n                {editingDeveloper ? 'Editar Construtora' : 'Nova Construtora'}\n              </h2>\n              <button\n                onClick={() => {\n                  setIsModalOpen(false)\n                  resetForm()\n                }}\n                className=\"w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors\"\n              >\n                <X className=\"w-5 h-5\" />\n              </button>\n            </div>\n\n            <form onSubmit={handleSubmit} className=\"p-8 space-y-6\">\n              <Input\n                label=\"Nome *\"\n                value={formData.name}\n                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}\n                error={errors.name}\n                required\n              />\n\n              <div>\n                <label className=\"block text-sm font-semibold text-navy-900 mb-2\">\n                  Logo\n                </label>\n                <div className=\"flex gap-4 items-start\">\n                  <div className=\"flex-1\">\n                    <input\n                      type=\"file\"\n                      accept=\"image/*\"\n                      onChange={handleLogoUpload}\n                      className=\"w-full text-sm\"\n                      disabled={isUploading}\n                    />\n                    <p className=\"text-xs text-slate-500 mt-1\">PNG, JPG ou SVG até 5MB</p>\n                  </div>\n                  {isUploading && (\n                    <span className=\"text-sm text-slate-600\">Enviando...</span>\n                  )}\n                </div>\n                {formData.logo_url && (\n                  <div className=\"mt-4 relative inline-block\">\n                    <img src={formData.logo_url} alt=\"Preview\" className=\"h-24 object-contain bg-slate-50 rounded-lg p-2\" />\n                    <button\n                      type=\"button\"\n                      onClick={() => setFormData(prev => ({ ...prev, logo_url: '' }))}\n                      className=\"absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600\"\n                    >\n                      <X className=\"w-4 h-4\" />\n                    </button>\n                  </div>\n                )}\n              </div>\n\n              <Textarea\n                label=\"Descrição\"\n                value={formData.description}\n                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}\n                rows={4}\n              />\n\n              <Input\n                label=\"Website\"\n                type=\"url\"\n                value={formData.website}\n                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}\n                error={errors.website}\n                placeholder=\"https://exemplo.com.br\"\n              />\n\n              <div className=\"grid md:grid-cols-2 gap-4\">\n                <Input\n                  label=\"CNPJ\"\n                  value={formData.cnpj}\n                  onChange={(e) => setFormData(prev => ({ ...prev, cnpj: e.target.value }))}\n                  placeholder=\"00.000.000/0000-00\"\n                />\n                <Input\n                  label=\"Telefone\"\n                  value={formData.phone}\n                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}\n                  placeholder=\"(81) 99999-9999\"\n                />\n              </div>\n\n              <Input\n                label=\"Email\"\n                type=\"email\"\n                value={formData.email}\n                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}\n                error={errors.email}\n                placeholder=\"contato@construtora.com.br\"\n              />\n\n              <label className=\"flex items-center gap-2 cursor-pointer\">\n                <input\n                  type=\"checkbox\"\n                  checked={formData.active}\n                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}\n                  className=\"w-4 h-4 rounded border-slate-300\"\n                />\n                <span className=\"text-sm text-navy-900 font-medium\">Construtora ativa</span>\n              </label>\n\n              <div className=\"flex gap-4 pt-4 border-t border-slate-200\">\n                <Button type=\"submit\" className=\"flex-1\" disabled={isSaving}>\n                  {isSaving ? 'Salvando...' : (editingDeveloper ? 'Atualizar' : 'Criar')}\n                </Button>\n                <Button \n                  type=\"button\" \n                  variant=\"outline\" \n                  className=\"flex-1\"\n                  onClick={() => {\n                    setIsModalOpen(false)\n                    resetForm()\n                  }}\n                  disabled={isSaving}\n                >\n                  Cancelar\n                </Button>\n              </div>\n            </form>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}
