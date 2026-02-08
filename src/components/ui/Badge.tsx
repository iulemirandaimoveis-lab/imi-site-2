'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'info'
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
    const variants = {
        default: 'bg-imi-50 text-imi-600',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-amber-100 text-amber-700',
        info: 'bg-accent-500/10 text-accent-600',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
