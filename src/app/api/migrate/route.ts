import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
);

export async function POST(request: Request) {
    try {
        // Verificar se é uma requisição autorizada (em produção, adicionar mais segurança)
        const authHeader = request.headers.get('authorization');
        if (authHeader !== 'Bearer imi-migration-2026') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const results: { step: string; status: string; error?: string }[] = [];

        // 1. Criar tabela developers
        const { error: devError } = await supabaseAdmin.from('developers').select('id').limit(1);
        if (devError?.code === '42P01') { // Tabela não existe
            // Criar via insert de schema - não é possível criar tabela via REST
            results.push({ step: 'Check developers table', status: 'Table does not exist - needs SQL Editor' });
        } else {
            results.push({ step: 'Check developers table', status: 'OK - Table exists' });
        }

        // 2. Criar tabela pages
        const { error: pagesError } = await supabaseAdmin.from('pages').select('id').limit(1);
        if (pagesError?.code === '42P01') {
            results.push({ step: 'Check pages table', status: 'Table does not exist - needs SQL Editor' });
        } else {
            results.push({ step: 'Check pages table', status: 'OK - Table exists' });
        }

        // 3. Criar tabela activity_logs
        const { error: logsError } = await supabaseAdmin.from('activity_logs').select('id').limit(1);
        if (logsError?.code === '42P01') {
            results.push({ step: 'Check activity_logs table', status: 'Table does not exist - needs SQL Editor' });
        } else {
            results.push({ step: 'Check activity_logs table', status: 'OK - Table exists' });
        }

        // 4. Verificar se já existem dados em developers
        const { data: existingDevs } = await supabaseAdmin.from('developers').select('id').limit(1);

        if (!existingDevs || existingDevs.length === 0) {
            // Inserir dados iniciais de construtoras
            const { error: insertError } = await supabaseAdmin.from('developers').insert([
                { slug: 'setai-grupo-gp', name: 'Setai Grupo GP', legal_name: 'Setai Empreendimentos e Participações Ltda', city: 'João Pessoa', state: 'PB', is_active: true, display_order: 1 },
                { slug: 'alliance', name: 'Alliance Incorporadora', legal_name: 'Alliance Desenvolvimento Imobiliário S.A.', city: 'João Pessoa', state: 'PB', is_active: true, display_order: 2 },
                { slug: 'rio-ave', name: 'Rio Ave Brasil', legal_name: 'Rio Ave Investimentos Ltda', city: 'Recife', state: 'PE', is_active: true, display_order: 3 },
                { slug: 'moura-dubeux', name: 'Moura Dubeux', legal_name: 'Moura Dubeux Engenharia S.A.', city: 'Recife', state: 'PE', is_active: true, display_order: 4 },
                { slug: 'cyrela', name: 'Cyrela Brazil Realty', legal_name: 'Cyrela Brazil Realty S.A. Empreendimentos', city: 'São Paulo', state: 'SP', is_active: true, display_order: 5 }
            ]);

            if (insertError) {
                results.push({ step: 'Insert developers seed data', status: 'FAILED', error: insertError.message });
            } else {
                results.push({ step: 'Insert developers seed data', status: 'OK' });
            }
        } else {
            results.push({ step: 'Insert developers seed data', status: 'SKIPPED - Data already exists' });
        }

        // 5. Verificar se já existem dados em pages
        const { data: existingPages } = await supabaseAdmin.from('pages').select('id').limit(1);

        if (!existingPages || existingPages.length === 0) {
            const { error: insertPagesError } = await supabaseAdmin.from('pages').insert([
                { slug: 'sobre', title: 'Sobre a IMI', page_type: 'page', status: 'published', content: '# Sobre a IMI\n\nA IMI – Inteligência Imobiliária é uma empresa especializada em avaliações técnicas, perícias e consultoria estratégica no mercado imobiliário.', excerpt: 'Conheça a história e os valores da IMI' },
                { slug: 'servicos-avaliacoes', title: 'Avaliações Imobiliárias', page_type: 'service', status: 'published', content: '# Avaliações Técnicas\n\nServiços de avaliação conforme NBR 14653 para fins judiciais, bancários e patrimoniais.', excerpt: 'Laudos técnicos com rigor normativo' },
                { slug: 'politica-privacidade', title: 'Política de Privacidade', page_type: 'policy', status: 'published', content: '# Política de Privacidade\n\nEsta política descreve como coletamos e tratamos seus dados pessoais.', excerpt: 'Como tratamos seus dados' },
                { slug: 'termos-uso', title: 'Termos de Uso', page_type: 'policy', status: 'published', content: '# Termos de Uso\n\nAo utilizar nosso site, você concorda com estes termos.', excerpt: 'Condições de uso do site' }
            ]);

            if (insertPagesError) {
                results.push({ step: 'Insert pages seed data', status: 'FAILED', error: insertPagesError.message });
            } else {
                results.push({ step: 'Insert pages seed data', status: 'OK' });
            }
        } else {
            results.push({ step: 'Insert pages seed data', status: 'SKIPPED - Data already exists' });
        }

        // Verificar se há falhas que requerem SQL Editor
        const needsSqlEditor = results.some(r => r.status.includes('needs SQL Editor'));

        return NextResponse.json({
            success: !needsSqlEditor,
            message: needsSqlEditor
                ? 'Algumas tabelas não existem. Execute o SQL manualmente no Supabase Dashboard.'
                : 'Migração concluída com sucesso!',
            results,
            sqlEditorUrl: needsSqlEditor ? 'https://supabase.com/dashboard/project/zocffccwjjyelwrgunhu/sql/new' : null
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
