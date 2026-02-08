import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const supabase = await createClient()

        // Validate required fields
        const requiredFields = ['name', 'phone', 'consultationType']
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: `Campo obrigatório ausente: ${field}` },
                    { status: 400 }
                )
            }
        }

        // Store in Supabase 'consultations' table
        const { error } = await supabase.from('consultations').insert({
            name: data.name,
            email: data.email,
            phone: data.phone,
            consultation_type: data.consultationType,
            city_interest: data.cityInterest || data.city || '',
            investment_profile: data.investmentProfile,
            budget_range: data.budgetRange || '',
            message: data.message || data.context || '',
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
        console.error('Error processing consultation request:', error)
        return NextResponse.json(
            { error: 'Erro ao processar solicitação' },
            { status: 500 }
        )
    }
}
