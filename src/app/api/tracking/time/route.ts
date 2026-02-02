import { NextRequest, NextResponse } from 'next/server'
import { updateAccessTime } from '@/services/tracking.service'

export const runtime = 'nodejs';

/**
 * POST /api/tracking/time
 * Atualiza tempo de permanência em um acesso
 * 
 * Body:
 * {
 *   "logId": "uuid",
 *   "totalTimeSeconds": 120,
 *   "galleryTimeSeconds": 30,
 *   "descriptionTimeSeconds": 45,
 *   "priceTimeSeconds": 20,
 *   "ctaTimeSeconds": 10,
 *   "scrollDepth": 85
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { logId, ...timeData } = body

        if (!logId) {
            return NextResponse.json(
                { success: false, error: 'logId é obrigatório' },
                { status: 400 }
            )
        }

        const log = await updateAccessTime(logId, timeData)

        return NextResponse.json({
            success: true,
            data: log
        })
    } catch (error: any) {
        console.error('Error updating access time:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Erro ao atualizar tempo' },
            { status: 500 }
        )
    }
}
