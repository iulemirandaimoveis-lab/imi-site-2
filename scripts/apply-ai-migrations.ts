console.log('🚀 Aplicando Migrations do Sistema Comercial IA');
console.log('================================================\n');

console.log('📝 INSTRUÇÕES PARA APLICAR MIGRATIONS MANUALMENTE:\n');

console.log('1️⃣ Acesse o Supabase Dashboard:');
console.log('   https://supabase.com/dashboard/project/zocffccwjjyelwrgunhu/sql/new\n');

console.log('2️⃣ Execute as migrations na ordem:\n');

console.log('   📄 Migration 004: Multi-Tenant Core');
console.log('   Arquivo: supabase/migrations/004_multi_tenant_core.sql');
console.log('   - Cria 4 tabelas: tenants, niche_playbooks, tenant_users, ai_requests');
console.log('   - Insere dados iniciais (playbook + tenant IMI)');
console.log('   - Configura RLS policies\n');

console.log('   📄 Migration 005: Content Management');
console.log('   Arquivo: supabase/migrations/005_content_management.sql');
console.log('   - Cria 3 tabelas: content_calendar, content_items, content_variants');
console.log('   - Configura RLS policies');
console.log('   - Adiciona triggers e validações\n');

console.log('3️⃣ Como aplicar:');
console.log('   a) No SQL Editor, clique em "New Query"');
console.log('   b) Cole todo o conteúdo do arquivo SQL');
console.log('   c) Clique em "Run" (ou Ctrl/Cmd + Enter)');
console.log('   d) Aguarde mensagem de sucesso');
console.log('   e) Repita para o próximo arquivo\n');

console.log('4️⃣ Verificar se deu certo:');
console.log('   Execute este SQL no SQL Editor:\n');
console.log('   SELECT table_name FROM information_schema.tables');
console.log('   WHERE table_schema = \'public\'');
console.log('   AND table_name IN (');
console.log('     \'tenants\', \'niche_playbooks\', \'tenant_users\',');
console.log('     \'ai_requests\', \'content_calendar\',');
console.log('     \'content_items\', \'content_variants\'');
console.log('   );\n');
console.log('   Deve retornar 7 linhas.\n');

console.log('================================================');
console.log('✅ After applying migrations:');
console.log('   1. Restart server: npm run dev');
console.log('   2. Access: http://localhost:3000/backoffice/conteudos');
console.log('   3. Test: Create new calendar\n');
