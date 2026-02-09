
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkStorage() {
    console.log('📦 Verificando Buckets de Storage...');

    // Tenta listar buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('❌ Erro ao listar buckets:', error.message);
        return;
    }

    const requiredBuckets = ['developments', 'avatars', 'content'];

    for (const bucketName of requiredBuckets) {
        const exists = buckets.find(b => b.name === bucketName);
        if (exists) {
            console.log(`✅ Bucket '${bucketName}' OK.`);
        } else {
            console.log(`⚠️ Bucket '${bucketName}' não existe. Criando...`);
            const { error: createError } = await supabase.storage.createBucket(bucketName, {
                public: true, // Importante: Imagens públicas
                allowedMimeTypes: ['image/*', 'video/*'],
                fileSizeLimit: 10485760 // 10MB
            });

            if (createError) {
                console.error(`❌ Falha ao criar bucket '${bucketName}':`, createError.message);
            } else {
                console.log(`✅ Bucket '${bucketName}' criado com sucesso!`);
            }
        }
    }
}

checkStorage();
