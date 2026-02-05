'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function BackofficeLoginPage() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Verificação extra para depuração (opcional, ajuda a identificar se as env vars chegaram no client)
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('VARIÁVEIS SUPABASE AUSENTES NO CLIENTE');
        }

        try {
            console.log('Iniciando login para:', email);

            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (signInError) {
                console.error('Erro Supabase:', signInError.message, signInError.status);

                // Mensagens de erro mais específicas
                if (signInError.message.includes('Invalid login credentials')) {
                    setError('Email ou senha incorretos. Verifique suas credenciais.');
                } else if (signInError.message.includes('Email not confirmed')) {
                    setError('Email não confirmado. Verifique sua caixa de entrada.');
                } else if (signInError.message.includes('Too many requests')) {
                    setError('Muitas tentativas. Aguarde alguns minutos.');
                } else if (signInError.message.includes('Invalid API key') || signInError.status === 401) {
                    setError('Erro crítico: Chave de API do Supabase inválida nas configurações do servidor. Por favor, contate o administrador.');
                } else {
                    setError(`Erro: ${signInError.message}`);
                }
                return;
            }

            if (data.session) {
                console.log('Login bem-sucedido! Redirecionando...');
                router.push('/backoffice/dashboard');
                router.refresh();
            }
        } catch (err: any) {
            console.error('Exceção no login:', err);
            setError('Erro de conexão ou erro interno. Tente recarregar a página.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 px-4">
            <div className="w-full max-w-md">

                {/* Card de Login */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">

                    {/* Logo/Título */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            IMI Backoffice
                        </h1>
                        <p className="text-gray-300">
                            Entre com suas credenciais
                        </p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-200 mb-2"
                            >
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="seu@email.com"
                                disabled={loading}
                            />
                        </div>

                        {/* Senha */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-200 mb-2"
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Erro */}
                        {error && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>

                </div>

                {/* Link voltar */}
                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                        ← Voltar ao site
                    </a>
                </div>
            </div>
        </div>
    );
}
