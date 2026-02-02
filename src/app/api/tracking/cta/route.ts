import { NextRequest, NextResponse } from 'next/server'
import { logCtaClick } from '@/services/tracking.service'

export const runtime = 'nodejs';

/**
 * POST /api/tracking/cta
 * Registra clique em CTA (Call to Action)
 * 
 * Body:
 * {
 *   "logId": "uuid",
 *   "type": "cta" | "whatsapp"
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { logId, type } = body

        if (!logId || !type) {
            return NextResponse.json(
                { success: false, error: 'logId e type são obrigatórios' },
                { status: 400 }
            )
        }

        if (type !== 'cta' && type !== 'whatsapp') {
            return NextResponse.json(
                { success: false, error: 'type deve ser "cta" ou "whatsapp"' },
                { status: 400 }
            )
        }

        const log = await logCtaClick(logId, type)

        return NextResponse.json({
            success: true,
            data: log
        })
    } catch (error: any) {
        console.error('Error logging CTA click:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Erro ao registrar clique' },
            { status: 500 }
        )
    }
}
