'use client'
import { forwardRef, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, id, ...props }, ref) => {
        return (
            <div>
                {label && (
                    <label htmlFor={id} className='block text-xs font-semibold
            text-imi-500 uppercase tracking-widest mb-2'>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={id}
                    className={cn(
                        "w-full min-h-[120px] px-4 py-3 rounded-lg border text-base sm:text-sm",
                        "bg-white text-imi-900 shadow-soft",
                        "border-imi-100 focus:border-imi-900 focus:ring-2 focus:ring-imi-900/10",
                        "hover:border-imi-200 transition-all duration-200 resize-none",
                        "placeholder:text-imi-400",
                        error && 'border-red-500 focus:ring-red-500/10',
                        className
                    )}
                    {...props}
                />
                {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'
export default Textarea
