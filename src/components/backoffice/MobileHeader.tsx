'use client'

import { usePathname, useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import Image from 'next/image'

interface MobileHeaderProps {
    title?: string
    showBack?: boolean
    showFilter?: boolean
    showNotifications?: boolean
}

export default function MobileHeader({
    title,
    showBack = true,
    showFilter = false,
    showNotifications = true
}: MobileHeaderProps) {
    const pathname = usePathname()
    const router = useRouter()

    const getTitle = () => {
        if (title) return title
        if (pathname.includes('/imoveis')) return 'Imóveis'
        if (pathname.includes('/leads')) return 'Leads'
        if (pathname.includes('/construtoras')) return 'Construtoras'
        if (pathname.includes('/agenda')) return 'Agenda'
        if (pathname.includes('/conteudo')) return 'Editorial AI'
        if (pathname.includes('/ads')) return 'Ads Performance'
        if (pathname.includes('/reports')) return 'Relatórios'
        if (pathname.includes('/settings')) return 'Configurações'
        if (pathname.includes('/dashboard')) return 'Dashboard'
        return 'IMI'
    }

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 h-16 px-4 flex items-center justify-between shadow-sm lg:hidden">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => router.back()}
                        className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors p-1 -ml-1"
                    >
                        <Icon name="arrow_back" />
                    </button>
                )}

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-imi-dark-blue dark:bg-primary rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-sm">
                        I
                    </div>
                    <h1 className="font-display font-bold text-lg text-text-header-light dark:text-text-header-dark tracking-wide">
                        {getTitle()}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {showFilter && (
                    <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <Icon name="filter_list" />
                    </button>
                )}

                {showNotifications && (
                    <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <Icon name="notifications" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-card-dark"></span>
                    </button>
                )}

                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-bold text-xs">
                        IM
                    </div>
                </div>
            </div>
        </header>
    )
}
