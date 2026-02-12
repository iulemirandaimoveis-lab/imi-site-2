/**
 * Material Symbols Outlined Icon Component
 * Uses Google Fonts Material Symbols
 */

interface IconProps {
    name: string
    className?: string
    size?: number
    filled?: boolean
}

export default function Icon({ name, className = '', size, filled = false }: IconProps) {
    const sizeClass = size ? `text-[${size}px]` : ''
    const filledClass = filled ? 'filled' : ''
    
    return (
        <span 
            className={`material-symbols-outlined ${sizeClass} ${filledClass} ${className}`}
            style={size ? { fontSize: `${size}px` } : undefined}
        >
            {name}
        </span>
    )
}
