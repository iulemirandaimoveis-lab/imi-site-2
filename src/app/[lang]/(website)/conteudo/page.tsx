
import { Metadata } from 'next';
import { getLatestPosts } from '@/lib/website-data';
import BlogPostCard from './BlogPostCard';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';
import { BookOpen, Search } from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: 'Conteúdo & Insights | IMI Inteligência Imobiliária',
    description: 'Análises aprofundadas, guias de investimento e as últimas tendências do mercado imobiliário premium.'
};

export default async function ConteudoPage({ params: { lang } }: { params: { lang: string } }) {
    const posts = await getLatestPosts(); // Busca do Supabase

    return (
        <main className="bg-white min-h-screen">
            {/* Hero */}
            <section className="bg-imi-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-500/5 -skew-x-12 translate-x-1/4" />
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-accent-500" />
                            <span className="text-accent-500 font-bold uppercase tracking-[0.2em] text-xs">Editorial IMI</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            Inteligência <br /><span className="text-accent-500 italic">de Mercado</span>
                        </h1>
                        <p className="text-imi-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Insights exclusivos para investidores qualificados. Análises técnicas, projeções e oportunidades mapeadas por nossa curadoria.
                        </p>
                    </div>
                </div>
            </section>

            {/* Lista de Posts */}
            <section className="py-20 md:py-28 bg-slate-50">
                <div className="container-custom">
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {posts.map((post) => (
                                <BlogPostCard key={post.id} post={post} lang={lang} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Editorial em Construção</h3>
                            <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                                Estamos finalizando nossos primeiros relatórios de mercado. Em breve, análises exclusivas estarão disponíveis aqui.
                            </p>

                            {/* Tags de Preview */}
                            <div className="flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-400 uppercase tracking-wider opacity-60">
                                <span>#Investimento</span>
                                <span>•</span>
                                <span>#Tendências2026</span>
                                <span>•</span>
                                <span>#MercadoInternacional</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
