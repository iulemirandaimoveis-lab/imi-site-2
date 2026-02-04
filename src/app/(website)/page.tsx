'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero / Apresentação */}
            <section className="relative py-32 lg:py-48 bg-gradient-to-br from-navy-700 to-navy-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl lg:text-6xl font-black tracking-tight mb-6 leading-tight"
                    >
                        IMI – Inteligência Imobiliária
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-gray-300 font-light"
                    >
                        Avaliações técnicas NBR 14653, corretagem premium e consultoria estratégica para investimentos em dólar nos EUA e Dubai.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link href="/consultoria" className="bg-gold-500 text-navy-900 px-8 py-4 rounded-full font-bold hover:bg-gold-600 transition-all shadow-lg hover:shadow-gold-500/20 transform hover:-translate-y-1">
                            Consultoria em Dólar
                        </Link>
                        <Link href="/imoveis" className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/20 shadow-lg transform hover:-translate-y-1">
                            Ver Imóveis
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Avaliações */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl lg:text-5xl font-black text-center text-navy-900 mb-16 tracking-tight">Avaliações Imobiliárias</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Laudos NBR 14653", desc: "Para processos judiciais, garantia bancária, inventário e partilha." },
                            { title: "Pareceres Técnicos", desc: "Análise de valor de mercado para compra, venda e locação." },
                            { title: "Estudos de Viabilidade", desc: "Análise técnica e financeira para novos empreendimentos." }
                        ].map((item, i) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={i}
                                className="bg-offwhite p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100"
                            >
                                <h3 className="text-xl font-bold mb-4 text-navy-800">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Imóveis */}
            <section className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-offwhite border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl lg:text-5xl font-black text-navy-900 mb-8 tracking-tight">Portal de Imóveis Premium</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-light">Seleção curada de imóveis de alto padrão no Brasil, EUA e Dubai.</p>
                    <Link href="/imoveis" className="inline-block bg-navy-600 text-white px-10 py-5 rounded-full font-bold hover:bg-navy-700 transition shadow-xl hover:shadow-navy-600/20 transform hover:-translate-y-1">
                        Explorar Imóveis
                    </Link>
                </div>
            </section>

            {/* Consultoria */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl lg:text-5xl font-black text-center text-navy-900 mb-16 tracking-tight">Consultoria de Investimento</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-navy-900 p-12 rounded-3xl shadow-xl text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-gold-500/20"></div>
                            <h3 className="text-3xl font-bold mb-6 text-gold-500">Renda em Dólar</h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">Estrutura jurídica/contábil completa, simulações de rentabilidade e imóveis ideais nos EUA e Dubai para proteção patrimonial.</p>
                            <Link href="/consultoria" className="text-white font-semibold border-b-2 border-gold-500 pb-1 hover:text-gold-500 transition">Saiba mais</Link>
                        </div>
                        <div className="bg-offwhite p-12 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-lg transition">
                            <h3 className="text-3xl font-bold mb-6 text-navy-800">Multiplicação de Patrimônio</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">Estratégias avançadas de alavancagem, diversificação e flip imobiliário para investidores arrojados.</p>
                            <Link href="/consultoria" className="text-navy-600 font-semibold border-b-2 border-navy-600 pb-1 hover:text-navy-800 transition">Saiba mais</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inteligência */}
            <section className="py-24 lg:py-32 bg-gradient-to-br from-navy-900 to-navy-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-black mb-8 tracking-tight">Ferramentas de Inteligência</h2>
                    <p className="text-xl max-w-3xl mx-auto opacity-90 font-light mb-10">Monitoramento de mercado em tempo real por bairro, cidade, estado e país.</p>
                    <button disabled className="bg-white/10 text-white/50 px-8 py-3 rounded-full font-semibold cursor-not-allowed border border-white/10">Em breve</button>
                </div>
            </section>

            {/* Projetos */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl lg:text-5xl font-black text-navy-900 mb-16 tracking-tight">Projetos em Desenvolvimento</h2>
                    <div className="bg-offwhite rounded-3xl p-12 shadow-sm border border-gray-100 inline-block max-w-2xl w-full">
                        <h3 className="text-2xl font-bold mb-4 text-navy-800">Reserva Atlantis</h3>
                        <p className="text-gray-600 mb-6">Breve lançamento. Um marco arquitetônico.</p>
                        <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse flex items-center justify-center text-gray-400">Imagem do Projeto</div>
                    </div>
                </div>
            </section>

            {/* Sobre */}
            <section className="py-24 lg:py-32 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-5xl font-black text-navy-900 mb-12 tracking-tight">Sobre a IMI</h2>
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light">
                        Somos especialistas em <strong className="text-navy-700 font-bold">inteligência imobiliária</strong>, combinando análise técnica, corretagem seletiva e consultoria financeira estratégica para maximizar retorno e segurança nos investimentos.
                    </p>
                </div>
            </section>

            {/* Contato */}
            <section className="py-24 lg:py-32 bg-gradient-to-br from-navy-600 to-navy-800 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl lg:text-5xl font-black mb-16 tracking-tight">Entre em Contato</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <a href="https://wa.me/5581999999999" target="_blank" className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-400 transition">WhatsApp</h3>
                            <p className="text-lg opacity-90">(81) 99723-0455</p>
                        </a>
                        <a href="mailto:contato@iulemirandaimoveis.com.br" className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-400 transition">Email</h3>
                            <p className="text-lg opacity-90">contato@iulemirandaimoveis.com.br</p>
                        </a>
                        <a href="https://linkedin.com/in/iule-miranda-imoveis" target="_blank" className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 hover:bg-white/20 transition group">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gold-400 transition">LinkedIn</h3>
                            <p className="text-lg opacity-90">@iulemiranda</p>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
