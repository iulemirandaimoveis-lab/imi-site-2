'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-white rounded-lg border border-imi-100 overflow-hidden',
                    hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        )
    }
)

Card.displayName = 'Card'

export default Card
