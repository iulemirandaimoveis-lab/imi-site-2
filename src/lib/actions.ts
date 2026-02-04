'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProperty(data: any) {
    try {
        // Basic validation or sanitization could go here
        // Ensure numeric strings are converted if needed (though Zod handles this in the form)

        // Create the property
        const property = await prisma.property.create({ data });

        revalidatePath('/backoffice/properties');
        return { success: true, data: property };
    } catch (error) {
        console.error('Error creating property:', error);
        return { success: false, error: 'Failed to create property' };
    }
}
