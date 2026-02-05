import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { generateOrganizationSchema } from '@/lib/seo'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'IMI – Inteligência Imobiliária',
    description: 'Avaliações imobiliárias técnicas, consultoria estratégica e corretagem com curadoria. Decisões imobiliárias baseadas em inteligência, método e segurança.',
    keywords: ['avaliação imobiliária', 'consultoria imobiliária', 'CNAI', 'CRECI', 'imóveis', 'investimento imobiliário'],
    authors: [{ name: 'Iule Miranda' }],
    creator: 'IMI – Inteligência Imobiliária',
    publisher: 'IMI – Inteligência Imobiliária',
    metadataBase: new URL('https://imi.com.br'), // Update with actual domain
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://imi.com.br',
        siteName: 'IMI – Inteligência Imobiliária',
        title: 'IMI – Inteligência Imobiliária',
        description: 'Avaliações imobiliárias técnicas, consultoria estratégica e corretagem com curadoria.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'IMI – Inteligência Imobiliária',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'IMI – Inteligência Imobiliária',
        description: 'Avaliações imobiliárias técnicas, consultoria estratégica e corretagem com curadoria.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
            <body className="antialiased bg-offwhite font-sans flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-24 lg:pt-28">{children}</main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    )
}
