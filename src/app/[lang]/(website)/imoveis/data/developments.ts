
import { Development, DevelopmentStatus as DevStatusType } from '../types/development';

export const developments: Development[] = [
    // --- PARAÍBA (PB) ---
    // 1. SETAI BEACH RESORT & RESIDENCE
    {
        id: 'dev-pb-001',
        slug: 'setai-beach-resort',
        name: 'Setai Beach Resort & Residence',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Ponta de Campina',
            city: 'Cabedelo',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0531, lng: -34.8361 },
            address: 'Av. Oceano Atlântico, 288 - Ponta de Campina, Cabedelo/PB'
        },
        deliveryDate: 'Dezembro 2026',
        registrationNumber: 'R-02-30.697',
        description: 'Primeiro Resort & Residence do Estado da Paraíba, localizado na área urbana mais valorizada da região metropolitana. Paraíso das águas turmalinas e cristalinas com corais, próximo à famosa Ilha de Areia Vermelha. Empreendimento com mais de 22 mil m² construídos.',
        shortDescription: 'Primeiro Resort & Residence do Estado, frente mar com águas turmalinas.',
        features: ['Pé na areia', 'Resort 5 estrelas', '4 torres independentes', 'Mall integrado'],
        specs: { bedroomsRange: '1-4', areaRange: '29-370m²' },
        priceRange: { min: 815000, max: 6068412 },
        images: {
            main: '/images/developments/setai-beach-resort.jpg',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['frente-mar', 'resort', 'luxo'],
        order: 1,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 2. SETAI BY PININFARINA
    {
        id: 'dev-pb-002',
        slug: 'setai-pininfarina',
        name: 'Setai by Pininfarina',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Altiplano Cabo Branco',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.1280, lng: -34.8050 }
        },
        deliveryDate: 'Junho 2029',
        registrationNumber: 'R-6-125.933',
        description: 'Colaboração exclusiva com a Pininfarina, marca centenária italiana referência mundial em design de altíssimo padrão.',
        shortDescription: 'Design Pininfarina. Exclusividade internacional em João Pessoa.',
        features: ['Design by Pininfarina', '3 torres independentes', 'Vista definitiva'],
        specs: { bedroomsRange: '1-4', areaRange: '27-302m²' },
        priceRange: { min: 635283, max: 6540344 },
        images: {
            main: '/images/developments/setai-pininfarina.jpg',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['luxo', 'pininfarina', 'design'],
        order: 2,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 3. SETAI CASAS VERTICAIS
    {
        id: 'dev-pb-003',
        slug: 'setai-casas-verticais',
        name: 'Setai Casas Verticais',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Tambaú',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.1150, lng: -34.8230 }
        },
        description: 'Conceito inovador de casas suspensas com a exclusividade e segurança de um edifício vertical. Localização premium em Tambaú.',
        shortDescription: 'Casas suspensas em Tambaú. Exclusividade e sofisticação.',
        features: ['Casas suspensas', 'Localização premium', 'Design autoral'],
        specs: { bedroomsRange: '3-4', areaRange: '48-120m²' },
        priceRange: { min: 900000, max: 2500000 },
        images: {
            main: '/images/developments/setai-casas-verticais.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['luxo', 'inovação'],
        order: 3,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 4. SETAI AQUAMARIS
    {
        id: 'dev-pb-004',
        slug: 'setai-aquamaris',
        name: 'Setai Aquamaris',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Jardim Oceania',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0950, lng: -34.8320 }
        },
        description: 'Design inspirado na experiência marítima, trazendo o lifestyle costeiro para o Jardim Oceania. Unidades compactas e funcionais.',
        shortDescription: 'Lifestyle marítimo no Jardim Oceania. Unidades compactas e modernas.',
        features: ['Design náutico', 'Compactos de luxo', 'Área de lazer rooftop'],
        specs: { bedroomsRange: '1', areaRange: '16-62m²' },
        priceRange: { min: 350000, max: 950000 },
        images: {
            main: '/images/developments/setai-aquamaris.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['investimento', 'compacto'],
        order: 4,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 5. SETAI AURUS
    {
        id: 'dev-pb-005',
        slug: 'setai-aurus',
        name: 'Setai Aurus',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Areia Dourada',
            city: 'Cabedelo',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0560, lng: -34.8350 }
        },
        description: 'Inspirado no ouro e na areia dourada de Cabedelo. Empreendimento diferenciado com unidades amplas e vista mar.',
        shortDescription: 'Inspirado no ouro. Localização privilegiada em Areia Dourada.',
        features: ['Frente mar', 'Acabamento premium', 'Unidades amplas'],
        specs: { bedroomsRange: '2-4', areaRange: '69-230m²' },
        priceRange: { min: 1665507, max: 7564704 },
        images: {
            main: '/images/developments/setai-aurus.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['frente-mar', 'luxo'],
        order: 5,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 6. ALLIANCE AURA
    {
        id: 'dev-pb-006',
        slug: 'alliance-aura',
        name: 'Alliance Aura',
        developer: 'Alliance',
        developerLogo: '/images/logos/alliance.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Altiplano',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.1250, lng: -34.8100 }
        },
        description: 'O novo marco do Altiplano. Arquitetura contemporânea e apartamentos com vistas panorâmicas definitivas.',
        shortDescription: 'Alto padrão no Altiplano. Vistas panorâmicas definitivas.',
        features: ['Vista definitiva', 'Lazer completo', 'Acabamento Alliance'],
        specs: { bedroomsRange: '3-4', areaRange: '120-200m²' },
        priceRange: { min: 1200000, max: 3500000 },
        images: {
            main: '/images/developments/alliance-aura.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['alto-padrao', 'familia'],
        order: 6,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },

    // --- PERNAMBUCO (PE) ---
    // 7. RIO AVE RAÍZES
    {
        id: 'dev-pe-001',
        slug: 'rio-ave-raizes',
        name: 'Raízes',
        developer: 'Rio Ave',
        developerLogo: '/images/logos/rioave.png',
        status: 'launch',
        region: 'pernambuco',
        location: {
            neighborhood: 'Boa Vista',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.0580, lng: -34.8950 }
        },
        description: 'Projeto icônico sem muros, integrando a cidade com mall e áreas verdes. Localizado no centro estratégico do Recife.',
        shortDescription: 'Uso misto, sem muros, áreas verdes. O novo centro do Recife.',
        features: ['Gentileza urbana', 'Mall integrado', 'Sustentabilidade'],
        specs: { bedroomsRange: '1-3', areaRange: '50-196m²' },
        priceRange: { min: 650000, max: 2200000 },
        images: {
            main: '/images/developments/rio-ave-raizes.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['inovação', 'urbano'],
        order: 7,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 8. RIO AVE VIVANT RESIDENCE
    {
        id: 'dev-pe-002',
        slug: 'rio-ave-vivant',
        name: 'Vivant Residence',
        developer: 'Rio Ave',
        developerLogo: '/images/logos/rioave.png',
        status: 'launch',
        region: 'pernambuco',
        location: {
            neighborhood: 'Boa Viagem',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.1120, lng: -34.8910 }
        },
        description: 'Retrofit de hotel transformado em residencial com serviços, trazendo praticidade e localização nobre em Boa Viagem.',
        shortDescription: 'Retrofit em Boa Viagem. Residencial com serviços.',
        features: ['Retrofit', 'Serviços pay-per-use', 'Localização Boa Viagem'],
        specs: { bedroomsRange: '1-2', areaRange: '35-70m²' },
        priceRange: { min: 450000, max: 950000 },
        images: {
            main: '/images/developments/rio-ave-vivant.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['investimento', 'retrofit'],
        order: 8,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 9. MOURA DUBEUX CAIS AVENIDA
    {
        id: 'dev-pe-003',
        slug: 'moura-dubeux-cais-avenida',
        name: 'Cais Avenida',
        developer: 'Moura Dubeux',
        developerLogo: '/images/logos/mouradubeux.svg',
        status: 'launch',
        region: 'pernambuco',
        location: {
            neighborhood: 'Cais Estelita',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.0680, lng: -34.8820 }
        },
        description: 'Projeto âncora na revitalização do Cais Estelita. Alto padrão com vistas cinematográficas para a bacia do Pina.',
        shortDescription: 'Referência no Cais Estelita. Alto padrão com vista mar.',
        features: ['Vista panorâmica', 'Revitalização urbana', 'Alto luxo'],
        specs: { bedroomsRange: '3-4', areaRange: '118-335m²' },
        priceRange: { min: 1500000, max: 5500000 },
        images: {
            main: '/images/developments/moura-dubeux-cais-avenida.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['luxo', 'vista-mar'],
        order: 9,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 10. INFINITY RECIFE
    {
        id: 'dev-pe-004',
        slug: 'infinity-recife',
        name: 'Infinity Recife',
        developer: 'Moura Dubeux',
        developerLogo: '/images/logos/mouradubeux.svg',
        status: 'launch',
        region: 'pernambuco',
        location: {
            neighborhood: 'Boa Viagem',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.1250, lng: -34.9000 }
        },
        description: 'Empreendimento moderno e versátil em Boa Viagem, ideal para investimento ou moradia compacta.',
        shortDescription: 'Modernidade em Boa Viagem. Unidades de 26 a 97m².',
        features: ['Rooftop', 'Coworking', 'Lavanderia'],
        specs: { bedroomsRange: '1-2', areaRange: '26-97m²' },
        priceRange: { min: 380000, max: 1200000 },
        images: {
            main: '/images/developments/infinity-recife.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['investimento', 'compacto'],
        order: 10,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },

    // --- SÃO PAULO (SP) ---
    // 11. CAPRI LIFESTYLE BY DOLCE & GABBANA
    {
        id: 'dev-sp-001',
        slug: 'capri-dolce-gabbana',
        name: 'Capri Lifestyle by Dolce & Gabbana',
        developer: 'Cyrela',
        developerLogo: '/images/logos/cyrela.svg',
        status: 'launch',
        region: 'sao-paulo',
        location: {
            neighborhood: 'Jardim Europa',
            city: 'São Paulo',
            state: 'SP',
            region: 'sao-paulo',
            coordinates: { lat: -23.5750, lng: -46.6800 }
        },
        description: 'A união da Cyrela com o ícone da moda italiana. Um projeto único no Jardim Europa com design assinado e exclusividade absoluta.',
        shortDescription: 'Assinado por Dolce & Gabbana. Luxo absoluto no Jardim Europa.',
        features: ['Design Dolce & Gabbana', 'Jardim Europa', 'Exclusividade global'],
        specs: { bedroomsRange: '4', areaRange: '300-600m²' },
        priceRange: { min: 15000000, max: 45000000 },
        images: {
            main: '/images/developments/capri-dolce-gabbana.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['ultra-luxo', 'design-internacional'],
        order: 11,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 12. ZEN CYRELA BY YOO
    {
        id: 'dev-sp-002',
        slug: 'zen-cyrela-by-yoo',
        name: 'Zen Cyrela by Yoo',
        developer: 'Cyrela',
        developerLogo: '/images/logos/cyrela.svg',
        status: 'launch',
        region: 'sao-paulo',
        location: {
            neighborhood: 'Ibirapuera',
            city: 'São Paulo',
            state: 'SP',
            region: 'sao-paulo',
            coordinates: { lat: -23.5850, lng: -46.6600 }
        },
        description: 'O encontro da serenidade com o design Yoo Studio. Ao lado do Parque Ibirapuera, um refúgio urbano de alto padrão.',
        shortDescription: 'Design Yoo Studio. Ao lado do Ibirapuera.',
        features: ['Design Yoo', 'Vista parque', 'Wellness'],
        specs: { bedroomsRange: '3-4', areaRange: '150-250m²' },
        priceRange: { min: 4500000, max: 9000000 },
        images: {
            main: '/images/developments/zen-cyrela-yoo.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['luxo', 'ibirapuera'],
        order: 12,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 13. ESCAPE EDEN BROOKLIN
    {
        id: 'dev-sp-003',
        slug: 'escape-eden-brooklin',
        name: 'Escape Eden Brooklin',
        developer: 'Cyrela',
        developerLogo: '/images/logos/cyrela.svg',
        status: 'launch',
        region: 'sao-paulo',
        location: {
            neighborhood: 'Brooklin',
            city: 'São Paulo',
            state: 'SP',
            region: 'sao-paulo',
            coordinates: { lat: -23.6100, lng: -46.6900 }
        },
        description: 'Um oásis urbano no coração do Brooklin. Projeto com parque privativo e múltiplas opções de plantas, do studio ao family home.',
        shortDescription: 'Parque privativo no Brooklin. Studios a 3 dormitórios.',
        features: ['Parque privativo', 'Mobilidade', 'Lazer resort'],
        specs: { bedroomsRange: '1-3', areaRange: '25-120m²' },
        priceRange: { min: 450000, max: 2200000 },
        images: {
            main: '/images/developments/escape-eden-brooklin.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['investimento', 'familia', 'parque'],
        order: 13,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },

    // --- DUBAI (UAE) ---
    // 14. DAMAC LAGOONS
    {
        id: 'dev-dubai-001',
        slug: 'damac-lagoons-dubai',
        name: 'DAMAC Lagoons',
        developer: 'DAMAC Properties',
        developerLogo: '/images/logos/damac.png',
        status: 'launch',
        region: 'internacional',
        location: {
            neighborhood: 'Dubai Land',
            city: 'Dubai',
            state: 'Dubai',
            region: 'internacional',
            country: 'Emirados Árabes Unidos',
            coordinates: { lat: 25.0420, lng: 55.2090 }
        },
        deliveryDate: 'Q4 2025',
        description: 'Comunidade residencial inspirada em destinos mediterrâneos, com lagoas cristalinas, praias artificiais e estilo de vida resort. Localizado estrategicamente em Dubai Land, próximo a Al Qudra Road. Projeto com villas e townhouses de 3 a 6 quartos, design contemporâneo e acabamentos de luxo.',
        shortDescription: 'Lagoas cristalinas e lifestyle resort no coração de Dubai.',
        features: ['Lagoas cristalinas', 'Praias artificiais', 'Clubhouse exclusivo', 'Segurança 24h', 'Smart home'],
        specs: { bedroomsRange: '3-6', areaRange: '185-465m²' },
        priceRange: { min: 3500000, max: 12000000 },
        images: {
            main: '/images/developments/damac-lagoons-dubai.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['internacional', 'dubai', 'resort', 'villas'],
        order: 14,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 15. DAMAC HILLS 2
    {
        id: 'dev-dubai-002',
        slug: 'damac-hills-2-dubai',
        name: 'DAMAC Hills 2',
        developer: 'DAMAC Properties',
        developerLogo: '/images/logos/damac.png',
        status: 'ready',
        region: 'internacional',
        location: {
            neighborhood: 'Dubai Land',
            city: 'Dubai',
            state: 'Dubai',
            region: 'internacional',
            country: 'Emirados Árabes Unidos',
            coordinates: { lat: 25.0580, lng: 55.2150 }
        },
        deliveryDate: 'Pronto para morar',
        description: 'Comunidade master-planned com mais de 18 milhões de m², oferecendo townhouses e apartamentos em ambiente verde e sustentável. Infraestrutura completa com escolas, clínicas, retail e áreas de lazer. Ideal para famílias que buscam qualidade de vida com ROI atrativo.',
        shortDescription: 'Comunidade sustentável pronta para morar. ROI de 6-8% ao ano.',
        features: ['Pronto para morar', 'Comunidade fechada', 'Parques e trilhas', 'Retail integrado', 'Pet-friendly'],
        specs: { bedroomsRange: '1-4', areaRange: '55-280m²' },
        priceRange: { min: 1800000, max: 8500000 },
        images: {
            main: '/images/developments/damac-hills-2.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['internacional', 'dubai', 'pronto', 'investimento'],
        order: 15,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },

    // --- ESTADOS UNIDOS (USA) ---
    // 16. KEMPINSKI RESIDENCES PALM JUMEIRAH (Dubai, mas marca internacional)
    {
        id: 'dev-usa-001',
        slug: 'kempinski-residences-miami',
        name: 'Kempinski Hotel \u0026 Residences',
        developer: 'Kempinski Hotels',
        developerLogo: '/images/logos/kempinski.svg',
        status: 'launch',
        region: 'internacional',
        location: {
            neighborhood: 'Brickell',
            city: 'Miami',
            state: 'Florida',
            region: 'internacional',
            country: 'Estados Unidos',
            coordinates: { lat: 25.7617, lng: -80.1918 }
        },
        deliveryDate: 'Q2 2027',
        description: 'Primeiro projeto Kempinski nas Américas, trazendo a excelência europeia de hospitalidade para Miami. Residências com serviços de hotel 5 estrelas, localização premium em Brickell com vista para Biscayne Bay. Unidades de 1 a 4 quartos com acabamentos Fendi Casa e tecnologia smart home.',
        shortDescription: 'Excelência europeia em Miami. Residências com serviços de hotel.',
        features: ['Serviços Kempinski', 'Acabamento Fendi Casa', 'Rooftop infinity pool', 'Spa \u0026 Wellness', 'Concierge 24h'],
        specs: { bedroomsRange: '1-4', areaRange: '75-350m²' },
        priceRange: { min: 4200000, max: 18000000 },
        images: {
            main: '/images/developments/kempinski-miami.png',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['internacional', 'miami', 'hotel-residences', 'ultra-luxo'],
        order: 16,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 17. KEMPINSKI RESIDENCES ORLANDO
    {
        id: 'dev-usa-002',
        slug: 'kempinski-residences-orlando',
        name: 'Kempinski Residences Orlando',
        developer: 'Kempinski Hotels',
        developerLogo: '/images/logos/kempinski.svg',
        status: 'launch',
        region: 'internacional',
        location: {
            neighborhood: 'Lake Buena Vista',
            city: 'Orlando',
            state: 'Florida',
            region: 'internacional',
            country: 'Estados Unidos',
            coordinates: { lat: 28.3852, lng: -81.5639 }
        },
        deliveryDate: 'Q4 2026',
        description: 'Residências de luxo próximas aos parques temáticos, ideal para investimento em aluguel de temporada. Gestão hoteleira Kempinski garante ocupação e rentabilidade. Unidades totalmente mobiliadas e decoradas, prontas para gerar renda imediata.',
        shortDescription: 'Investimento em Orlando. ROI de 8-12% com gestão hoteleira.',
        features: ['Gestão hoteleira', 'Mobiliado e decorado', 'Próximo aos parques', 'Pool deck', 'Rental program'],
        specs: { bedroomsRange: '2-3', areaRange: '95-180m²' },
        priceRange: { min: 2800000, max: 6500000 },
        images: {
            main: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop',
            gallery: ["/images/developments/generic-lobby.png","/images/developments/generic-amenities.png"],
            videos: [],
            floorPlans: ["/images/floorplans/plan-1bed.svg","/images/floorplans/plan-2bed.svg","/images/floorplans/plan-3bed.svg"]
        },
        units: [],
        tags: ['internacional', 'orlando', 'investimento', 'rental'],
        order: 17,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export function formatBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });
}

export function formatArea(area: number): string {
    return `${area.toFixed(2)}m²`;
}

export function getDevelopmentsByStatus(status: DevStatusType): Development[] {
    return developments.filter(dev => dev.status === status);
}

export function getDevelopmentBySlug(slug: string): Development | undefined {
    return developments.find(dev => dev.slug === slug);
}
