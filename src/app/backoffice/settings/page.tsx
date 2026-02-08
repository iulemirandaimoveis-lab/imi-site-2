'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
    Save,
    User,
    Globe,
    Bell,
    Palette,
    Shield,
    Loader2,
    Check,
    Key,
    Mail,
    Phone,
    Building,
    Instagram,
    Linkedin,
    MessageCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

const supabase = createClient();

interface SiteSettings {
    site_name: string;
    site_description: string;
    contact_email: string;
    contact_phone: string;
    contact_whatsapp: string;
    address: string;
    instagram_url: string;
    linkedin_url: string;
    facebook_url: string;
    footer_text: string;
    primary_color: string;
    secondary_color: string;
    enable_notifications: boolean;
    enable_lead_tracking: boolean;
}

interface UserProfile {
    name: string;
    email: string;
    role: string;
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

    const [settings, setSettings] = useState<SiteSettings>({
        site_name: 'IMI - Inteligência Imobiliária',
        site_description: 'Especialistas em avaliações imobiliárias, perícias e consultoria estratégica',
        contact_email: 'contato@iulemirandaimoveis.com.br',
        contact_phone: '(83) 99999-0000',
        contact_whatsapp: '5583999990000',
        address: 'João Pessoa, Paraíba - Brasil',
        instagram_url: 'https://instagram.com/iulemirandaimoveis',
        linkedin_url: 'https://linkedin.com/company/iulemirandaimoveis',
        facebook_url: '',
        footer_text: '© 2026 IMI - Inteligência Imobiliária. Todos os direitos reservados.',
        primary_color: '#23232D',
        secondary_color: '#D4AF37',
        enable_notifications: true,
        enable_lead_tracking: true
    });

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            if (authUser) {
                setUser({
                    name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário',
                    email: authUser.email || '',
                    role: 'ADMIN'
                });
            }
        };
        fetchUser();
    }, []);

    const handleSaveSettings = async () => {
        setSaving(true);
        // Simular salvamento (em produção, salvaria em tabela de configurações)
        await new Promise(resolve => setTimeout(resolve, 800));
        toast.success('Configurações salvas com sucesso');
        setSaving(false);
    };

    const handleChangePassword = async () => {
        if (passwordForm.new !== passwordForm.confirm) {
            toast.error('As senhas não coincidem');
            return;
        }
        if (passwordForm.new.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        setSaving(true);
        const { error } = await supabase.auth.updateUser({
            password: passwordForm.new
        });

        if (error) {
            toast.error('Erro ao alterar senha: ' + error.message);
        } else {
            toast.success('Senha alterada com sucesso');
            setPasswordForm({ current: '', new: '', confirm: '' });
        }
        setSaving(false);
    };

    const tabs = [
        { id: 'profile', label: 'Meu Perfil', icon: User },
        { id: 'site', label: 'Site', icon: Globe },
        { id: 'contacts', label: 'Contatos', icon: Phone },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Shield }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-imi-900 font-display">Configurações</h1>
                <p className="text-imi-500 mt-1">Gerencie as configurações do sistema e do seu perfil.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:w-64 flex-shrink-0">
                    <nav className="bg-white rounded-2xl shadow-soft border border-imi-50 p-2 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    activeTab === tab.id
                                        ? "bg-imi-900 text-white"
                                        : "text-imi-600 hover:bg-imi-50"
                                )}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl shadow-soft border border-imi-50 p-8">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                <User size={20} />
                                Meu Perfil
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Nome</label>
                                    <input
                                        type="text"
                                        value={user?.name || ''}
                                        onChange={(e) => setUser(u => u ? { ...u, name: e.target.value } : null)}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        className="w-full rounded-xl border-imi-100 bg-imi-50 text-imi-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Perfil de Acesso</label>
                                    <div className="px-4 py-3 rounded-xl bg-accent-50 border border-accent-200 text-accent-700 font-bold text-sm">
                                        {user?.role === 'ADMIN' ? 'Administrador' : user?.role === 'EDITOR' ? 'Editor' : 'Visualizador'}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-imi-100 flex justify-end">
                                <Button onClick={handleSaveSettings} disabled={saving} className="bg-imi-900 hover:bg-imi-800">
                                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                                    Salvar Alterações
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Site Tab */}
                    {activeTab === 'site' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                <Globe size={20} />
                                Configurações do Site
                            </h2>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Nome do Site</label>
                                    <input
                                        type="text"
                                        value={settings.site_name}
                                        onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Descrição</label>
                                    <textarea
                                        value={settings.site_description}
                                        onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                                        rows={3}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest">Texto do Rodapé</label>
                                    <input
                                        type="text"
                                        value={settings.footer_text}
                                        onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-imi-100 flex justify-end">
                                <Button onClick={handleSaveSettings} disabled={saving} className="bg-imi-900 hover:bg-imi-800">
                                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                                    Salvar Configurações
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Contacts Tab */}
                    {activeTab === 'contacts' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                <Phone size={20} />
                                Informações de Contato
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest flex items-center gap-2">
                                        <Mail size={14} /> Email Principal
                                    </label>
                                    <input
                                        type="email"
                                        value={settings.contact_email}
                                        onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest flex items-center gap-2">
                                        <Phone size={14} /> Telefone
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.contact_phone}
                                        onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest flex items-center gap-2">
                                        <MessageCircle size={14} /> WhatsApp
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.contact_whatsapp}
                                        onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                        placeholder="5583999990000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-imi-900 uppercase tracking-widest flex items-center gap-2">
                                        <Building size={14} /> Endereço
                                    </label>
                                    <input
                                        type="text"
                                        value={settings.address}
                                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                        className="w-full rounded-xl border-imi-100"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="text-sm font-bold text-imi-900 mb-4">Redes Sociais</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-600 flex items-center gap-2">
                                            <Instagram size={14} /> Instagram
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.instagram_url}
                                            onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-600 flex items-center gap-2">
                                            <Linkedin size={14} /> LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            value={settings.linkedin_url}
                                            onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                                            className="w-full rounded-xl border-imi-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-imi-100 flex justify-end">
                                <Button onClick={handleSaveSettings} disabled={saving} className="bg-imi-900 hover:bg-imi-800">
                                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                                    Salvar Contatos
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                <Bell size={20} />
                                Preferências de Notificação
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-imi-50 rounded-xl">
                                    <div>
                                        <p className="font-bold text-imi-900">Notificações de Leads</p>
                                        <p className="text-sm text-imi-500">Receber alerta quando um novo lead for captado</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enable_notifications}
                                            onChange={(e) => setSettings({ ...settings, enable_notifications: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-imi-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-imi-50 rounded-xl">
                                    <div>
                                        <p className="font-bold text-imi-900">Rastreamento de Acessos</p>
                                        <p className="text-sm text-imi-500">Monitorar visualizações de imóveis</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.enable_lead_tracking}
                                            onChange={(e) => setSettings({ ...settings, enable_lead_tracking: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-imi-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-imi-100 flex justify-end">
                                <Button onClick={handleSaveSettings} disabled={saving} className="bg-imi-900 hover:bg-imi-800">
                                    {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                                    Salvar Preferências
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Security Tab */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-imi-900 flex items-center gap-2">
                                <Shield size={20} />
                                Segurança
                            </h2>

                            <div className="p-6 bg-imi-50 rounded-2xl border border-imi-100">
                                <h3 className="font-bold text-imi-900 mb-4 flex items-center gap-2">
                                    <Key size={16} />
                                    Alterar Senha
                                </h3>
                                <div className="space-y-4 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-600">Senha Atual</label>
                                        <input
                                            type="password"
                                            value={passwordForm.current}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                            className="w-full rounded-xl border-imi-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-600">Nova Senha</label>
                                        <input
                                            type="password"
                                            value={passwordForm.new}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                            className="w-full rounded-xl border-imi-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-imi-600">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirm}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                            className="w-full rounded-xl border-imi-200"
                                        />
                                    </div>
                                    <Button onClick={handleChangePassword} disabled={saving} className="bg-imi-900 hover:bg-imi-800">
                                        {saving ? <Loader2 className="animate-spin mr-2" size={18} /> : <Check size={18} className="mr-2" />}
                                        Alterar Senha
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                                <h3 className="font-bold text-red-700 mb-2">Zona de Perigo</h3>
                                <p className="text-sm text-red-600 mb-4">Ações irreversíveis que afetam sua conta.</p>
                                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
                                    Encerrar Sessão em Todos os Dispositivos
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
