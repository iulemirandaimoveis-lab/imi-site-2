import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Ensure correct types for Decimal/Int fields if they come as strings
        // Zod on client handles parsing, but good to be safe.
        // However, Prisma client expects specific types.

        const property = await prisma.property.create({
            data: {
                ...data,
            }
        });

        return NextResponse.json({ success: true, data: property });
    } catch (error) {
        console.error('Error in API /properties:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
