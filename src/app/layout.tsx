import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

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

import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
    title: 'IMI – Inteligência Imobiliária',
    description: 'Inteligência, método e segurança em decisões imobiliárias.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
            <body className="antialiased">
                {children}
                <SpeedInsights />
            </body>
        </html>
    )
}
