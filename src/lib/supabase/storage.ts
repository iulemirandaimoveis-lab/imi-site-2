import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function uploadFile(
    bucket: string,
    path: string,
    file: File
): Promise<{ url: string | null; error: Error | null }> {
    try {
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) throw error

        const { data: urlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path)

        return { url: urlData.publicUrl, error: null }
    } catch (error) {
        return { url: null, error: error as Error }
    }
}

export async function deleteFile(
    bucket: string,
    path: string
): Promise<{ error: Error | null }> {
    try {
        const { error } = await supabase.storage
            .from(bucket)
            .remove([path])

        if (error) throw error

        return { error: null }
    } catch (error) {
        return { error: error as Error }
    }
}

export async function uploadMultipleFiles(
    bucket: string,
    files: File[]
): Promise<{ urls: string[]; errors: Error[] }> {
    const urls: string[] = []
    const errors: Error[] = []

    for (const file of files) {
        const timestamp = Date.now()
        const fileName = `${timestamp}-${file.name}`
        const { url, error } = await uploadFile(bucket, fileName, file)

        if (error) {
            errors.push(error)
        } else if (url) {
            urls.push(url)
        }
    }

    return { urls, errors }
}
