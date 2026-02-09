'use server';

/**
 * DEPRECATED: Este arquivo continha funções Prisma que foram migradas para Supabase.
 * As operações de CRUD agora são feitas diretamente via supabase-js no frontend (Backoffice).
 * 
 * Mantido apenas para evitar erros de import em código legado.
 * Todas as funções retornam erro indicando migração.
 */

const MIGRATION_ERROR = {
    success: false,
    error: 'Esta função foi migrada para Supabase. Use o cliente supabase-js diretamente.'
};

export async function createProperty(_data: unknown) {
    console.warn('[DEPRECATED] createProperty chamado. Use supabase-js.');
    return MIGRATION_ERROR;
}

export async function createLead(_data: unknown) {
    console.warn('[DEPRECATED] createLead chamado. Use supabase-js.');
    return MIGRATION_ERROR;
}

export async function createConsultoria(_data: unknown) {
    console.warn('[DEPRECATED] createConsultoria chamado. Use supabase-js.');
    return MIGRATION_ERROR;
}

export async function updateProperty(_id: string, _data: unknown) {
    console.warn('[DEPRECATED] updateProperty chamado. Use supabase-js.');
    return MIGRATION_ERROR;
}

export async function deleteProperty(_id: string) {
    console.warn('[DEPRECATED] deleteProperty chamado. Use supabase-js.');
    return MIGRATION_ERROR;
}
