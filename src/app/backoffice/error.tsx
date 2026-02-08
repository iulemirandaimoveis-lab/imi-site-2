'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error boundary caught:', error);
    }, [error]);

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto p-8 bg-white/80 backdrop-blur-md shadow-soft rounded-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-red-100 rounded-full">
                        <AlertTriangle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Algo deu errado!
                </h2>

                <p className="text-gray-600 mb-6">
                    Ocorreu um erro inesperado. Por favor, tente novamente.
                </p>

                <button
                    onClick={reset}
                    className="w-full bg-imi-900 text-white px-6 py-3 rounded-xl hover:bg-imi-800 transition-all duration-300 hover:shadow-md font-medium"
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    );
}
