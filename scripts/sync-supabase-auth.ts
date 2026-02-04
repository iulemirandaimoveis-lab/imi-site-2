import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function main() {
    console.log('🔄 Syncing Supabase Auth User...')
    const email = 'iule@imi.com'
    const password = 'teste123'

    // 1. Check if user exists in Auth
    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    if (error) {
        console.error('❌ Error listing users:', error)
        return
    }

    const existingUser = users.find(u => u.email === email)

    if (existingUser) {
        console.log(`⚠️ User ${email} found (ID: ${existingUser.id}). Updating password...`)
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: password, email_confirm: true }
        )
        if (updateError) {
            console.error('❌ Failed to update password:', updateError)
        } else {
            console.log('✅ Password updated to: teste123')
        }
    } else {
        console.log(`🆕 Creating user ${email}...`)
        const { data, error: createError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { name: 'Iule Miranda', role: 'ADMIN' }
        })

        if (createError) {
            console.error('❌ Failed to create user:', createError)
        } else {
            console.log(`✅ User created successfully! ID: ${data.user.id}`)
        }
    }
}

main()
