// Types for Multi-Tenant Core
export type TenantRole = 'owner' | 'admin' | 'operator' | 'viewer';
export type SubscriptionTier = 'starter' | 'professional' | 'enterprise';
export type AIProvider = 'anthropic' | 'google' | 'openai';

export interface Tenant {
    id: string;
    slug: string;
    name: string;
    niche: string;
    playbook_id: string | null;
    brand_colors: {
        primary: string;
        secondary: string;
        accent: string;
        background?: string;
    };
    brand_fonts: {
        heading: string;
        body: string;
    };
    brand_logo_url: string | null;
    tone_of_voice: string;
    target_audience: string[];
    ai_provider: AIProvider;
    ai_model: string;
    ai_temperature: number;
    ai_max_tokens: number;
    is_active: boolean;
    subscription_tier: SubscriptionTier;
    created_at: string;
    updated_at: string;
}

export interface NichePlaybook {
    id: string;
    slug: string;
    name: string;
    niche: string;
    default_language: {
        greetings?: string[];
        objections_handling?: Record<string, string>;
        CTAs?: string[];
    };
    typical_audiences: string[];
    legal_restrictions: string | null;
    campaign_templates: CampaignTemplate[];
    version: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CampaignTemplate {
    type: string;
    objective: string;
    platforms: string[];
    budget_range: {
        min: number;
        max: number;
    };
    duration_days: number;
    suggested_audiences?: string[];
}

export interface TenantUser {
    id: string;
    tenant_id: string;
    user_id: string;
    role: TenantRole;
    created_at: string;
}

export type AIRequestStatus = 'success' | 'error' | 'timeout';

export interface AIRequest {
    id: string;
    tenant_id: string;
    provider: AIProvider;
    model: string;
    prompt: string;
    system_prompt: string | null;
    temperature: number | null;
    max_tokens: number | null;
    response: string | null;
    raw_response: any;
    tokens_input: number | null;
    tokens_output: number | null;
    tokens_total: number | null;
    cost_usd: number | null;
    latency_ms: number | null;
    status: AIRequestStatus;
    error_message: string | null;
    request_type: string | null;
    related_entity_type: string | null;
    related_entity_id: string | null;
    requested_by: string | null;
    created_at: string;
}

// Types for Content Management
export type ContentCalendarStatus = 'draft' | 'ai_generated' | 'approved' | 'active' | 'archived';
export type ContentItemStatus = 'draft' | 'ai_generated' | 'image_generating' | 'image_generated' | 'approved' | 'scheduled' | 'published' | 'failed' | 'archived';
export type ContentType = 'post' | 'story' | 'video_script' | 'carousel' | 'reel';
export type SocialPlatform = 'instagram_feed' | 'instagram_story' | 'instagram_reel' | 'facebook' | 'linkedin' | 'tiktok' | 'whatsapp' | 'twitter';
export type AspectRatio = '1:1' | '4:5' | '9:16' | '16:9';

export interface ContentCalendar {
    id: string;
    tenant_id: string;
    month: number;
    year: number;
    objectives: string[];
    offers: Offer[];
    strategic_dates: StrategicDate[];
    legal_restrictions: string | null;
    custom_instructions: string | null;
    ai_plan: AIPlan | null;
    ai_request_id: string | null;
    status: ContentCalendarStatus;
    approved_by: string | null;
    approved_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Offer {
    title: string;
    date: string;
    description?: string;
}

export interface StrategicDate {
    date: string;
    event: string;
    type?: 'holiday' | 'company_milestone' | 'seasonal' | 'industry_event';
}

export interface AIPlan {
    summary: string;
    content_pillars: string[];
    weekly_themes: WeeklyTheme[];
    suggested_posts: SuggestedPost[];
}

export interface WeeklyTheme {
    week: number;
    theme: string;
    focus: string[];
}

export interface SuggestedPost {
    date: string;
    topic: string;
    content_type: ContentType;
    platforms: SocialPlatform[];
    priority: 'low' | 'medium' | 'high';
}

export interface ContentItem {
    id: string;
    tenant_id: string;
    calendar_id: string;
    title: string;
    topic: string;
    content_type: ContentType;
    base_copy: string | null;
    base_cta: string | null;
    hashtags: string[];
    tone: string | null;
    image_prompt: string | null;
    image_url: string | null;
    media_urls: string[];
    scheduled_date: string | null;
    scheduled_time: string | null;
    timezone: string;
    status: ContentItemStatus;
    approved_by: string | null;
    approved_at: string | null;
    approval_notes: string | null;
    ai_request_ids: string[];
    performance_metrics: PerformanceMetrics | null;
    created_at: string;
    updated_at: string;
}

export interface PerformanceMetrics {
    impressions?: number;
    reach?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    clicks?: number;
    engagement_rate?: number;
}

export interface ContentVariant {
    id: string;
    content_item_id: string;
    platform: SocialPlatform;
    adapted_copy: string | null;
    adapted_cta: string | null;
    adapted_hashtags: string[];
    character_count: number | null;
    media_url: string | null;
    aspect_ratio: AspectRatio | null;
    ai_request_id: string | null;
    created_at: string;
    updated_at: string;
}

// API Request/Response Types
export interface GenerateCalendarRequest {
    tenant_id: string;
    month: number;
    year: number;
    objectives: string[];
    offers?: Offer[];
    strategic_dates?: StrategicDate[];
    custom_instructions?: string;
}

export interface GenerateCalendarResponse {
    calendar_id: string;
    ai_plan: AIPlan;
    ai_request_id: string;
}

export interface GenerateContentRequest {
    tenant_id: string;
    calendar_id: string;
    topic: string;
    content_type: ContentType;
    platforms: SocialPlatform[];
    additional_context?: string;
}

export interface GenerateContentResponse {
    content_item_id: string;
    base_copy: string;
    base_cta: string;
    hashtags: string[];
    image_prompt: string;
    variants: ContentVariant[];
    ai_request_ids: string[];
}

export interface GenerateImageRequest {
    tenant_id: string;
    content_item_id: string;
    prompt: string;
    aspect_ratio: AspectRatio;
}

export interface GenerateImageResponse {
    content_item_id: string;
    image_url: string;
    ai_request_id: string;
}
