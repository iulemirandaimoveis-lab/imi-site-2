'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'primary'
    size?: 'sm' | 'md'
}

export default function Badge({ 
    className, 
    variant = 'default', 
    size = 'sm',
    children, 
    ...props 
}: BadgeProps) {
    const variants = {
        default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
        info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        primary: 'bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 dark:border-primary/30',
    }
    
    const sizes = {
        sm: 'px-1.5 py-0.5 text-[10px]',
        md: 'px-2 py-1 text-xs',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1 rounded-md font-medium uppercase tracking-wide border',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}
