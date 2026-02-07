'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Development } from '../types/development';

interface DevelopmentGalleryProps {
    development: Development;
}

export default function DevelopmentGallery({ development }: DevelopmentGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = development.images.gallery.length > 0
        ? development.images.gallery
        : [development.images.main].filter(Boolean);

    if (images.length === 0) {
        return (
            <section className="section-padding bg-slate-50">
                <div className="container-custom">
                    <h2 className="font-display text-3xl text-navy-900 mb-8 font-bold text-center">Galeria de Imagens</h2>
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center border border-slate-200 border-dashed">
                        <div className="text-center">
                            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium tracking-wide">Imagens em breve</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="section-padding bg-slate-50">
            <div className="container-custom">
                <h2 className="font-display text-3xl text-navy-900 mb-8 font-bold text-center">Galeria de Imagens</h2>

                {/* Carousel */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 shadow-2xl">
                    <Image
                        src={images[currentIndex]}
                        alt={`${development.name} - Imagem ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                    />

                    {/* Controles */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 p-4 rounded-full transition-all text-white border border-white/20"
                                aria-label="Imagem anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 p-4 rounded-full transition-all text-white border border-white/20"
                                aria-label="Próxima imagem"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            {/* Indicators */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-12' : 'bg-white/40 w-1.5'
                                            }`}
                                        aria-label={`Ir para imagem ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Video (se existir) */}
                {development.videoUrl && (
                    <div className="mt-12 aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <iframe
                            src={development.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
