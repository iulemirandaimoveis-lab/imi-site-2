'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function ContatoPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitStatus('success')
                    ; (e.target as HTMLFormElement).reset()
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white">
                <div className="container-custom py-16 lg:py-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        <motion.h1 variants={slideUp} className="text-display-md md:text-display-lg font-bold mb-6">
                            Contato
                        </motion.h1>
                        <motion.p variants={slideUp} className="text-xl text-primary-100">
                            Entre em contato conosco. Estamos prontos para ajudar em suas decisões imobiliárias.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h2 variants={slideUp} className="text-3xl font-bold text-neutral-900 mb-8">
                                Fale Conosco
                            </motion.h2>

                            <div className="space-y-6">
                                <motion.div variants={slideUp} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">E-mail</h3>
                                        <a href="mailto:contato@imi.com.br" className="text-primary-700 hover:underline">
                                            contato@imi.com.br
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div variants={slideUp} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">WhatsApp</h3>
                                        <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">
                                            (11) 99999-9999
                                        </a>
                                        <p className="text-sm text-neutral-600 mt-1">
                                            Atendimento de segunda a sexta, 9h às 18h
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div variants={slideUp} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-700" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 mb-1">LinkedIn</h3>
                                        <a href="https://linkedin.com/in/iule-miranda" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:underline">
                                            linkedin.com/in/iule-miranda
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div variants={slideUp} className="mt-12 p-6 bg-primary-50 rounded-xl">
                                <h3 className="font-semibold text-neutral-900 mb-2">Credenciais Profissionais</h3>
                                <div className="space-y-1 text-sm text-neutral-700">
                                    <p><strong>Iule Miranda</strong></p>
                                    <p>CRECI 17933</p>
                                    <p>CNAI 53290</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="bg-white rounded-2xl shadow-lg p-8"
                        >
                            <motion.h2 variants={slideUp} className="text-2xl font-bold text-neutral-900 mb-6">
                                Envie uma Mensagem
                            </motion.h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <motion.div variants={slideUp}>
                                    <Input
                                        label="Nome completo"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Seu nome"
                                    />
                                </motion.div>

                                <motion.div variants={slideUp}>
                                    <Input
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="seu@email.com"
                                    />
                                </motion.div>

                                <motion.div variants={slideUp}>
                                    <Input
                                        label="Telefone"
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="(00) 00000-0000"
                                    />
                                </motion.div>

                                <motion.div variants={slideUp}>
                                    <Textarea
                                        label="Mensagem"
                                        name="message"
                                        rows={5}
                                        required
                                        placeholder="Como podemos ajudar?"
                                    />
                                </motion.div>

                                <motion.div variants={slideUp}>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        fullWidth
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                    </Button>
                                </motion.div>

                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                                    >
                                        Mensagem enviada com sucesso! Retornaremos em breve.
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                                    >
                                        Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente.
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
