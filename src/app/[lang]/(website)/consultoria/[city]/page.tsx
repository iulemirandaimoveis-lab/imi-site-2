import { notFound } from 'next/navigation';
import { consultingCities, getCityBySlug } from '../data/cities';
import CityHero from '../components/CityHero';
import CityInvestmentProfile from '../components/CityInvestmentProfile';
import CityServices from '../components/CityServices';
import CityCTA from '../components/CityCTA';
import { Metadata } from 'next';

interface PageProps {
    params: { lang: string; city: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const city = getCityBySlug(params.city);
    if (!city) return { title: 'Consultoria | IMI' };
    return {
        title: `Investir em ${city.name} | Consultoria IMI`,
        description: city.description,
    };
}

export default function CityPage({ params }: PageProps) {
    const city = getCityBySlug(params.city);
    if (!city) notFound();

    return (
        <main className="bg-white">
            <CityHero city={city} />
            <CityInvestmentProfile city={city} />
            <CityServices city={city} />
            <CityCTA city={city} lang={params.lang} />
        </main>
    );
}

export function generateStaticParams() {
    return consultingCities.map(c => ({ city: c.slug }));
}
