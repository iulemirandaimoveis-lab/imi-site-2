'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import { MapPin, Building2, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'

interface Development {
    id: string
    name: string
    slug: string
    description: string | null
    neighborhood: string
    city: string
    state: string
    price_from: number
    units: number
    status: string
    delivery: string | null
    image: string | null
    developer_id: string | null
    developers?: {
        name: string
        logo_url: string | null
    }
}

export default function ImoveisPage() {
    const supabase = createClientComponentClient()
    const [developments, setDevelopments] = useState<Development[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterNeighborhood, setFilterNeighborhood] = useState<string>('all')
    const [filterStatus, setFilterStatus] = useState<string>('all')

    useEffect(() => {
        fetchDevelopments()
    }, [filterNeighborhood, filterStatus])

    async function fetchDevelopments() {
        let query = supabase
            .from('developments')
            .select(`
        *,
        developers (
          name,
          logo_url
        )
      `)
            .order('created_at', { ascending: false })

        if (filterNeighborhood !== 'all') {
            query = query.eq('neighborhood', filterNeighborhood)
        }

        if (filterStatus !== 'all') {
            query = query.eq('status', filterStatus)
        }

        const { data, error } = await query

        if (!error && data) {
            setDevelopments(data)
        }

        setIsLoading(false)
    }

    const neighborhoods = Array.from(new Set(developments.map(d => d.neighborhood)))
    const statuses = Array.from(new Set(developments.map(d => d.status)))

    return (
        <>
            <section className="bg-navy-900 text-white section-padding relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gold-500/5 -skew-x-12 translate-x-1/4" />

                <div className="container-custom relative z-10">
                    <motion.div
                        className="max-w-3xl"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-px bg-gold-500" />
                            <span className="text-gold-500 font-semibold uppercase tracking-[0.2em] text-xs">
                                Portfólio
                            </span>
                        </div>

                        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Empreendimentos Selecionados
                        </h1>

                        <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Imóveis de alto padrão em João Pessoa, criteriosamente selecionados por qualidade construtiva e localização estratégica.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-navy-900 mb-2">
                                Bairro
                            </label>
                            <select
                                value={filterNeighborhood}
                                onChange={(e) => setFilterNeighborhood(e.target.value)}
                                className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white"
                            >\n                <option value="all">Todos os bairros</option>
                                {neighborhoods.map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-navy-900 mb-2">
                                Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full h-11 px-4 rounded-lg border border-slate-200 bg-white"
                            >
                                <option value="all">Todos os status</option>
                                {statuses.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>\n            </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-slate-200 aspect-[4/3] rounded-xl mb-4" />
                                    <div className="h-6 bg-slate-200 rounded mb-2" />
                                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                                </div>
                            ))}
                        </div>\n          ) : developments.length === 0 ? (
                    <div className=\"text-center py-12\">
                    <Building2 className=\"w-16 h-16 text-slate-400 mx-auto mb-4\" />
                    <p className=\"text-slate-600\">Nenhum imóvel encontrado com os filtros selecionados.</p>
            </div>
            ) : (
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {developments.map((dev) => (
                    <motion.div key={dev.id} variants={slideUp}>
                        <Link
                            href={`/imoveis/${dev.slug}`}\n                    className="group block"
                  >
                        <div className="rounded-xl overflow-hidden bg-white border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                {dev.image ? (
                                    <Image
                                        src={dev.image}
                                        alt={dev.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <Building2 className="w-12 h-12 text-slate-400" />
                                    </div>
                                )}
                                \n                        <div className=\"absolute top-3 right-3 flex flex-col gap-2\">
                                {dev.status && (
                                    <span className=\"px-3 py-1 bg-navy-900 text-white text-xs font-semibold rounded-full\">
                                {dev.status}
                            </span>
                          )}
                            {dev.delivery && (
                                <span className=\"px-3 py-1 bg-gold-500 text-navy-900 text-xs font-bold rounded-full\">
                            {dev.delivery}
                        </span>
                          )}
                    </div>
                      </div>

            <div className=\"p-5 sm:p-6\">
            {dev.developers && (
                <p className=\"text-xs text-slate-500 mb-2\">
            {dev.developers.name}
        </p >
                        )
}
\n < h3 className =\"font-display text-lg sm:text-xl font-bold text-navy-900 mb-2 line-clamp-1\">
{ dev.name }
                        </h3 >
\n < p className =\"text-slate-600 text-sm mb-4 flex items-center gap-2\">
    < MapPin className =\"w-4 h-4 flex-shrink-0\" />
        < span className =\"line-clamp-1\">{dev.neighborhood}, {dev.city}</span>
                        </p >

    <div className=\"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4\">
        < div >
        <div className=\"text-sm text-slate-500 mb-1\">A partir de</div>
            < div className =\"font-display text-xl sm:text-2xl font-bold text-navy-900\">
{ new Intl.NumberFormat('pt-BR', { \n                                style: 'currency', \n                                currency: 'BRL', \n                                minimumFractionDigits: 0 \n }).format(dev.price_from) } \n                            </div >
                          </div >
\n < div className =\"text-sm text-slate-600\">
{ dev.units } unidades
                          </div >
                        </div >
                      </div >
                    </div >
                  </Link >
                </motion.div >
              ))}
            </motion.div >
          )}
        </div >
      </section >
    </>
  )
}
