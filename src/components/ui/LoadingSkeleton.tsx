export function LoadingSkeleton({ count = 1 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200/60 rounded-xl h-32 w-full mb-4 last:mb-0"></div>
            ))}
        </>
    );
}
