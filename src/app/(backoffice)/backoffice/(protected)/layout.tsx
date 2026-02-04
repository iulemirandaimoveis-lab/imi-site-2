import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/backoffice/Sidebar';
import { Toaster } from 'sonner';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/backoffice');
    }

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-8 overflow-y-auto h-screen custom-scrollbar relative">
                <div className="mx-auto max-w-7xl animate-fade-in">
                    {children}
                </div>
            </main>
            <Toaster position="top-right" richColors theme="light" closeButton />
        </div>
    );
}
