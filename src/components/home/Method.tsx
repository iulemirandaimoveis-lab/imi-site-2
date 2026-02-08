'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

interface MethodProps {
    dict: {
        method_pre: string
        method_title: string
        method_cta: string
    }
}

export default function Method({ dict }: MethodProps) {
    return (
        <section className="section-padding bg-imi-900 text-white text-center relative overflow-hidden">
            <div className="container-custom max-w-3xl relative z-10">
                <div className="text-accent-500/20 text-[120px] leading-none font-display absolute -top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none" aria-hidden="true">
                    &quot;
                </div>
                <p className="text-xs tracking-widest uppercase text-imi-300 mb-6 font-semibold">{dict.method_pre}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight mb-8 relative z-10">
                    {dict.method_title}
                </h2>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white">
                    <Link href="/sobre">{dict.method_cta}</Link>
                </Button>
            </div>
        </section>
    )
}
