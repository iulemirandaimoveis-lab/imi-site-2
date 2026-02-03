import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import BackofficeShell from '@/components/backoffice/Shell'

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
    title: 'Backoffice | IMI',
    description: 'Sistema de gestão IMI - Inteligência Imobiliária',
    robots: 'noindex, nofollow',
}

export default function BackofficeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
            <body className="bg-neutral-50">
                <BackofficeShell>
                    {children}
                </BackofficeShell>
            </body>
        </html>
    )
}
