import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const supabase = await createClient();

        // Insere lead diretamente via Supabase
        const { data: lead, error } = await supabase
            .from('leads')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone,
                source: data.source || 'website',
                status: 'new',
                ai_score: 0,
                ai_priority: 'medium',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating lead:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, lead });
    } catch (error) {
        console.error('Error in API /leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
