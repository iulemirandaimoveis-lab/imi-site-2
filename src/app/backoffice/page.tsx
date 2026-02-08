'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function BackofficeLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (authError) {
                setError('Falha na autenticação. Verifique suas credenciais.')
                return
            }

            if (data.session) {
                router.push('/backoffice/dashboard')
                router.refresh()
            }
        } catch (err) {
            setError('Erro inesperado. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-imi-900 font-display">
                        IMI Admin
                    </h1>
                    <div className="w-10 h-1 bg-accent-500 mx-auto mt-4 mb-3 rounded-full" />
                    <p className="text-xs text-imi-400 uppercase tracking-[0.2em] font-bold">
                        Plataforma de Inteligência Imobiliária
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 h-12 bg-white border border-imi-100 rounded-xl text-imi-900 placeholder:text-imi-300 focus:outline-none focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-imi-400 uppercase tracking-widest mb-2">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 h-12 bg-white border border-imi-100 rounded-xl text-imi-900 placeholder:text-imi-300 focus:outline-none focus:ring-2 focus:ring-imi-900/10 focus:border-imi-900 transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-imi-300 hover:text-imi-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-imi-900 text-white h-12 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-imi-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Autenticando...
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                <p className="mt-10 text-center text-[10px] text-imi-300 uppercase tracking-widest">
                    2026 IMI — Inteligência Imobiliária
                </p>
            </div>
        </div>
    )
}
