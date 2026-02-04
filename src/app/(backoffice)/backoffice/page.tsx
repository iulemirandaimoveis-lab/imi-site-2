import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Login() {
    async function loginAction(formData: FormData) {
        'use server';

        const cookieStore = cookies();
        const supabase = createServerComponentClient({ cookies: () => cookieStore });

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error);
            return redirect('/backoffice?error=InvalidCredentials');
        }

        redirect('/backoffice/dashboard');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
            {/* Background Effects matching premium theme */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-yellow-600/10 blur-[100px]" />
            </div>

            <div className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10 border border-white/10">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-blue-900 mb-2">IMI</h1>
                    <h2 className="text-xl font-bold text-gray-900">Backoffice Login</h2>
                    <p className="text-sm text-gray-500 mt-2">Acesso restrito para administradores</p>
                </div>

                <form action={loginAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="nome@imi.com.br"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase">Senha</label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-4 focus:ring-blue-900/10 transition-all outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition transform hover:-translate-y-0.5 hover:shadow-lg">
                        Entrar no Sistema
                    </button>
                </form>
            </div>
        </div>
    );
}
