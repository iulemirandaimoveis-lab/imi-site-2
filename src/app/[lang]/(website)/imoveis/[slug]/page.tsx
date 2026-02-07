
import { notFound } from 'next/navigation';
import { developments, getDevelopmentBySlug } from '../data/developments';
import DevelopmentHero from '../components/DevelopmentHero';
import DevelopmentDetails from '../components/DevelopmentDetails';
import DevelopmentGallery from '../components/DevelopmentGallery';
import DevelopmentUnits from '../components/DevelopmentUnits';
import DevelopmentLocation from '../components/DevelopmentLocation';
import DevelopmentCTA from '../components/DevelopmentCTA';
import { Metadata } from 'next';

interface PageProps {
    params: {
        lang: string;
        slug: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const development = getDevelopmentBySlug(params.slug);

    if (!development) {
        return {
            title: 'Empreendimento não encontrado | IMI'
        };
    }

    return {
        title: `${development.name} | IMI Inteligência Imobiliária`,
        description: development.shortDescription,
        openGraph: {
            title: development.name,
            description: development.shortDescription,
            images: [development.images.main || '/og-image.jpg']
        }
    };
}

export default async function DevelopmentPage({ params }: PageProps) {
    const development = getDevelopmentBySlug(params.slug);

    if (!development) {
        notFound();
    }

    return (
        <main className="bg-white">
            <DevelopmentHero development={development} />
            <div className="relative z-10 bg-white shadow-[0_-20px_50px_-20px_rgba(2,6,23,0.3)] rounded-t-[40px] -mt-10 overflow-hidden">
                <DevelopmentDetails development={development} />
                <DevelopmentGallery development={development} />
                <DevelopmentUnits development={development} />
                <DevelopmentLocation development={development} />
                <DevelopmentCTA development={development} />
            </div>
        </main>
    );
}

// Generate static params para SSG
export async function generateStaticParams({ params: { lang } }: { params: { lang: string } }) {
    // Como estamos dentro de [lang], o Next.js chamará isso para cada idioma
    return developments.map((dev) => ({
        slug: dev.slug
    }));
}
