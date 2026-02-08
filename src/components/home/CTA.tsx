'use client'

import Button from '@/components/ui/Button'

interface CTAProps {
    dict: {
        final_cta_title: string
        final_cta_desc: string
        final_cta_btn: string
    }
}

export default function CTA({ dict }: CTAProps) {
    return (
        <section className="section-padding bg-white border-t border-imi-100">
            <div className="container-custom text-center">
                <h2 className="text-3xl font-display font-bold text-imi-900 mb-4">
                    {dict.final_cta_title}
                </h2>
                <p className="text-imi-500 mb-8 max-w-xl mx-auto">
                    {dict.final_cta_desc}
                </p>
                <Button asChild size="lg" className="h-14 px-10 text-lg">
                    <a href="https://wa.me/5581997230455" target="_blank" rel="noopener noreferrer">{dict.final_cta_btn}</a>
                </Button>
            </div>
        </section>
    )
}
