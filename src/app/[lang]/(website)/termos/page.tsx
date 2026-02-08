'use client';

import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';

export default function TermosPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="container-custom">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-3xl mx-auto"
                >
                    <motion.h1 variants={slideUp} className="text-display-sm font-bold text-imi-900 mb-8">
                        Termos de Uso
                    </motion.h1>
                    <motion.div variants={slideUp} className="prose prose-slate max-w-none">
                        <p>
                            Ao acessar o site da IMI – Inteligência Imobiliária, você concorda em cumprir estes termos de uso.
                        </p>
                        <h3>1. Uso do Site</h3>
                        <p>
                            O conteúdo deste site é para fins informativos e de prestação de serviços de consultoria e corretagem imobiliária. O uso indevido das informações aqui contidas é de inteira responsabilidade do usuário.
                        </p>
                        <h3>2. Propriedade Intelectual</h3>
                        <p>
                            Todo o conteúdo, logotipo e design deste site são de propriedade da IMI – Inteligência Imobiliária e protegidos por leis de direitos autorais.
                        </p>
                        <h3>3. Limitação de Responsabilidade</h3>
                        <p>
                            Embora busquemos a máxima precisão, não garantimos que todas as informações estejam livres de erros pontuais ou atualizações pendentes de mercado.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
