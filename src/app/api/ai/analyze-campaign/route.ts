import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { analyzeCampaignWithClaude } from '@/lib/ai/ads-analyzer';

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        // Verifica autenticação
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { tenant_id, campaign_id, start_date, end_date } = body;

        // Verifica se user tem acesso ao tenant
        const { data: tenantUser } = await supabase
            .from('tenant_users')
            .select('role')
            .eq('tenant_id', tenant_id)
            .eq('user_id', user.id)
            .single();

        if (!tenantUser) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Busca campanha
        const { data: campaign, error: campaignError } = await supabase
            .from('ads_campaigns')
            .select('*')
            .eq('id', campaign_id)
            .eq('tenant_id', tenant_id)
            .single();

        if (campaignError || !campaign) {
            return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
        }

        // Busca métricas do período
        const { data: metrics, error: metricsError } = await supabase
            .from('ads_metrics')
            .select('*')
            .eq('campaign_id', campaign_id)
            .gte('date', start_date)
            .lte('date', end_date)
            .order('date', { ascending: true });

        if (metricsError) {
            throw new Error(`Failed to fetch metrics: ${metricsError.message}`);
        }

        if (!metrics || metrics.length === 0) {
            return NextResponse.json(
                { error: 'No metrics found for this period' },
                { status: 404 }
            );
        }

        // Analisa com Claude
        const result = await analyzeCampaignWithClaude({
            tenant_id,
            campaign,
            metrics,
            requested_by: user.id,
        });

        return NextResponse.json({
            campaign_id,
            insights: result.insights,
            ai_analysis: result.ai_analysis,
            recommendations: result.recommendations,
            ai_request_id: result.ai_request_id,
            cost_usd: result.cost_usd,
            metrics_analyzed: metrics.length,
        });
    } catch (error: any) {
        console.error('Error in /api/ai/analyze-campaign:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
