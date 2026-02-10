'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon, Video, FileText, CheckCircle, Clock, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Toast, { useToast } from '@/components/ui/Toast'
import { uploadMultipleFiles, deleteFile } from '@/lib/supabase/storage'

interface Content {
  id: string
  title: string
  type: string
  content: { text: string; cta: string }
  media_urls: string[] | null
  status: string
  scheduled_at: string | null
  published_at: string | null
  created_at: string
}

export default function ContentPage() {
  const supabase = createClient()
  const { toasts, showToast, removeToast } = useToast()
  const [contents, setContents] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

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
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching content:', error)
        throw error
      }
      setContents(data || [])
    } catch (err: any) {
      console.error('Caught error:', err)
      showToast(err.message || 'Erro ao carregar conteúdos', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      const fileArray = Array.from(files)
      const { urls, errors } = await uploadMultipleFiles('content', fileArray)

      if (errors.length) showToast(`${errors.length} arquivos falharam`, 'error')
      if (urls.length > 0) {
        setFormData(prev => ({
          ...prev,
          media_urls: [...prev.media_urls, ...urls]
        }))
        showToast(`${urls.length} arquivos adicionados`, 'success')
      }
    } catch (err: any) {
      showToast('Erro no upload de mídia', 'error')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.title.trim()) {
      showToast('Título é obrigatório', 'error')
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        ...formData,
        scheduled_at: formData.scheduled_at || null
      }

      if (editingContent) {
        const { error } = await supabase
          .from('content')
          .update(payload)
          .eq('id', editingContent.id)
        if (error) {
          console.error('Error updating content:', error)
          throw error
        }
        showToast('Conteúdo atualizado', 'success')
      } else {
        const { error } = await supabase
          .from('content')
          .insert([payload])
        if (error) {
          console.error('Error inserting content:', error)
          throw error
        }
        showToast('Conteúdo criado', 'success')
      }

      setIsModalOpen(false)
      resetForm()
      fetchContents()
    } catch (err: any) {
      console.error('Caught error:', err)
      showToast(err.message || 'Erro ao salvar', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string, mediaUrls: string[] | null) {
    if (!confirm('Excluir este conteúdo permanentemente?')) return

    try {
      if (mediaUrls && mediaUrls.length > 0) {
        await Promise.all(mediaUrls.map(async (url) => {
          const path = url.split('/').pop()
          if (path) await deleteFile('content', path)
        }))
      }

      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting content:', error)
        throw error
      }
      showToast('Conteúdo excluído', 'success')
      fetchContents()
    } catch (err: any) {
      console.error('Caught error:', err)
      showToast('Erro ao excluir', 'error')
    }
  }

  async function handlePublishStats(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published'
    try {
      const { error } = await supabase
        .from('content')
        .update({
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating status:', error)
        throw error
      }
      showToast(`Status alterado para ${newStatus === 'published' ? 'Publicado' : 'Rascunho'}`, 'success')
      fetchContents()
    } catch (err: any) {
      console.error('Caught error:', err)
      showToast('Erro ao atualizar status', 'error')
    }
  }

  function openEditModal(content: Content) {
    setEditingContent(content)
    setFormData({
      title: content.title,
      type: content.type,
      content: content.content || { text: '', cta: '' },
      media_urls: content.media_urls || [],
      status: content.status,
      scheduled_at: content.scheduled_at ? new Date(content.scheduled_at).toISOString().slice(0, 16) : ''
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

  function getStatusBadge(status: string) {
    switch (status) {
      case 'published': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Publicado</span>
      case 'scheduled': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Agendado</span>
      default: return <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"><FileText className="w-3 h-3" /> Rascunho</span>
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-purple-600" />
      case 'image': return <ImageIcon className="w-4 h-4 text-blue-600" />
      default: return <FileText className="w-4 h-4 text-slate-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="grid gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>)}
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
          <h1 className="text-3xl font-bold text-imi-900">Conteúdos & Blog</h1>
          <p className="text-slate-600 mt-1">Gerencie posts, stories e artigos</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      <div className="space-y-4">
        {contents.map((content) => (
          <div key={content.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
            <div className="w-32 h-32 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden relative">
              {content.media_urls && content.media_urls.length > 0 ? (
                <img src={content.media_urls[0]} alt="Thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <div className="absolute top-1 right-1 bg-white/80 p-1 rounded-full shadow-sm">
                {getTypeIcon(content.type)}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-bold text-imi-900 mb-1">{content.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    {getStatusBadge(content.status)}
                    <span className="capitalize px-2 py-1 bg-slate-50 rounded text-xs">{content.type}</span>
                    {content.scheduled_at && (
                      <span className="flex items-center gap-1 text-xs">
                        <Calendar className="w-3 h-3" /> {new Date(content.scheduled_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handlePublishStats(content.id, content.status)} className={content.status === 'published' ? 'text-green-600 border-green-200 bg-green-50' : ''}>
                    {content.status === 'published' ? 'Despublicar' : 'Publicar'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => openEditModal(content)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(content.id, content.media_urls)} className="text-red-600 hover:bg-red-50 hover:border-red-200">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-slate-600 text-sm line-clamp-2">{content.content?.text || 'Sem descrição'}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-imi-900">
                {editingContent ? 'Editar Conteúdo' : 'Novo Conteúdo'}
              </h2>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Título *"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
                <div>
                  <label className="block text-sm font-semibold text-imi-900 mb-2">Tipo de Conteúdo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-imi-900"
                  >
                    <option value="post">Post (Feed)</option>
                    <option value="story">Story</option>
                    <option value="video">Vídeo (Reels/Shorts)</option>
                    <option value="article">Artigo (Blog)</option>
                    <option value="carousel">Carrossel</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Legenda / Texto *"
                value={formData.content.text}
                onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, text: e.target.value } }))}
                rows={6}
                required
              />

              <Input
                label="CTA (Call to Action)"
                value={formData.content.cta}
                placeholder="Ex: Clique no link da bio"
                onChange={(e) => setFormData(prev => ({ ...prev, content: { ...prev.content, cta: e.target.value } }))}
              />

              <div>
                <label className="block text-sm font-semibold text-imi-900 mb-2">Mídias (Imagens/Vídeos)</label>
                <div className="flex gap-4 items-center">
                  <input type="file" accept="image/*,video/*" multiple onChange={handleMediaUpload} disabled={isUploading} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-imi-50 file:text-imi-700 hover:file:bg-imi-100" />
                  {isUploading && <span className="text-sm text-blue-600 animate-pulse">Enviando...</span>}
                </div>

                {formData.media_urls.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-4 bg-slate-50 p-4 rounded-lg">
                    {formData.media_urls.map((url, i) => (
                      <div key={i} className="relative group">
                        <img src={url} alt={`Media ${i}`} className="w-full h-20 object-cover rounded-lg shadow-sm" />
                        <button type="button" onClick={() => removeMedia(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Agendar Para"
                  type="datetime-local"
                  value={formData.scheduled_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                />
                <div>
                  <label className="block text-sm font-semibold text-imi-900 mb-2">Status Inicial</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full h-11 px-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-imi-900"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="scheduled">Agendado</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-200">
                <Button type="submit" className="flex-1" disabled={isSaving || isUploading}>
                  {isSaving ? 'Salvando...' : (editingContent ? 'Salvar Edição' : 'Criar Conteúdo')}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => { setIsModalOpen(false); resetForm(); }} disabled={isSaving}>
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
