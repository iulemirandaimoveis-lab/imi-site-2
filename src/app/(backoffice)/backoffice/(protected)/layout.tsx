import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import BackofficeShell from '@/components/backoffice/Shell'

export const dynamic = 'force-dynamic'

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        redirect('/backoffice')
    }

    return (
        <BackofficeShell>
            {children}
        </BackofficeShell>
    )
}
