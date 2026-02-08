'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { slideUp, staggerContainer } from '@/lib/animations'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function ConsultationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch('/api/consultation', {
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
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-white/80 backdrop-blur-md shadow-soft rounded-2xl shadow-lg p-8 md:p-12"
        >
            <motion.h2 variants={slideUp} className="text-3xl font-bold text-imi-900 mb-2">
                Agendar Diagnóstico
            </motion.h2>
            <motion.p variants={slideUp} className="text-imi-600 mb-8">
                Conte-nos sobre seu contexto e objetivos. Retornaremos com uma proposta personalizada.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={slideUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Nome completo"
                        name="name"
                        type="text"
                        required
                        placeholder="Seu nome"
                    />
                    <Input
                        label="E-mail"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                    />
                </motion.div>

                <motion.div variants={slideUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Telefone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="(00) 00000-0000"
                    />
                    <Input
                        label="Empresa (opcional)"
                        name="company"
                        type="text"
                        placeholder="Nome da empresa"
                    />
                </motion.div>

                <motion.div variants={slideUp}>
                    <Select
                        label="Tipo de consultoria"
                        name="consultationType"
                        required
                        options={[
                            { value: '', label: 'Selecione...' },
                            { value: 'investment', label: 'Consultoria para Investidores' },
                            { value: 'feasibility', label: 'Viabilidade de Compra/Venda' },
                            { value: 'pricing', label: 'Precificação Estratégica' },
                            { value: 'portfolio', label: 'Análise de Portfólio' },
                            { value: 'other', label: 'Outro' },
                        ]}
                    />
                </motion.div>

                <motion.div variants={slideUp}>
                    <Select
                        label="Perfil de investimento"
                        name="investmentProfile"
                        required
                        options={[
                            { value: '', label: 'Selecione...' },
                            { value: 'conservative', label: 'Conservador' },
                            { value: 'moderate', label: 'Moderado' },
                            { value: 'aggressive', label: 'Agressivo' },
                            { value: 'not-applicable', label: 'Não se aplica' },
                        ]}
                    />
                </motion.div>

                <motion.div variants={slideUp}>
                    <Textarea
                        label="Contexto e objetivo"
                        name="context"
                        rows={5}
                        required
                        placeholder="Descreva sua situação atual, objetivos e o que espera da consultoria..."
                    />
                </motion.div>

                <motion.div variants={slideUp}>
                    <Select
                        label="Método de contato preferido"
                        name="preferredContact"
                        required
                        options={[
                            { value: '', label: 'Selecione...' },
                            { value: 'phone', label: 'Telefone' },
                            { value: 'email', label: 'E-mail' },
                            { value: 'whatsapp', label: 'WhatsApp' },
                            { value: 'meeting', label: 'Reunião presencial' },
                        ]}
                    />
                </motion.div>

                <motion.div variants={slideUp}>
                    <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Agendar Diagnóstico'}
                    </Button>
                </motion.div>

                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                    >
                        Solicitação enviada com sucesso! Entraremos em contato em breve.
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800"
                    >
                        Erro ao enviar solicitação. Por favor, tente novamente ou entre em contato diretamente.
                    </motion.div>
                )}
            </form>
        </motion.div>
    )
}
