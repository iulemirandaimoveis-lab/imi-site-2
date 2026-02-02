import { NextRequest, NextResponse } from 'next/server'
import { createTrackingLink } from '@/services/tracking.service'

export const runtime = 'nodejs';

/**
 * POST /api/tracking/link
 * Cria um link exclusivo para um cliente visualizar um imóvel
 * 
 * Body:
 * {
 *   "clientId": "uuid",
 *   "propertyId": "uuid",
 *   "expiresInDays": 30 (opcional)
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { clientId, propertyId, expiresInDays } = body

        if (!clientId || !propertyId) {
            return NextResponse.json(
                { success: false, error: 'clientId e propertyId são obrigatórios' },
                { status: 400 }
            )
        }

        const link = await createTrackingLink({
            clientId,
            propertyId,
            expiresInDays
        })

        return NextResponse.json({
            success: true,
            data: {
                url: link.url,
                token: link.token,
                expiresAt: link.expiresAt
            }
        })
    } catch (error: any) {
        console.error('Error creating tracking link:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Erro ao criar link' },
            { status: 500 }
        )
    }
}
