'use client';

import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/lib/animations';

export default function PrivacidadePage() {
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
                        Política de Privacidade
                    </motion.h1>
                    <motion.div variants={slideUp} className="prose prose-slate max-w-none">
                        <p>
                            A IMI – Inteligência Imobiliária está comprometida com a proteção de sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
                        </p>
                        <h3>1. Coleta de Informações</h3>
                        <p>
                            Coletamos informações que você nos fornece diretamente, como quando preenche um formulário de contato ou solicita uma avaliação. Isso pode incluir seu nome, e-mail e número de telefone.
                        </p>
                        <h3>2. Uso das Informações</h3>
                        <p>
                            Usamos suas informações para responder às suas solicitações, fornecer nossos serviços e enviar comunicações relacionadas aos seus interesses imobiliários.
                        </p>
                        <h3>3. Segurança</h3>
                        <p>
                            Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado ou divulgação.
                        </p>
                        <h3>4. Contato</h3>
                        <p>
                            Se tiver dúvidas sobre esta política, entre em contato conosco através do e-mail iulemirandaimoveis@gmail.com.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
