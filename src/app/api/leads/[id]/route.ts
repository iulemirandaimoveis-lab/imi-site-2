import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs';

// GET - Buscar lead específico
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();

        const { data: lead, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error || !lead) {
            return NextResponse.json(
                { error: 'Lead não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json({ lead })
    } catch (error) {
        console.error('Erro ao buscar lead:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar lead' },
            { status: 500 }
        )
    }
}

// PUT - Atualizar lead
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const supabase = await createClient();

        const { data: lead, error } = await supabase
            .from('leads')
            .update(body)
            .eq('id', params.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { error: 'Lead não encontrado' },
                    { status: 404 }
                )
            }
            throw error;
        }

        return NextResponse.json({ lead })
    } catch (error: unknown) {
        console.error('Erro ao atualizar lead:', error)
        return NextResponse.json(
            { error: 'Erro ao atualizar lead' },
            { status: 500 }
        )
    }
}

// DELETE - Excluir lead
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', params.id);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true })
    } catch (error: unknown) {
        console.error('Erro ao excluir lead:', error)
        return NextResponse.json(
            { error: 'Erro ao excluir lead' },
            { status: 500 }
        )
    }
}
