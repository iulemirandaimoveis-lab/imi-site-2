'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/backoffice/Sidebar';
import MobileHeader from '@/components/backoffice/MobileHeader';
import MobileBottomNav from '@/components/backoffice/MobileBottomNav';
import { Toaster } from 'sonner';
import Script from 'next/script';

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
        <>
            {/* Material Symbols Outlined Font */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            />
            
            <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {/* Desktop Sidebar */}
                <Sidebar />

                <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
                    {/* Mobile Header */}
                    <MobileHeader />

                    {/* Main Content */}
                    <main className="flex-1 px-4 pt-4 pb-24 overflow-y-auto">
                        {children}
                    </main>

                    {/* Mobile Bottom Navigation */}
                    <MobileBottomNav />
                </div>

                <Toaster position="top-right" richColors theme="light" />
            </div>
        </>
    );
}
