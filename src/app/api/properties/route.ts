import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs';

/**
 * GET /api/properties
 * Lista todos os imóveis (com filtros opcionais)
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        const status = searchParams.get('status')
        const isFeatured = searchParams.get('featured') === 'true'
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const bedrooms = searchParams.get('bedrooms')
        const neighborhood = searchParams.get('neighborhood')

        const where: any = {}

        if (status) where.status = status
        if (isFeatured) where.isFeatured = true
        if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) }
        if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) }
        if (bedrooms) where.bedrooms = parseInt(bedrooms)
        if (neighborhood) where.neighborhood = { contains: neighborhood, mode: 'insensitive' }

        const properties = await prisma.property.findMany({
            where,
            include: {
                images: {
                    orderBy: { order: 'asc' }
                },
                _count: {
                    select: {
                        accessLogs: true,
                        clientLinks: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json({
            success: true,
            data: properties,
            count: properties.length
        })
    } catch (error) {
        console.error('Error fetching properties:', error)
        return NextResponse.json(
            { success: false, error: 'Erro ao buscar imóveis' },
            { status: 500 }
        )
    }
}

/**
 * POST /api/properties
 * Cria um novo imóvel
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            title,
            description,
            price,
            area,
            bedrooms,
            bathrooms,
            parkingSpots,
            address,
            neighborhood,
            city,
            state,
            zipCode,
            latitude,
            longitude,
            status,
            isFeatured,
            isExclusive,
            hasAnalysis,
            images
        } = body

        // Gera slug único
        const baseSlug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

        let slug = baseSlug
        let counter = 1

        // Verifica se slug já existe
        while (await prisma.property.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter}`
            counter++
        }

        // Cria o imóvel
        const property = await prisma.property.create({
            data: {
                title,
                slug,
                description,
                price,
                area,
                bedrooms,
                bathrooms,
                parkingSpots,
                address,
                neighborhood,
                city,
                state,
                zipCode,
                latitude,
                longitude,
                status: status || 'AVAILABLE',
                isFeatured: isFeatured || false,
                isExclusive: isExclusive || false,
                hasAnalysis: hasAnalysis || false,
                publishedAt: new Date()
            }
        })

        // Adiciona imagens se fornecidas
        if (images && images.length > 0) {
            await prisma.propertyImage.createMany({
                data: images.map((img: any, index: number) => ({
                    propertyId: property.id,
                    url: img.url,
                    alt: img.alt || title,
                    order: index,
                    isPrimary: index === 0
                }))
            })
        }

        // Busca o imóvel completo com imagens
        const fullProperty = await prisma.property.findUnique({
            where: { id: property.id },
            include: {
                images: {
                    orderBy: { order: 'asc' }
                }
            }
        })

        return NextResponse.json({
            success: true,
            data: fullProperty
        }, { status: 201 })
    } catch (error) {
        console.error('Error creating property:', error)
        return NextResponse.json(
            { success: false, error: 'Erro ao criar imóvel' },
            { status: 500 }
        )
    }
}
