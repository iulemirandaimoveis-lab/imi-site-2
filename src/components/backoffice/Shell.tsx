'use client'

import { useState } from 'react'
import BackofficeSidebar from '@/components/backoffice/Sidebar'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function BackofficeShell({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-[100dvh] bg-neutral-50 overflow-hidden">
            {/* Global Sidebar (Desktop & Mobile Drawer) */}
            <BackofficeSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between bg-white border-b border-neutral-200 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="-ml-2 p-2 text-neutral-600 hover:bg-neutral-100 rounded-md"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <span className="font-display font-bold text-lg text-primary-900">IMI Backoffice</span>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
