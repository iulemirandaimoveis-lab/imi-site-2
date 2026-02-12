'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/components/ui/Icon'

export default function MobileBottomNav() {
    const pathname = usePathname()

    const navItems = [
        { label: 'Home', href: '/backoffice/dashboard', icon: 'dashboard' },
        { label: 'Leads', href: '/backoffice/leads', icon: 'people_alt' },
        { label: '', href: '#', icon: 'add', variant: 'fab' as const },
        { label: 'Imóveis', href: '/backoffice/imoveis', icon: 'domain' },
        { label: 'Relatórios', href: '/backoffice/reports', icon: 'bar_chart' },
    ]

    return (
        <nav className="fixed bottom-0 w-full bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-[80px] shadow-nav">
            {navItems.map((item, index) => {
                const isActive = pathname === item.href
                
                if (item.variant === 'fab') {
                    return (
                        <button
                            key={index}
                            className="relative -top-5 flex flex-col items-center justify-center w-12 h-12 bg-imi-dark-blue dark:bg-primary rounded-full shadow-lg text-white hover:scale-105 transition-transform"
                        >
                            <Icon name={item.icon} size={28} />
                        </button>
                    )
                }

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors ${
                            isActive
                                ? 'text-primary'
                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                        }`}
                    >
                        <Icon 
                            name={item.icon} 
                            filled={isActive}
                        />
                        <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}
