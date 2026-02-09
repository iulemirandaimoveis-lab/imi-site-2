'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { uploadMultipleFiles, deleteFile } from '@/lib/supabase/storage'

interface Content {
    id: string
    title: string
    type: string
    content: any
    media_urls: string[] | null
    status: string
    scheduled_at: string | null
    published_at: string | null
    created_at: string
}

export default function ContentPage() {
    const supabase = createClientComponentClient()
    const [contents, setContents] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingContent, setEditingContent] = useState<Content | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        type: 'post',
        content: { text: '', cta: '' },
        media_urls: [] as string[],
        status: 'draft',
        scheduled_at: ''
    })

    useEffect(() => {
        fetchContents()
    }, [])

    async function fetchContents() {
        const { data, error } = await supabase
            .from('content')
            .select('*')
            .order('created_at', { ascending: false })

        if (!error && data) {
            setContents(data)
        }
        setIsLoading(false)
    }

    async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        const fileArray = Array.from(files)
        const { urls, errors } = await uploadMultipleFiles('content', fileArray)

        if (urls.length > 0) {
            setFormData(prev => ({
                ...prev,
                media_urls: [...prev.media_urls, ...urls]
            }))
        }

        if (errors.length > 0) {
            console.error('Upload errors:', errors)
        }

        setIsUploading(false)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const payload = {
            ...formData,
            scheduled_at: formData.scheduled_at || null
        }

        if (editingContent) {
            await supabase
                .from('content')
                .update(payload)
                .eq('id', editingContent.id)
        } else {
            await supabase
                .from('content')
                .insert([payload])
        }

        setIsModalOpen(false)
        resetForm()
        fetchContents()
    }

    async function handleDelete(id: string, mediaUrls: string[] | null) {
        if (!confirm('Tem certeza que deseja excluir este conteúdo?')) return

        if (mediaUrls && mediaUrls.length > 0) {
            for (const url of mediaUrls) {
                const path = url.split('/').pop()
                if (path) await deleteFile('content', path)
            }
        }

        await supabase
            .from('content')
            .delete()
            .eq('id', id)

        fetchContents()
    }

    async function handlePublish(id: string) {
        await supabase
            .from('content')
            .update({
                status: 'published',
                published_at: new Date().toISOString()
            })
            .eq('id', id)

        fetchContents()
    }

    function openEditModal(content: Content) {
        setEditingContent(content)
        setFormData({
            title: content.title,
            type: content.type,
            content: content.content || { text: '', cta: '' },
            media_urls: content.media_urls || [],
            status: content.status,
            scheduled_at: content.scheduled_at || ''
        })
        setIsModalOpen(true)
    }

    function resetForm() {
        setFormData({
            title: '',
            type: 'post',
            content: { text: '', cta: '' },
            media_urls: [],
            status: 'draft',
            scheduled_at: ''
        })
        setEditingContent(null)
    }

    function removeMedia(index: number) {
        setFormData(prev => ({
            ...prev,
            media_urls: prev.media_urls.filter((_, i) => i !== index)
        }))
    }

    if (isLoading) {
        return <div className="p-8">Carregando...</div>
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-navy-900">Conteúdos</h1>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Conteúdo
                </Button>
            </div>

            <div className="grid gap-6">
                {contents.map((content) => (
                    <div key={content.id} className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-navy-900 mb-2">{content.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                    <span className="px-2 py-1 bg-slate-100 rounded">{content.type}</span>
                                    <span className="px-2 py-1 bg-slate-100 rounded">{content.status}</span>
                                    {content.scheduled_at && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(content.scheduled_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {content.status === 'draft' && (
                                    <Button size="sm" onClick={() => handlePublish(content.id)}>
                                        Publicar
                                    </Button>
                                )}
                                <Button size="sm" variant="outline" onClick={() => openEditModal(content)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(content.id, content.media_urls)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        {content.media_urls && content.media_urls.length > 0 && (
                            <div className="flex gap-2 mt-4">
                                {content.media_urls.slice(0, 3).map((url, i) => (
                                    <img
                                        key={i}
                                        src={url}
                                        alt="Media"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                ))}
                                {content.media_urls.length > 3 && (
                                    <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center text-slate-600">
                                        +{content.media_urls.length - 3}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-6">
              {editingContent ? 'Editar Conteúdo' : 'Novo Conteúdo'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Título"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />

              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200"
                >
                  <option value="post">Post</option>
                  <option value="story">Story</option>
                  <option value="video">Vídeo</option>
                  <option value="carousel">Carrossel</option>
                </select>
              </div>

              <Textarea
                label="Texto"
                value={formData.content.text}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, text: e.target.value }
                }))}\n                rows={6}
                required
              />

              <Input
                label="CTA Call to Action"
                value={formData.content.cta}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, cta: e.target.value }
                }))}
              />

              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Mídias
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="w-full"
                  disabled={isUploading}
                />
                {isUploading && <p className="text-sm text-slate-600 mt-2">Enviando...</p>}
                
                {formData.media_urls.length > 0 && (
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    {formData.media_urls.map((url, i) => (
                      <div key={i} className=\"relative\">
                        <img src={url} alt=\"Preview\" className=\"w-full h-24 object-cover rounded\" />
                        <button
                          type=\"button\"
                          onClick={() => removeMedia(i)}
                          className=\"absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs\"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Input
                label="Agendar para"
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
              />

              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full h-11 px-4 rounded-lg border border-slate-200"
                >
                  <option value="draft">Rascunho</option>
                  <option value="scheduled">Agendado</option>
                  <option value="published">Publicado</option>
                </select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  {editingContent ? 'Atualizar' : 'Criar'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetForm()
                  }}
                >\n                  Cancelar
                </Button>
              </div>
            </form>
          </div >
        </div >
      )
}
    </div >
  )
}
