import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const supabase = await createClient()

        // Validate required fields
        const requiredFields = ['name', 'phone', 'appraisalType']
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: `Campo obrigatório ausente: ${field}` },
                    { status: 400 }
                )
            }
        }

        // Store in Supabase 'appraisal_requests' table
        const { error } = await supabase.from('appraisal_requests').insert({
            name: data.name,
            email: data.email,
            phone: data.phone,
            appraisal_type: data.appraisalType,
            property_type: data.propertyType,
            city: data.city,
            address: data.address,
            timeline: data.timeline,
            additional_info: data.additionalInfo || '',
            status: 'pending'
        })

        if (error) {
            console.error('Supabase insert error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(
            { success: true, message: 'Solicitação recebida com sucesso' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error processing appraisal request:', error)
        return NextResponse.json(
            { error: 'Erro ao processar solicitação' },
            { status: 500 }
        )
    }
}
