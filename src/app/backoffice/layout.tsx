'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/backoffice/Sidebar';
import Header from '@/components/backoffice/Header';
import { Toaster } from 'sonner';

export default function BackofficeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/backoffice';

    if (isLoginPage) {
        return (
            <div className="min-h-screen bg-imi-50 antialiased">
                {children}
                <Toaster position="top-right" richColors theme="light" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-imi-50 antialiased">
            <Sidebar />
            <div className="lg:pl-72 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
            <Toaster position="top-right" richColors theme="light" />
        </div>
    );
}
