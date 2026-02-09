'use client';

import { use, useState } from 'react';
import useSWR from 'swr';
import { createClient } from '@/lib/supabase/client';
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Sparkles,
    Plus,
    Image as ImageIcon,
    CheckCircle2,
    Clock,
    AlertCircle,
    Edit3,
    Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

const supabase = createClient();

const statusLabels: Record<string, string> = {
    draft: 'Rascunho',
    ai_generated: 'IA Gerada',
    image_generating: 'Gerando Imagem',
    image_generated: 'Imagem Pronta',
    approved: 'Aprovado',
    scheduled: 'Agendado',
    published: 'Publicado',
};

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    ai_generated: 'bg-blue-100 text-blue-700',
    image_generating: 'bg-purple-100 text-purple-700',
    image_generated: 'bg-green-100 text-green-700',
    approved: 'bg-emerald-100 text-emerald-700',
    scheduled: 'bg-orange-100 text-orange-700',
    published: 'bg-teal-100 text-teal-700',
};

const statusIcons: Record<string, any> = {
    draft: AlertCircle,
    ai_generated: Sparkles,
    image_generating: Clock,
    image_generated: ImageIcon,
    approved: CheckCircle2,
    scheduled: CalendarIcon,
    published: CheckCircle2,
};

export default function CalendarDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [generatingTopic, setGeneratingTopic] = useState<string | null>(null);

    // Busca calendário
    const { data: calendar, isLoading: loadingCalendar } = useSWR(
        id ? ['calendar', id] : null,
        async () => {
            const { data, error } = await supabase
                .from('content_calendar')
                .select('*, tenants(*)')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        }
    );

    // Busca posts do calendário
    const { data: posts, isLoading: loadingPosts, mutate: mutatePosts } = useSWR(
        id ? ['calendar-posts', id] : null,
        async () => {
            const { data, error } = await supabase
                .from('content_items')
                .select('*, content_variants(*)')
                .eq('calendar_id', id)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data;
        }
    );

    const handleGeneratePost = async (suggestion: any) => {
        setGeneratingTopic(suggestion.topic);

        try {
            const response = await fetch('/api/ai/generate-from-suggestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tenant_id: calendar.tenant_id,
                    calendar_id: id,
                    topic: suggestion.topic,
                    content_pillar: suggestion.content_pillar,
                    objective: suggestion.objective,
                    suggested_date: suggestion.suggested_date,
                    platforms: ['instagram_feed', 'facebook', 'linkedin'],
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao gerar post');
            }

            const result = await response.json();

            toast.success('Post gerado com sucesso!', {
                description: `${result.variants?.length || 0} variantes criadas`,
            });

            await mutatePosts();
            router.push(`/backoffice/conteudos/${id}/${result.content_item_id}`);
        } catch (error: any) {
            toast.error('Erro ao gerar post', {
                description: error.message,
            });
        } finally {
            setGeneratingTopic(null);
        }
    };

    const getMonthName = (month: number) => {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[month - 1];
    };

    if (loadingCalendar) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500" />
            </div>
        );
    }

    if (!calendar) {
        return (
            <div className="text-center py-20">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold text-imi-900">Calendário não encontrado</h2>
                <Link href="/backoffice/conteudos" className="text-accent-600 hover:underline mt-4 inline-block">
                    Voltar para Conteúdos
                </Link>
            </div>
        );
    }

    const aiPlan = calendar.ai_plan || {};
    const suggestedPosts = aiPlan.suggested_posts || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/backoffice/conteudos">
                        <Button variant="outline" size="sm">
                            <ArrowLeft size={16} className="mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-imi-900 font-display">
                                {getMonthName(calendar.month)}/{calendar.year}
                            </h1>
                            <span
                                className={cn(
                                    'px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                                    statusColors[calendar.status]
                                )}
                            >
                                {statusLabels[calendar.status]}
                            </span>
                        </div>
                        <p className="text-imi-500">
                            {aiPlan.summary || 'Planejamento mensal de conteúdo'}
                        </p>
                    </div>
                </div>

                <Button className="bg-accent-600 hover:bg-accent-700">
                    <Plus size={20} className="mr-2" />
                    Novo Post
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                        Posts Planejados
                    </div>
                    <div className="text-3xl font-black text-imi-900">
                        {suggestedPosts.length}
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                        Posts Criados
                    </div>
                    <div className="text-3xl font-black text-imi-900">
                        {posts?.length || 0}
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                        Aprovados
                    </div>
                    <div className="text-3xl font-black text-green-600">
                        {posts?.filter((p) => p.status === 'approved').length || 0}
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-imi-50">
                    <div className="text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                        Publicados
                    </div>
                    <div className="text-3xl font-black text-teal-600">
                        {posts?.filter((p) => p.status === 'published').length || 0}
                    </div>
                </div>
            </div>

            {/* Plano IA */}
            {aiPlan.content_pillars && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="text-purple-600" size={20} />
                        <h3 className="font-bold text-imi-900">Plano Estratégico (Claude)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="text-xs font-bold text-imi-600 uppercase tracking-wider mb-2">
                                Pilares de Conteúdo
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {aiPlan.content_pillars.map((pillar: string, i: number) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 bg-white text-imi-900 text-sm font-bold rounded-lg shadow-sm"
                                    >
                                        {pillar}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {aiPlan.weekly_themes && (
                            <div>
                                <div className="text-xs font-bold text-imi-600 uppercase tracking-wider mb-2">
                                    Temas Semanais
                                </div>
                                <ul className="space-y-1">
                                    {Object.entries(aiPlan.weekly_themes).map(([week, theme]: any) => (
                                        <li key={week} className="text-sm text-imi-700">
                                            <span className="font-bold">{week}:</span> {theme}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Grid de Posts Sugeridos */}
            <div>
                <h3 className="text-xl font-bold text-imi-900 mb-4">
                    Posts Sugeridos pela IA ({suggestedPosts.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestedPosts.map((post: any, i: number) => {
                        const isCreated = posts?.some((p) => p.topic === post.topic);
                        const createdPost = posts?.find((p) => p.topic === post.topic);

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    'bg-white rounded-2xl p-5 shadow-soft border transition-all hover:shadow-md',
                                    isCreated
                                        ? 'border-green-200 bg-green-50/30'
                                        : 'border-imi-100 hover:border-accent-300'
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-imi-400 uppercase tracking-wider mb-1">
                                            {post.suggested_date || `Post ${i + 1}`}
                                        </div>
                                        <h4 className="font-bold text-imi-900 line-clamp-2">
                                            {post.topic}
                                        </h4>
                                    </div>
                                    {isCreated && (
                                        <CheckCircle2 className="text-green-600 flex-shrink-0 ml-2" size={20} />
                                    )}
                                </div>

                                {post.content_pillar && (
                                    <div className="mb-3">
                                        <span className="px-2 py-1 bg-imi-100 text-imi-700 text-[10px] font-bold rounded-md">
                                            {post.content_pillar}
                                        </span>
                                    </div>
                                )}

                                {post.objective && (
                                    <p className="text-sm text-imi-600 mb-4 line-clamp-2">
                                        {post.objective}
                                    </p>
                                )}

                                {isCreated && createdPost ? (
                                    <Link href={`/backoffice/conteudos/${calendar.id}/${createdPost.id}`}>
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Edit3 size={14} className="mr-2" />
                                            Editar Post
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="w-full bg-accent-600 hover:bg-accent-700"
                                        onClick={() => handleGeneratePost(post)}
                                        disabled={generatingTopic === post.topic}
                                    >
                                        {generatingTopic === post.topic ? (
                                            <>
                                                <Loader2 className="mr-2 animate-spin" size={14} />
                                                Gerando...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={14} className="mr-2" />
                                                Gerar com IA
                                            </>
                                        )}
                                    </Button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Posts Criados (fora do plano) */}
            {posts && posts.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-imi-900 mb-4">
                        Posts Criados ({posts.length})
                    </h3>
                    <div className="space-y-3">
                        {posts.map((post) => {
                            const StatusIcon = statusIcons[post.status] || AlertCircle;

                            return (
                                <Link
                                    key={post.id}
                                    href={`/backoffice/conteudos/${calendar.id}/${post.id}`}
                                    className="block"
                                >
                                    <div className="bg-white rounded-2xl p-5 shadow-soft border border-imi-100 hover:border-accent-300 transition-all hover:shadow-md">
                                        <div className="flex items-center gap-4">
                                            {post.image_url ? (
                                                <img
                                                    src={post.image_url}
                                                    alt={post.title}
                                                    className="w-20 h-20 rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-xl bg-imi-100 flex items-center justify-center">
                                                    <ImageIcon className="text-imi-400" size={32} />
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-imi-900 truncate">
                                                        {post.title}
                                                    </h4>
                                                    <span
                                                        className={cn(
                                                            'px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider flex items-center gap-1',
                                                            statusColors[post.status]
                                                        )}
                                                    >
                                                        <StatusIcon size={12} />
                                                        {statusLabels[post.status]}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-imi-500 line-clamp-1">
                                                    {post.base_copy?.substring(0, 100)}...
                                                </p>
                                                <div className="text-xs text-imi-400 mt-1">
                                                    {formatDistanceToNow(new Date(post.created_at), {
                                                        addSuffix: true,
                                                        locale: ptBR,
                                                    })}
                                                </div>
                                            </div>

                                            <Button variant="ghost" size="sm">
                                                <Edit3 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
