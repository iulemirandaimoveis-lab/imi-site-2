import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/website-data';
import Badge from '@/components/ui/Badge';
import { Calendar, ChevronRight } from 'lucide-react';

export default function BlogPostCard({ post, lang }: { post: BlogPost, lang: string }) {
    const formattedDate = new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
            <Link href={`/${lang}/conteudo/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-white/90 backdrop-blur-sm text-imi-900 font-bold shadow-lg">
                        {post.category}
                    </Badge>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{post.author}</span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                    <Link href={`/${lang}/conteudo/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-slate-600 line-clamp-3 mb-6 flex-grow text-sm leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                        href={`/${lang}/conteudo/${post.slug}`}
                        className="text-accent-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group/btn"
                    >
                        Ler Artigo
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
