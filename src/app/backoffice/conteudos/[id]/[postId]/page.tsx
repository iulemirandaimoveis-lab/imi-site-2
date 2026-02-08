'use client';

import { use, useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    ArrowLeft,
    Sparkles,
    Image as ImageIcon,
    Save,
    Send,
    Loader2,
    Instagram,
    Facebook,
    Linkedin,
    Twitter,
    CheckCircle2,
    Copy,
    Download,
    Calendar,
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import ScheduleModal from '../../components/ScheduleModal';

const supabase = createClient();

const platformIcons: Record<string, any> = {
    instagram_feed: Instagram,
    instagram_story: Instagram,
    facebook: Facebook,
    linkedin: Linkedin,
    twitter: Twitter,
};

const platformLabels: Record<string, string> = {
    instagram_feed: 'Instagram Feed',
    instagram_story: 'Instagram Story',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    twitter: 'Twitter/X',
};

export default function PostEditorPage({
    params,
}: {
    params: Promise<{ id: string; postId: string }>;
}) {
    const { id: calendarId, postId } = use(params);
    const [saving, setSaving] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [publishing, setPublishing] = useState<string | null>(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    // Busca post
    const { data: post, mutate } = useSWR(
        postId ? ['post', postId] : null,
        async () => {
            const { data, error } = await supabase
                .from('content_items')
                .select('*, content_variants(*), content_calendar(*)')
                .eq('id', postId)
                .single();

            if (error) throw error;
            return data;
        }
    );

    const handleGenerateImage = async () => {
        if (!post || !post.image_prompt) {
            toast.error('Prompt de imagem não disponível');
            return;
        }

        setGenerating(true);

        try {
            const response = await fetch('/api/ai/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenant_id: post.tenant_id,
                    content_item_id: post.id,
                    prompt: post.image_prompt,
                    aspect_ratio: '1:1',
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao gerar imagem');
            }

            const result = await response.json();

            toast.success('Imagem gerada com sucesso!', {
                description: `Custo: $${result.cost_usd.toFixed(4)}`,
            });

            mutate();
        } catch (error: any) {
            toast.error('Erro ao gerar imagem', {
                description: error.message,
            });
        } finally {
            setGenerating(false);
        }
    };

    const handleApprove = async () => {
        setSaving(true);

        try {
            const { error } = await supabase
                .from('content_items')
                .update({ status: 'approved' })
                .eq('id', postId);

            if (error) throw error;

            toast.success('Post aprovado!');
            mutate();
        } catch (error: any) {
            toast.error('Erro ao aprovar', { description: error.message });
        } finally {
            setSaving(false);
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copiado!`);
    };

    const handlePublish = async (platform: string) => {
        if (!post) return;

        setPublishing(platform);

        try {
            const response = await fetch('/api/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content_item_id: post.id,
                    platform,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao publicar');
            }

            const result = await response.json();

            toast.success(`Publicado no ${platform}!`, {
                description: `Link: ${result.external_post_url}`,
            });

            await mutate();
        } catch (error: any) {
            toast.error('Erro ao publicar', {
                description: error.message,
            });
        } finally {
            setPublishing(null);
        }
    };

    if (!post) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href={`/backoffice/conteudos/${calendarId}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-imi-900 font-display">
                            {post.title}
                        </h1>
                        <p className="text-sm text-imi-500 mt-1">{post.topic}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setSaving(true)}
                        disabled={saving}
                    >
                        <Save size={16} className="mr-2" />
                        Salvar
                    </Button>
                    {post.status === 'approved' && (
                        <Button
                            className="bg-orange-600 hover:bg-orange-700"
                            onClick={() => setShowScheduleModal(true)}
                        >
                            <Calendar size={16} className="mr-2" />
                            Agendar
                        </Button>
                    )}
                    <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleApprove}
                        disabled={saving || post.status === 'approved'}
                    >
                        <CheckCircle2 size={16} className="mr-2" />
                        {post.status === 'approved' ? 'Aprovado' : 'Aprovar'}
                    </Button>
                    {post.status === 'approved' && (
                        <Button
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handlePublish('instagram')}
                            disabled={publishing !== null}
                        >
                            {publishing === 'instagram' ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={16} />
                                    Publicando...
                                </>
                            ) : (
                                <>
                                    <Send size={16} className="mr-2" />
                                    Publicar Agora (Instagram)
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preview & Image */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Image */}
                    <div className="bg-white rounded-2xl p-4 shadow-soft border border-imi-100">
                        <div className="aspect-square bg-imi-50 rounded-xl overflow-hidden mb-3">
                            {post.image_url ? (
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="text-imi-300" size={64} />
                                </div>
                            )}
                        </div>

                        {!post.image_url && post.image_prompt && (
                            <Button
                                className="w-full bg-purple-600 hover:bg-purple-700"
                                onClick={handleGenerateImage}
                                disabled={generating}
                            >
                                {generating ? (
                                    <>
                                        <Loader2 className="mr-2 animate-spin" size={16} />
                                        Gerando...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2" size={16} />
                                        Gerar Imagem com IA
                                    </>
                                )}
                            </Button>
                        )}

                        {post.image_url && (
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Download size={14} className="mr-2" />
                                    Baixar
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={handleGenerateImage}
                                    disabled={generating}
                                >
                                    <Sparkles size={14} className="mr-2" />
                                    Regerar
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Prompt da Imagem */}
                    {post.image_prompt && (
                        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
                                Prompt da Imagem
                            </div>
                            <p className="text-sm text-imi-700">{post.image_prompt}</p>
                        </div>
                    )}
                </div>

                {/* Content & Variants */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Copy Base */}
                    <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-imi-900">Copy Principal</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(post.base_copy || '', 'Copy')}
                            >
                                <Copy size={14} className="mr-2" />
                                Copiar
                            </Button>
                        </div>
                        <textarea
                            className="w-full rounded-xl border-imi-100 focus:ring-accent-500 min-h-[200px]"
                            value={post.base_copy || ''}
                            onChange={(e) => {
                                // TODO: Implementar atualização local
                            }}
                        />
                    </div>

                    {/* CTA */}
                    <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-imi-900">Call to Action</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(post.base_cta || '', 'CTA')}
                            >
                                <Copy size={14} className="mr-2" />
                                Copiar
                            </Button>
                        </div>
                        <input
                            type="text"
                            className="w-full rounded-xl border-imi-100 focus:ring-accent-500"
                            value={post.base_cta || ''}
                            onChange={(e) => {
                                // TODO: Implementar atualização local
                            }}
                        />
                    </div>

                    {/* Hashtags */}
                    {post.hashtags && post.hashtags.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-imi-900">Hashtags</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        copyToClipboard(post.hashtags?.join(' ') || '', 'Hashtags')
                                    }
                                >
                                    <Copy size={14} className="mr-2" />
                                    Copiar
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.hashtags.map((tag: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Variantes por Canal */}
                    {post.content_variants && post.content_variants.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-imi-900">Adaptações por Canal</h3>
                            {post.content_variants.map((variant: any) => {
                                const PlatformIcon = platformIcons[variant.platform] || Send;

                                return (
                                    <motion.div
                                        key={variant.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-2xl p-5 shadow-soft border border-imi-100"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                                                <PlatformIcon size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-imi-900">
                                                    {platformLabels[variant.platform]}
                                                </div>
                                                <div className="text-xs text-imi-500">
                                                    {variant.character_count || 0} caracteres
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        variant.adapted_copy || '',
                                                        platformLabels[variant.platform]
                                                    )
                                                }
                                            >
                                                <Copy size={14} className="mr-2" />
                                                Copiar
                                            </Button>
                                        </div>
                                        <div className="bg-imi-50 rounded-xl p-4 text-sm text-imi-700 whitespace-pre-wrap">
                                            {variant.adapted_copy}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <ScheduleModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                contentItemId={postId}
                onScheduled={() => mutate()}
            />
        </div>
    );
}
