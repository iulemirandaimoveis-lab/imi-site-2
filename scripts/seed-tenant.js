const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); // Precisa service role para criar tenant se RLS tiver bloqueando

async function seed() {
    console.log('Verificando Tenants...');

    // Tenta encontrar o tenant IMI
    const { data: existing, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('slug', 'imi-inteligencia-imobiliaria')
        .maybeSingle();

    if (existing) {
        console.log('✅ Tenant IMI já existe:', existing.id);
        return existing.id;
    }

    console.log('⚠️ Tenant IMI não encontrado. Criando...');

    // Cria playbook padrão primeiro (se não existir)
    const { data: playbook } = await supabase
        .from('niche_playbooks')
        .upsert({
            slug: 'real_estate_luxury',
            name: 'Mercado de Luxo',
            niche: 'real_estate',
            default_language: { tone: 'sophisticated' }
        }, { onConflict: 'slug' })
        .select()
        .single();

    if (!playbook) {
        console.error('❌ Falha ao criar playbook base.');
        return;
    }

    // Cria o tenant
    const { data: tenant, error: insertError } = await supabase
        .from('tenants')
        .insert({
            slug: 'imi-inteligencia-imobiliaria',
            name: 'IMI - Inteligência Imobiliária',
            niche: 'real_estate',
            playbook_id: playbook.id,
            brand_colors: { primary: '#1a202c', secondary: '#9a7147' },
            is_active: true
        })
        .select()
        .single();

    if (insertError) {
        console.error('❌ Erro ao criar tenant:', insertError);
    } else {
        console.log('✅ Tenant IMI criado com sucesso:', tenant.id);
    }
}

seed();
