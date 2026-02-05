import Link from 'next/link';

export const metadata = {
    title: 'Projetos - IMI Inteligência Imobiliária',
    description: 'Projetos especiais e parcerias estratégicas da IMI.',
};

export default function ProjetosPage() {
    return (
        <div className="bg-white min-h-screen">
            <section className="py-20 lg:py-32 bg-neutral-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">Projetos Especiais</h1>
                        <p className="text-xl text-neutral-300 leading-relaxed">
                            Desenvolvimento de projetos imobiliários sob medida, parcerias estratégicas e curadoria técnica para investidores e incorporadoras.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto py-12 border-2 border-dashed border-neutral-200 rounded-3xl">
                        <p className="text-neutral-500 italic mb-4">Esta seção está sendo atualizada com nosso portfólio completo.</p>
                        <Link href="/contato" className="text-primary-600 font-semibold hover:underline">
                            Solicite informações sobre nossos projetos atuais
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
