'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/backoffice/Sidebar';
import { Toaster } from 'sonner';

export default function BackofficeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/backoffice';

    // Login page: render sem sidebar
    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-offwhite antialiased">
                {children}
                <Toaster position="top-right" richColors theme="light" />
            </div>
        );
    }

    // Páginas internas: render com sidebar
    return (
        <div className="min-h-screen bg-offwhite antialiased">
            <Sidebar />
            <main className="lg:pl-72">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
            <Toaster position="top-right" richColors theme="light" />
        </div>
    );
}
