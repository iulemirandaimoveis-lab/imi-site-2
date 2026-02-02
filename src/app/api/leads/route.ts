import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

// GET - Listar todos os leads
export async function GET() {
    try {
        const clients = await prisma.client.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ clients })
    } catch (error) {
        console.error('Erro ao buscar leads:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar leads' },
            { status: 500 }
        )
    }
}

// POST - Criar novo lead
export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, origin, notes } = await request.json()

        // Validação
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Nome, email e telefone são obrigatórios' },
                { status: 400 }
            )
        }

        const client = await prisma.client.create({
            data: {
                name,
                email,
                phone,
                origin,
                notes,
            },
        })

        return NextResponse.json({ client }, { status: 201 })
    } catch (error: any) {
        console.error('Erro ao criar lead:', error)

        // Verificar se é erro de email duplicado
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Este email já está cadastrado' },
                { status: 409 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao criar lead' },
            { status: 500 }
        )
    }
}
