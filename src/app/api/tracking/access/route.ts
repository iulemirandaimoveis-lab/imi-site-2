import { NextRequest, NextResponse } from 'next/server'
import { logPropertyAccess } from '@/services/tracking.service'
import { UAParser } from 'ua-parser-js'

export const runtime = 'nodejs';

/**
 * POST /api/tracking/access
 * Registra um acesso ao imóvel via link exclusivo
 * 
 * Body:
 * {
 *   "token": "abc123xyz",
 *   "ipAddress": "192.168.1.1" (opcional)
 * }
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { token } = body

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Token é obrigatório' },
                { status: 400 }
            )
        }

        // Detecta dispositivo e navegador
        const userAgent = request.headers.get('user-agent') || ''
        const parser = new UAParser(userAgent)
        const result = parser.getResult()

        // Pega IP do cliente
        const ipAddress =
            request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Registra o acesso
        const log = await logPropertyAccess({
            linkToken: token,
            device: result.device.type || 'desktop',
            browser: result.browser.name,
            os: result.os.name,
            ipAddress
        })

        return NextResponse.json({
            success: true,
            data: {
                logId: log.id,
                message: 'Acesso registrado com sucesso'
            }
        })
    } catch (error: any) {
        console.error('Error logging access:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Erro ao registrar acesso' },
            { status: 500 }
        )
    }
}
