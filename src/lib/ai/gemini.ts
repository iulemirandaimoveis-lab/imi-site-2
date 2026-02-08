import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/lib/supabase/server';
import { AIProvider } from '@/types/commercial-system';

// Configuração do cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export interface GeminiImageRequest {
    tenant_id: string;
    prompt: string;
    aspect_ratio?: '1:1' | '4:5' | '9:16' | '16:9';
    style?: string;
    request_type?: string;
    related_entity_id?: string;
    requested_by?: string;
}

export interface GeminiImageResponse {
    image_url: string;
    image_data: string; // base64
    ai_request_id: string;
    cost_usd: number;
}

/**
 * Gera imagem usando Gemini (ou fallback para outras opções)
 * NOTA: Gemini atualmente tem geração de imagens via Imagen no Vertex AI
 * Esta é uma implementação simplificada
 */
export async function generateImage(params: GeminiImageRequest): Promise<GeminiImageResponse> {
    const startTime = Date.now();
    const supabase = await createClient();

    // Para produção real, usar Vertex AI Imagen API
    // Esta é uma implementação placeholder que usa o modelo de texto
    // para criar um prompt otimizado que pode ser usado com DALL-E ou Midjourney

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let status: 'success' | 'error' | 'timeout' = 'success';
    let error_message: string | null = null;
    let optimized_prompt = params.prompt;

    try {
        // Otimiza o prompt para geração de imagem
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `Você é um especialista em criar prompts para geração de imagens com IA.

Prompt original: "${params.prompt}"

Aspect ratio desejado: ${params.aspect_ratio || '1:1'}
Estilo: ${params.style || 'professional, clean, modern'}

Otimize este prompt para gerar uma imagem de alta qualidade. O prompt deve ser:
- Em inglês
- Detalhado e específico
- Incluir elementos de composição, iluminação, estilo visual
- Adequado para aspect ratio ${params.aspect_ratio || '1:1'}
- Profissional e adequado para redes sociais

Retorne APENAS o prompt otimizado, sem explicações.`,
                        },
                    ],
                },
            ],
        });

        optimized_prompt = result.response.text().trim();
    } catch (error: any) {
        console.warn('Failed to optimize prompt with Gemini:', error.message);
        // Continua com prompt original em caso de erro
    }

    const endTime = Date.now();
    const latency_ms = endTime - startTime;

    // Custo estimado para geração de imagem (baseado em Vertex AI Imagen)
    // ~$0.020 por imagem
    const cost_usd = 0.02;

    // PLACEHOLDER: Em produção real, aqui chamaríamos Vertex AI Imagen
    // Por enquanto, retornamos um placeholder com o prompt otimizado
    const placeholder_image = await generatePlaceholderImage(
        optimized_prompt,
        params.aspect_ratio || '1:1'
    );

    // Salva log no banco
    const { data: aiRequest, error: dbError } = await supabase
        .from('ai_requests')
        .insert({
            tenant_id: params.tenant_id,
            provider: 'google' as AIProvider,
            model: 'imagen-3',
            prompt: params.prompt,
            system_prompt: `Optimized prompt: ${optimized_prompt}`,
            response: placeholder_image.url,
            raw_response: { optimized_prompt, aspect_ratio: params.aspect_ratio },
            cost_usd,
            latency_ms,
            status,
            error_message,
            request_type: params.request_type || 'generate_image',
            related_entity_type: 'content_item',
            related_entity_id: params.related_entity_id,
            requested_by: params.requested_by,
        })
        .select('id')
        .single();

    if (dbError) {
        console.error('Failed to log AI request:', dbError);
    }

    return {
        image_url: placeholder_image.url,
        image_data: placeholder_image.data,
        ai_request_id: aiRequest?.id || '',
        cost_usd,
    };
}

/**
 * Upload de imagem gerada para Supabase Storage
 */
export async function uploadGeneratedImage(
    tenant_id: string,
    content_item_id: string,
    image_data: string,
    format: 'png' | 'jpg' = 'jpg'
): Promise<string> {
    const supabase = await createClient();

    // Convert base64 to buffer
    const base64Data = image_data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `${tenant_id}/content/${content_item_id}_${Date.now()}.${format}`;

    const { data, error } = await supabase.storage
        .from('media')
        .upload(filename, buffer, {
            contentType: `image/${format}`,
            upsert: false,
        });

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(data.path);

    return publicUrlData.publicUrl;
}

/**
 * PLACEHOLDER: Gera imagem placeholder
 * Em produção, substituir por chamada real ao Vertex AI Imagen
 */
async function generatePlaceholderImage(
    prompt: string,
    aspect_ratio: string
): Promise<{ url: string; data: string }> {
    // Dimensões baseadas no aspect ratio
    const dimensions: Record<string, { width: number; height: number }> = {
        '1:1': { width: 1080, height: 1080 },
        '4:5': { width: 1080, height: 1350 },
        '9:16': { width: 1080, height: 1920 },
        '16:9': { width: 1920, height: 1080 },
    };

    const { width, height } = dimensions[aspect_ratio] || dimensions['1:1'];

    // Usa serviço placeholder (em produção, usar Vertex AI Imagen)
    const placeholderUrl = `https://placehold.co/${width}x${height}/1a202c/9a7147?text=AI+Generated+Image&font=montserrat`;

    // Simula base64 (em produção, retornar imagem real)
    const fakeBase64 = `data:image/jpeg;base64,/9j/4AAQSkZJRg==`;

    return {
        url: placeholderUrl,
        data: fakeBase64,
    };
}

/**
 * FUNÇÃO PARA INTEGRAÇÃO REAL COM VERTEX AI (comentada para referência)
 * Uncomment e configure quando tiver credenciais do Google Cloud
 */
/*
import { ImageGenerationModel } from '@google-cloud/vertexai';

export async function generateImageVertexAI(params: GeminiImageRequest): Promise<GeminiImageResponse> {
    const vertex_ai = new VertexAI({
        project: process.env.GOOGLE_CLOUD_PROJECT_ID!,
        location: 'us-central1',
    });

    const model = vertex_ai.preview.getGenerativeModel({
        model: 'imagegeneration@006',
    });

    const result = await model.generateImages({
        prompt: params.prompt,
        numberOfImages: 1,
        aspectRatio: params.aspect_ratio || '1:1',
        mode: 'high-quality',
    });

    const image = result.images[0];
    
    return {
        image_url: image.url,
        image_data: image.base64,
        ai_request_id: '...',
        cost_usd: 0.02,
    };
}
*/

export { optimizeImagePrompt };

/**
 * Helper: Otimiza prompt de imagem usando Gemini
 */
async function optimizeImagePrompt(original_prompt: string, context?: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent({
        contents: [
            {
                role: 'user',
                parts: [
                    {
                        text: `Otimize este prompt para geração de imagem com IA:

"${original_prompt}"

${context ? `Contexto adicional: ${context}` : ''}

Retorne um prompt em inglês, detalhado, específico, profissional.
Inclua: composição, iluminação, estilo, cores, atmosfera.
APENAS o prompt otimizado, sem explicações.`,
                    },
                ],
            },
        ],
    });

    return result.response.text().trim();
}
