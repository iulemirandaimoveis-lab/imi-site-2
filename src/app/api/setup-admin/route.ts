import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Forçar runtime Node.js para garantir acesso ao bcrypt e Prisma
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 🚨 FORÇAR VARIÁVEL DE AMBIENTE HARDCODED 🚨
        process.env.DATABASE_URL = "postgresql://postgres.zocffccwjjyelwrgunhu:eusouumlobo@aws-0-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true";

        console.log('🔄 Iniciando configuração de admin...')

        const email = 'iule@imi.com'
        const password = 'teste123'

        // Gerar hash usando a mesma lib que o login usa
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log('🔑 Hash gerado com sucesso')

        // Tenta criar ou atualizar o usuário
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                passwordHash: hashedPassword,
                role: 'ADMIN',
                updatedAt: new Date()
            },
            create: {
                email,
                name: 'Iule Miranda',
                passwordHash: hashedPassword,
                role: 'ADMIN'
            }
        })

        console.log('✅ Usuário configurado:', user.id)

        return NextResponse.json({
            success: true,
            message: 'Usuário Admin configurado com sucesso',
            details: {
                email: user.email,
                id: user.id,
                role: user.role,
                updatedAt: user.updatedAt
            }
        })
    } catch (error: any) {
        console.error('❌ Erro no setup:', error)

        return NextResponse.json({
            success: false,
            error: 'Falha ao configurar admin',
            debug: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
