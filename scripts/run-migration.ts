// Script para executar migração no Supabase
// Execute com: npx tsx scripts/run-migration.ts

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zocffccwjjyelwrgunhu.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvY2ZmY2N3amp5ZWx3cmd1bmh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTg3NzU1NywiZXhwIjoyMDg1NDUzNTU3fQ.26AhGWUisQkoC4fFm8IMFrj5NanUhqwLv138hv7_dKo';

async function runMigration() {
    console.log('🚀 Iniciando migração...\n');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        auth: { persistSession: false }
    });

    // Ler arquivo de migração
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/002_backoffice_complete.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    // Dividir em statements individuais (separados por ;)
    const statements = sql
        .split(/;[\s]*\n/)
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📋 ${statements.length} statements encontrados\n`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        const preview = stmt.substring(0, 60).replace(/\n/g, ' ');

        try {
            const { error } = await supabase.rpc('exec_sql', { sql_text: stmt + ';' });

            if (error) {
                // Se a RPC não existir, tentar via REST
                if (error.message.includes('function') || error.code === 'PGRST202') {
                    // Ignorar e tentar próximo approach
                    throw new Error('RPC not available');
                }
                throw error;
            }

            console.log(`✅ [${i + 1}/${statements.length}] ${preview}...`);
            success++;
        } catch (err: any) {
            // Tentar via fetch direto ao endpoint REST
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_SERVICE_KEY,
                        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
                    },
                    body: JSON.stringify({ sql_text: stmt + ';' })
                });

                if (!response.ok) {
                    // Se não tem a função, logamos mas continuamos
                    console.log(`⚠️  [${i + 1}/${statements.length}] ${preview}... (skip - RPC não disponível)`);
                    failed++;
                } else {
                    console.log(`✅ [${i + 1}/${statements.length}] ${preview}...`);
                    success++;
                }
            } catch (fetchErr) {
                console.log(`❌ [${i + 1}/${statements.length}] ${preview}...`);
                console.log(`   Erro: ${err.message}`);
                failed++;
            }
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`📊 Resultado: ${success} sucesso, ${failed} falhas`);
    console.log('='.repeat(50) + '\n');

    if (failed > 0) {
        console.log('⚠️  Algumas queries falharam. Execute manualmente no Supabase Dashboard:');
        console.log('   https://supabase.com/dashboard → SQL Editor → New Query');
        console.log('   Cole o conteúdo de: supabase/migrations/002_backoffice_complete.sql\n');
    }
}

runMigration().catch(console.error);
