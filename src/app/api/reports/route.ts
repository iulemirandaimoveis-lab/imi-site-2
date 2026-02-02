import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const period = searchParams.get('period') || '30d'

        // Calcular data de início baseado no período
        const now = new Date()
        const startDate = new Date()

        switch (period) {
            case '7d':
                startDate.setDate(now.getDate() - 7)
                break
            case '30d':
                startDate.setDate(now.getDate() - 30)
                break
            case '90d':
                startDate.setDate(now.getDate() - 90)
                break
            case '1y':
                startDate.setFullYear(now.getFullYear() - 1)
                break
        }

        // Buscar estatísticas
        const [
            totalLeads,
            previousLeads,
            totalProperties,
            previousProperties,
            totalViews,
            previousViews,
        ] = await Promise.all([
            // Leads atuais
            prisma.client.count({
                where: { createdAt: { gte: startDate } },
            }),
            // Leads período anterior
            prisma.client.count({
                where: {
                    createdAt: {
                        gte: new Date(startDate.getTime() - (now.getTime() - startDate.getTime())),
                        lt: startDate,
                    },
                },
            }),
            // Imóveis atuais
            prisma.property.count({
                where: { status: 'AVAILABLE' },
            }),
            // Imóveis período anterior
            prisma.property.count({
                where: {
                    status: 'AVAILABLE',
                    createdAt: {
                        lt: startDate,
                    },
                },
            }),
            // Visualizações atuais
            prisma.property.aggregate({
                _sum: { viewCount: true },
                where: { createdAt: { gte: startDate } },
            }),
            // Visualizações período anterior
            prisma.property.aggregate({
                _sum: { viewCount: true },
                where: {
                    createdAt: {
                        gte: new Date(startDate.getTime() - (now.getTime() - startDate.getTime())),
                        lt: startDate,
                    },
                },
            }),
        ])

        // Calcular receita potencial (soma dos preços dos imóveis disponíveis)
        const revenue = await prisma.property.aggregate({
            _sum: { price: true },
            where: { status: 'AVAILABLE' },
        })

        const previousRevenue = await prisma.property.aggregate({
            _sum: { price: true },
            where: {
                status: 'AVAILABLE',
                createdAt: { lt: startDate },
            },
        })

        // Calcular crescimento percentual
        const calculateGrowth = (current: number, previous: number) => {
            if (previous === 0) return current > 0 ? 100 : 0
            return Math.round(((current - previous) / previous) * 100)
        }

        const stats = {
            totalLeads,
            totalProperties,
            totalViews: totalViews._sum.viewCount || 0,
            totalRevenue: Number(revenue._sum.price || 0),
            leadsGrowth: calculateGrowth(totalLeads, previousLeads),
            propertiesGrowth: calculateGrowth(totalProperties, previousProperties),
            viewsGrowth: calculateGrowth(
                totalViews._sum.viewCount || 0,
                previousViews._sum.viewCount || 0
            ),
            revenueGrowth: calculateGrowth(
                Number(revenue._sum.price || 0),
                Number(previousRevenue._sum.price || 0)
            ),
        }

        return NextResponse.json({ stats })
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar relatórios' },
            { status: 500 }
        )
    }
}
