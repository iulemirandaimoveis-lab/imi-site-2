'use client'

import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react'
import { cn } from '@/lib/utils'
import React from 'react'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', fullWidth = false,
        asChild = false, children, ...props }, ref) => {

        const base = [
            'inline-flex items-center justify-center font-semibold',
            'tracking-wide transition-all duration-300 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'active:scale-[0.98]',
            'rounded-xl',
        ].join(' ')

        const variants = {
            primary: 'bg-primary text-white hover:bg-primary-dark shadow-glow hover:shadow-lg',
            secondary: 'bg-white dark:bg-card-dark text-text-header-light dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800',
            outline: 'bg-transparent text-text-header-light dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5',
            ghost: 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
            danger: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
        }

        const sizes = {
            sm: 'h-9 px-3 text-xs gap-1.5',
            md: 'h-10 px-4 text-sm gap-2',
            lg: 'h-12 px-6 text-base gap-2',
        }

        const classes = cn(base, variants[variant], sizes[size],
            fullWidth && 'w-full', className)

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as ReactElement<any>, {
                className: cn((children as ReactElement<any>).props.className, classes),
            })
        }

        return <button ref={ref} className={classes} {...props}>{children}</button>
    }
)

Button.displayName = 'Button'
export default Button
