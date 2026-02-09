'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            router.push('/backoffice')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Erro ao fazer login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-xl p-8 border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">
                        IMI Admin
                    </h1>
                    <p className="text-slate-600">Sistema de Gestão Imobiliária</p>\n        </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className=\"p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm\">
                    {error}
            </div>
          )}

            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="seu@email.com"
            />

            <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? 'Entrando...' : 'Entrar'}\n          </Button>
        </form>
      </div >\n    </div >
  )
}
