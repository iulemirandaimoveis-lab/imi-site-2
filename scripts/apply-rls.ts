import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    console.log('🛡️ Applying RLS Policies...')

    const sqlPath = path.join(process.cwd(), 'supabase', 'rls-policies.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')

    // Split commands by semicolon to run them one by one (basic split, might need refinement if SQL contains semicolons in strings)
    // But for the simple policies I wrote, splitting by `;` matches valid statement ends mostly.
    // Better: Run the whole block? Prisma might support multiple statements depending on DB driver. Postgres usually does.

    try {
        await prisma.$executeRawUnsafe(sqlContent)
        console.log('✅ RLS Policies applied successfully!')
    } catch (e: any) {
        // If error is about multiple commands, try splitting
        console.log('⚠️  Single execution failed, trying statement by statement...')

        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'))

        for (const statement of statements) {
            try {
                await prisma.$executeRawUnsafe(statement)
                console.log(`✓ Executed: ${statement.substring(0, 50)}...`)
            } catch (innerError) {
                console.error(`❌ Failed: ${statement.substring(0, 50)}...`)
                console.error(innerError)
            }
        }
    }
}

main()
    .catch((e) => {
        console.error('❌ Fatal Error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
