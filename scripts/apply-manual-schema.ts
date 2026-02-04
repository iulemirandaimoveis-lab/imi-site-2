import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
    console.log('🛠️ Applying Manual Schema...')

    const sqlPath = path.join(process.cwd(), 'supabase', 'manual-schema.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')

    // Split by double newline or specific markers because DO blocks have semicolons inside
    // For simplicity, we assume the file structure allows splitting by empty lines or we run block by block

    // Actually, prisma executes raw usually handles blocks?
    // Let's try splitting by double newline to separate major blocks

    const blocks = sqlContent.split('\n\n').filter(b => b.trim().length > 0);

    for (const block of blocks) {
        try {
            await prisma.$executeRawUnsafe(block)
            console.log(`✓ Executed block starting: ${block.trim().substring(0, 40)}...`)
        } catch (e: any) {
            console.error(`❌ Failed block: ${block.trim().substring(0, 40)}...`)
            console.error(e.message)
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
