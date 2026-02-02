import { NextRequest, NextResponse } from 'next/server'
import { getPropertyStats, getTopEngagedClients } from '@/services/tracking.service'

export const runtime = 'nodejs';

/**
 * GET /api/tracking/stats/[propertyId]
 * Busca estatísticas detalhadas de um imóvel
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const [stats, topClients] = await Promise.all([
            getPropertyStats(params.propertyId),
            getTopEngagedClients(params.propertyId, 10)
        ])

        return NextResponse.json({
            success: true,
            data: {
                stats,
                topClients
            }
        })
    } catch (error: any) {
        console.error('Error fetching property stats:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Erro ao buscar estatísticas' },
            { status: 500 }
        )
    }
}
