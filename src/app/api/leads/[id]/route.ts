import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

// GET - Buscar lead específico
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const client = await prisma.client.findUnique({
            where: { id: params.id },
        })

        if (!client) {
            return NextResponse.json(
                { error: 'Lead não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json({ client })
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
        const { name, email, phone, origin, notes } = await request.json()

        const client = await prisma.client.update({
            where: { id: params.id },
            data: {
                name,
                email,
                phone,
                origin,
                notes,
            },
        })

        return NextResponse.json({ client })
    } catch (error: any) {
        console.error('Erro ao atualizar lead:', error)

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Lead não encontrado' },
                { status: 404 }
            )
        }

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Este email já está cadastrado' },
                { status: 409 }
            )
        }

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
        await prisma.client.delete({
            where: { id: params.id },
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Erro ao excluir lead:', error)

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Lead não encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao excluir lead' },
            { status: 500 }
        )
    }
}
