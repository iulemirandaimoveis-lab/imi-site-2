import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return NextResponse.json({
                success: false,
                error: 'Supabase Admin não configurado. Configure SUPABASE_SERVICE_ROLE_KEY.'
            }, { status: 500 });
        }

        const admins = [
            { email: 'iule@imi.com', name: 'Iule Miranda' },
            { email: 'admin@imi.com.br', name: 'Admin IMI' }
        ]
        const password = 'teste123'

        const summary: Array<{ email: string; status: string }> = []

        for (const admin of admins) {
            const { email, name } = admin;

            const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: { name }
            })

            if (authError) {
                if (authError.message.includes('already registered')) {
                    // Atualiza senha do usuário existente
                    const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
                    const existingUser = listData.users.find((u: { email?: string }) => u.email === email);
                    if (existingUser) {
                        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, { password });
                        summary.push({ email, status: 'Já existe, senha atualizada' });
                    } else {
                        summary.push({ email, status: `Erro: ${authError.message}` });
                    }
                } else {
                    summary.push({ email, status: `Erro: ${authError.message}` });
                }
            } else {
                summary.push({ email, status: 'Criado com sucesso' });
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Configuração concluída',
            results: summary
        })
    } catch (error: unknown) {
        console.error('❌ Erro no setup:', error)
        return NextResponse.json({
            success: false,
            error: 'Falha ao configurar admin',
            debug: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
