export interface ConsultingCity {
    slug: string;
    name: string;
    country: string;
    flag: string; // emoji flag
    tagline: string;
    description: string;
    heroImage: string; // unsplash URL
    investmentProfile: {
        avgYield: string;
        avgPrice: string;
        appreciation: string;
        currency: string;
    };
    services: {
        title: string;
        description: string;
        icon: string; // lucide icon name
    }[];
    advantages: string[];
    taxInfo: string;
    legalStructure: string;
    coordinates: { lat: number; lng: number };
}

export const consultingCities: ConsultingCity[] = [
    {
        slug: 'miami',
        name: 'Miami',
        country: 'Estados Unidos',
        flag: '🇺🇸',
        tagline: 'O hub financeiro da América Latina',
        description: 'Miami combina valorização imobiliária consistente com alta demanda de locação. Mercado maduro, regulação transparente e acesso direto ao sistema financeiro americano. Ideal para quem busca patrimônio em dólar com renda previsível.',
        heroImage: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=1920&q=80',
        investmentProfile: {
            avgYield: '5-7% a.a.',
            avgPrice: 'US$ 350k–1.5M',
            appreciation: '+8-12% a.a.',
            currency: 'USD',
        },
        services: [
            { title: 'Aquisição de Imóveis', description: 'Seleção técnica de ativos em Miami-Dade, Brickell, Sunny Isles e Aventura. Análise de cap rate e potencial de valorização.', icon: 'Building2' },
            { title: 'Abertura de LLC', description: 'Estruturação jurídica via LLC na Flórida para proteção patrimonial e otimização fiscal.', icon: 'Briefcase' },
            { title: 'Financiamento Internacional', description: 'Acesso a crédito bancário americano para estrangeiros com taxas a partir de 7.5% a.a.', icon: 'Banknote' },
            { title: 'Property Management', description: 'Gestão profissional de locação (long-term e short-term rental) com relatórios mensais.', icon: 'Settings' },
        ],
        advantages: [
            'Moeda forte (USD) — proteção cambial',
            'Sistema jurídico transparente e estável',
            'Alta liquidez no mercado imobiliário',
            'Sem imposto estadual de renda na Flórida',
            'Hub de conexão com América Latina',
            'Crescimento populacional constante',
        ],
        taxInfo: 'Flórida não cobra imposto estadual de renda. Property tax médio de 1.5-2% a.a. sobre valor de mercado. Capital gains tax federal de 15-20% para não-residentes.',
        legalStructure: 'LLC (Limited Liability Company) registrada na Flórida. Requer EIN (Employer Identification Number) e conta bancária americana. Processo leva 2-4 semanas.',
        coordinates: { lat: 25.7617, lng: -80.1918 },
    },
    {
        slug: 'dubai',
        name: 'Dubai',
        country: 'Emirados Árabes Unidos',
        flag: '🇦🇪',
        tagline: 'Tax-free e alto luxo no Oriente',
        description: 'Dubai oferece isenção total de impostos sobre renda e ganho de capital. Mercado imobiliário dinâmico com yields superiores à média global. Regulação moderna via RERA e DLD.',
        heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea936a7d40c?w=1920&q=80',
        investmentProfile: {
            avgYield: '6-9% a.a.',
            avgPrice: 'AED 800k–5M',
            appreciation: '+10-18% a.a.',
            currency: 'AED (pegged USD)',
        },
        services: [
            { title: 'Aquisição Freehold', description: 'Compra de propriedade plena em zonas designadas: Downtown, Marina, Palm Jumeirah, Business Bay.', icon: 'Building2' },
            { title: 'Golden Visa', description: 'Investimento mínimo de AED 2M qualifica para visto de residência de 10 anos nos UAE.', icon: 'CreditCard' },
            { title: 'Estrutura Offshore', description: 'Constituição de empresa Free Zone para holding patrimonial com zero tributação.', icon: 'Briefcase' },
            { title: 'Short-Term Rental', description: 'Gestão de Airbnb/Booking com licenciamento DTCM e yields superiores a 8%.', icon: 'Home' },
        ],
        advantages: [
            'Zero imposto de renda',
            'Zero imposto sobre ganho de capital',
            'Golden Visa com investimento imobiliário',
            'AED atrelado ao dólar (estabilidade cambial)',
            'Infraestrutura de classe mundial',
            'Hub entre Europa, Ásia e África',
        ],
        taxInfo: 'Emirados Árabes não cobram imposto de renda pessoal, ganho de capital nem imposto sobre herança. DLD (Dubai Land Department) cobra 4% de transfer fee na compra. Service charges anuais variam por empreendimento.',
        legalStructure: 'Compra direta como pessoa física estrangeira em zonas freehold, ou via empresa Free Zone (JAFZA, DMCC, DIFC). Processo de registro leva 1-2 semanas via DLD.',
        coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    {
        slug: 'orlando',
        name: 'Orlando',
        country: 'Estados Unidos',
        flag: '🇺🇸',
        tagline: 'Capital mundial do turismo familiar',
        description: 'Orlando recebe 75+ milhões de visitantes por ano. Short-term rental com ocupação acima de 80% em regiões próximas aos parques. Preços acessíveis comparados a Miami com yields superiores.',
        heroImage: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=1920&q=80',
        investmentProfile: {
            avgYield: '7-10% a.a.',
            avgPrice: 'US$ 250k–800k',
            appreciation: '+6-9% a.a.',
            currency: 'USD',
        },
        services: [
            { title: 'Vacation Homes', description: 'Casas em resorts licenciados para short-term rental próximas a Disney, Universal e SeaWorld.', icon: 'Home' },
            { title: 'Abertura de LLC', description: 'Estruturação jurídica via LLC na Flórida com EIN e conta bancária americana.', icon: 'Briefcase' },
            { title: 'Revenue Management', description: 'Gestão dinâmica de preços com ferramentas de yield management para maximizar ocupação e receita.', icon: 'TrendingUp' },
            { title: 'Due Diligence', description: 'Análise técnica de imóveis com inspeção, title search e estimativa de NOI.', icon: 'Search' },
        ],
        advantages: [
            'Yield superior a Miami (7-10% vs 5-7%)',
            'Preço de entrada mais baixo',
            'Demanda turística resiliente',
            'Sem imposto estadual de renda',
            'Crescimento populacional acelerado',
            'Mercado de short-term rental consolidado',
        ],
        taxInfo: 'Mesma estrutura fiscal de Miami (Flórida). Tourist Development Tax de 6% sobre receita de locação de curto prazo. Transient Rental Tax adicional em Orange County.',
        legalStructure: 'LLC na Flórida. Requer licença de short-term rental do condado (Orange County para região dos parques). HOA (Homeowners Association) com regras específicas para vacation rental.',
        coordinates: { lat: 28.5383, lng: -81.3792 },
    },
    {
        slug: 'sao-paulo',
        name: 'São Paulo',
        country: 'Brasil',
        flag: '🇧🇷',
        tagline: 'O maior mercado imobiliário da América do Sul',
        description: 'São Paulo concentra o maior PIB do hemisfério sul. Mercado sofisticado com alto potencial de valorização em regiões premium. Ideal para diversificação dentro do mercado brasileiro com ativos de alta liquidez.',
        heroImage: 'https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=1920&q=80',
        investmentProfile: {
            avgYield: '4-6% a.a.',
            avgPrice: 'R$ 500k–5M',
            appreciation: '+8-15% a.a.',
            currency: 'BRL',
        },
        services: [
            { title: 'Aquisição Premium', description: 'Seleção técnica de ativos em Jardins, Itaim Bibi, Vila Nova Conceição, Pinheiros e Faria Lima.', icon: 'Building2' },
            { title: 'Estruturação Patrimonial', description: 'Holdings patrimoniais, planejamento sucessório e proteção de ativos com eficiência fiscal.', icon: 'Briefcase' },
            { title: 'Análise de Viabilidade', description: 'Estudo de mercado com projeção de valorização, análise de vacância e comparativos por bairro.', icon: 'BarChart3' },
            { title: 'Gestão de Locação', description: 'Administração profissional com contratos, cobrança, manutenção e relatórios mensais.', icon: 'Settings' },
        ],
        advantages: [
            'Maior mercado imobiliário da América Latina',
            'Alta liquidez em bairros premium',
            'Infraestrutura financeira sofisticada',
            'Diversificação geográfica dentro do Brasil',
            'Mercado de locação corporativa aquecido',
            'Regulação madura e previsível',
        ],
        taxInfo: 'ITBI de 3% na compra. IPTU anual. IR sobre ganho de capital de 15-22.5% (progressivo). Renda de locação tributada na tabela progressiva do IRPF. Holdings podem otimizar carga tributária.',
        legalStructure: 'Compra direta como PF ou via holding patrimonial (EIRELI, LTDA, ou SCP). Para investidores estrangeiros: CPF obrigatório + procuração se não-residente.',
        coordinates: { lat: -23.5505, lng: -46.6333 },
    },
];

export function getCityBySlug(slug: string): ConsultingCity | undefined {
    return consultingCities.find(c => c.slug === slug);
}
