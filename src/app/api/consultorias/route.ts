import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const supabase = await createClient();

        // Cria lead associado
        const { data: lead, error: leadError } = await supabase
            .from('leads')
            .insert({
                name: data.clientName,
                email: data.email || `consultoria_${Date.now()}@placeholder.com`,
                source: 'consultoria',
                status: 'new',
            })
            .select()
            .single();

        if (leadError) {
            throw leadError;
        }

        // Registra a consultoria como interação (se tabela existir)
        // Por ora, apenas retorna sucesso com o lead criado
        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error in API /consultorias:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
