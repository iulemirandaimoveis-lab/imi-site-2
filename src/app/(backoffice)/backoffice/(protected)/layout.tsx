'use client';

import BackofficeShell from '@/components/backoffice/Shell'

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BackofficeShell>
            {children}
        </BackofficeShell>
    )
}
