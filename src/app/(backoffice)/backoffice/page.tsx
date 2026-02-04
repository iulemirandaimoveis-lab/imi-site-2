'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Loader2, Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

// Error Boundary definition
class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}

const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const supabase = createClientComponentClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true)
        setApiError('')

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })

            if (error) {
                setApiError(error.message || 'Credenciais inválidas')
            } else {
                router.refresh()
                router.push('/backoffice/dashboard')
            }
        } catch (err) {
            setApiError('Erro ao conectar com o serviço de autenticação.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                    E-mail Corporativo
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-navy-600 transition-colors">
                        <Mail className="w-5 h-5" />
                    </div>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-navy-600 focus:ring-4 focus:ring-navy-600/10 transition-all outline-none font-medium text-gray-900 placeholder-gray-400"
                        placeholder="nome@imi.com.br"
                    />
                </div>
                {errors.email && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                    Senha de Acesso
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-navy-600 transition-colors">
                        <Lock className="w-5 h-5" />
                    </div>
                    <input
                        {...register('password')}
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-navy-600 focus:ring-4 focus:ring-navy-600/10 transition-all outline-none font-medium text-gray-900 placeholder-dots"
                        placeholder="••••••••"
                    />
                </div>
                {errors.password && (
                    <p className="text-xs text-red-500 font-medium ml-1">{errors.password.message}</p>
                )}
            </div>

            {apiError && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <p className="text-sm text-red-600 font-medium">{apiError}</p>
                </motion.div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1E40AF] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#1E3A8A] transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Autenticando...</span>
                    </>
                ) : (
                    'Acessar Backoffice'
                )}
            </button>
        </form>
    )
}

export default function BackofficeLoginPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-navy-700/20 blur-[120px]" />
                <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-gold-600/10 blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">
                        IMI
                    </h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase font-medium">
                        Inteligência Imobiliária
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                    <div className="p-8 pb-6">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Acesso Restrito
                            </h2>
                            <p className="text-gray-500 text-sm mt-2">
                                Sistema de Gestão & Inteligência
                            </p>
                        </div>

                        <ErrorBoundary fallback={<div className="text-red-500 text-center p-4">Erro no login – tente novamente</div>}>
                            <LoginForm />
                        </ErrorBoundary>

                    </div>
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                            <Lock className="w-3 h-3" />
                            Conexão Segura SSL Encrypted
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-xs text-gray-500/60 font-medium">
                        © {new Date().getFullYear()} IMI – Inteligência Imobiliária. Todos os direitos reservados.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
