'use client'
import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, id, ...props }, ref) => {
        return (
            <div className="relative">
                {label && (
                    <label htmlFor={id} className='block text-xs font-semibold
            text-imi-500 uppercase tracking-widest mb-2'>
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={id}
                        className={cn(
                            'w-full h-12 px-4 bg-white border border-imi-100 rounded-lg',
                            'text-imi-900 text-sm placeholder:text-imi-400 shadow-soft',
                            'transition-all duration-200 appearance-none cursor-pointer',
                            'focus:outline-none focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900',
                            'hover:border-imi-200',
                            error && 'border-red-500 focus:ring-red-500/10',
                            className
                        )}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-4 h-4 text-imi-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
            </div>
        )
    }
)
Select.displayName = 'Select'
export default Select
