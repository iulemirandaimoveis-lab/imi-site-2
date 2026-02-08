
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateOrganizationSchema } from '@/lib/seo'
import { getDictionary } from '@/lib/dictionaries'

// Fonts are likely loaded in Root Layout, but if not, keep them here?
// Root Layout (src/app/layout.tsx) probably has them. 
// If I redeclare them here, it might duplicate.

export const metadata: Metadata = {
    title: 'IMI – Inteligência Imobiliária',
    description: 'Avaliações imobiliárias técnicas, consultoria estratégica e corretagem com curadoria.',
    // ... basic metadata
}

export default async function WebsiteLayout({
    children,
    params: { lang }
}: {
    children: React.ReactNode
    params: { lang: 'pt' | 'en' | 'ja' | 'ar' | 'es' }
}) {
    const isRTL = lang === 'ar';
    const organizationSchema = generateOrganizationSchema()
    const dict = await getDictionary(lang)

    return (
        <div className="flex flex-col min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Header lang={lang} dict={dict.Header} />
            <main className="flex-grow pt-16 lg:pt-20">{children}</main>
            <Footer lang={lang} dict={dict.Header} />
        </div>
    )
}
