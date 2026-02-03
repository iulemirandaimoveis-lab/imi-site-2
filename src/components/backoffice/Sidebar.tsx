'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    HomeIcon,
    UsersIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/backoffice/dashboard', icon: HomeIcon },
    { name: 'Leads', href: '/backoffice/leads', icon: UsersIcon },
    { name: 'Imóveis', href: '/backoffice/properties', icon: BuildingOfficeIcon },
    { name: 'Relatórios', href: '/backoffice/reports', icon: ChartBarIcon },
    { name: 'Configurações', href: '/backoffice/settings', icon: Cog6ToothIcon },
]

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

export default function BackofficeSidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    const handleLogout = () => {
        window.location.href = '/backoffice'
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-[100] w-[85vw] max-w-xs bg-neutral-900/95 backdrop-blur-xl border-r border-neutral-800 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
                h-[100dvh] lg:h-screen lg:w-64 lg:translate-x-0 lg:static lg:pointer-events-auto
                ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full pointer-events-none'}
            `}>
                {/* Logo & Header */}
                <div className="flex h-20 items-center justify-between px-6 border-b border-neutral-800/50">
                    <div>
                        <h1 className="text-2xl font-display font-bold text-white tracking-tight">IMI</h1>
                        <p className="text-[10px] text-neutral-400 tracking-widest uppercase mt-0.5">Backoffice</p>
                    </div>
                    {/* Close button - Mobile only */}
                    <button
                        onClick={onClose}
                        className="lg:hidden text-neutral-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => onClose()} // Close on navigation (mobile)
                                className={`
                                    group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                                    ${isActive
                                        ? 'bg-primary-700 text-white shadow-lg shadow-primary-900/20'
                                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                                    }
                                `}
                            >
                                <item.icon
                                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'
                                        }`}
                                />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="border-t border-neutral-800/50 p-6 bg-neutral-900/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center text-white font-semibold ring-2 ring-white/10">
                            IM
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Iule Miranda</p>
                            <p className="text-xs text-neutral-400">Administrador</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 border border-neutral-800 hover:border-neutral-700"
                    >
                        <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                        Sair
                    </button>
                </div>
            </div>
        </>
    )
}
