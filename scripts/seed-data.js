
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

// Configuração
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Credenciais do Supabase não encontradas no .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Dados Fictícios
const FAKE_LEADS = [
    {
        name: 'Roberto Almeida',
        email: 'roberto.almeida@email.com',
        phone: '11999887766',
        source: 'Instagram Ads',
        status: 'new',
        ai_score: 85,
        ai_priority: 'high',
        ai_qualification: {
            summary: 'Investidor procurando diversificação. Interesse em imóveis de alto padrão em SP.',
            budget: 'Superior a R$ 2M'
        },
        ai_next_action: 'Agendar visita ao Setai Edition',
        ai_next_action_deadline: new Date(Date.now() + 86400000 * 2).toISOString() // +2 dias
    },
    {
        name: 'Fernanda Costa',
        email: 'fernanda.costa@email.com',
        phone: '81988776655',
        source: 'Google Search',
        status: 'contacted',
        ai_score: 92,
        ai_priority: 'critical',
        ai_qualification: {
            summary: 'Médica buscando apartamento pronto para morar em Boa Viagem. Urgência na mudança.',
            budget: 'Até R$ 1.5M'
        },
        ai_next_action: 'Enviar opções de pronta entrega via WhatsApp',
        ai_next_action_deadline: new Date(Date.now() + 3600000 * 4).toISOString() // +4 horas
    },
    {
        name: 'Carlos & Ana',
        email: 'carlos.ana@email.com',
        source: 'Indicação',
        status: 'qualified',
        ai_score: 65,
        ai_priority: 'medium',
        ai_qualification: {
            summary: 'Casal jovem pesquisando primeiro imóvel. Ainda em fase de aprovação de crédito.',
            budget: 'R$ 500k - 700k'
        },
        ai_next_action: 'Acompanhar aprovação de crédito',
        ai_next_action_deadline: new Date(Date.now() + 86400000 * 7).toISOString() // +7 dias
    },
    {
        name: 'Dr. Paulo Mendes',
        email: 'paulo.mendes@clinica.com',
        phone: '83999998888',
        source: 'Evento Presencial',
        status: 'new',
        ai_score: 45,
        ai_priority: 'low',
        ai_qualification: {
            summary: 'Interesse especulativo em lançamentos futuros. Não tem pressa.',
            budget: 'Indefinido'
        },
        ai_next_action: 'Adicionar à newsletter mensal',
        ai_next_action_deadline: new Date(Date.now() + 86400000 * 15).toISOString() // +15 dias
    },
    {
        name: 'Juliana Paes (Homônima)',
        email: 'ju.paes@email.com',
        source: 'Website',
        status: 'lost',
        ai_score: 20,
        ai_priority: 'low',
        ai_qualification: {
            summary: 'Procurava aluguel de temporada (não atendemos).',
            budget: 'Baixo'
        },
        ai_next_action: 'Arquivar',
        ai_next_action_deadline: null
    }
];

async function seed() {
    console.log('🌱 Iniciando Seed de Dados...');

    // 1. Obter Tenant ID (Cria se não existir, igual ao script anterior)
    let tenantId;
    const { data: tenant, error: tenantError } = await supabase
        .from('tenants')
        .select('id')
        .eq('slug', 'imi-inteligencia-imobiliaria')
        .maybeSingle();

    if (tenant) {
        tenantId = tenant.id;
        console.log('✅ Tenant encontrado:', tenantId);
    } else {
        console.log('⚠️ Tenant IMI não encontrado. Tentando pegar o primeiro disponível...');
        const { data: anyTenant } = await supabase.from('tenants').select('id').limit(1).single();
        if (anyTenant) {
            tenantId = anyTenant.id;
            console.log('✅ Usando Tenant alternativo:', tenantId);
        } else {
            console.error('❌ Nenhum tenant encontrado. Rode o script seed-tenant.js primeiro.');
            return;
        }
    }

    // 2. Inserir Leads
    console.log('Inserting Leads...');
    for (const lead of FAKE_LEADS) {
        // Verifica se já existe para não duplicar
        const { data: existing } = await supabase
            .from('leads')
            .select('id')
            .eq('email', lead.email)
            .maybeSingle();

        if (!existing) {
            const { error } = await supabase.from('leads').insert({
                tenant_id: tenantId,
                ...lead,
                user_id: null, // Sem user associado por enquanto
                custom_fields: {},
                tags: ['seed_data']
            });
            if (error) console.error(`❌ Erro ao criar lead ${lead.name}:`, error.message);
            else console.log(`✅ Lead criado: ${lead.name}`);
        } else {
            console.log(`ℹ️ Lead já existe: ${lead.name}`);
        }
    }

    // 3. Inserir Campanhas de Ads (Fictícias para Dashboard)
    console.log('Inserting Ads Campaigns...');
    const CAMPAIGNS = [
        { name: 'Lançamento Setai - Instagram', platform: 'meta', status: 'active', budget_total: 5000 },
        { name: 'Institucional Google Search', platform: 'google', status: 'active', budget_total: 10000 }
    ];

    for (const camp of CAMPAIGNS) {
        const { data: existing } = await supabase.from('ads_campaigns').select('id').eq('name', camp.name).maybeSingle();
        if (!existing) {
            await supabase.from('ads_campaigns').insert({ tenant_id: tenantId, ...camp });
            console.log(`✅ Campanha criada: ${camp.name}`);
        }
    }

    console.log('🏁 Seed concluído! Verifique o Backoffice.');
}

seed();
