import { Development, DevelopmentStatus as DevStatusType } from '../types/development';

export const developments: Development[] = [
    // 1. SETAI BEACH RESORT & RESIDENCE
    {
        id: 'dev-001',
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
        description: 'Primeiro Resort & Residence do Estado da Paraíba, localizado na área urbana mais valorizada da região metropolitana. Paraíso das águas turmalinas e cristalinas com corais, próximo à famosa Ilha de Areia Vermelha. Empreendimento com mais de 22 mil m² construídos, projetado pelos renomados arquitetos João Armentano e Leonardo Maia.',
        shortDescription: 'Primeiro Resort & Residence do Estado, frente mar com águas turmalinas e resort 5 estrelas.',
        features: [
            'Pé na areia — frente para o mar',
            '4 torres independentes (Residencial, Norte, Sul, Panorâmica)',
            'Resort 5 estrelas com estrutura completa',
            '5 piscinas incluindo spa',
            'Café de la Musique',
            'Market 24h',
            'Coworking e Wine Bar',
            'Quadra de Beach Tennis',
            'Pub e Garagem Band',
            'Bangalôs e prainha privativa',
            'Rooftop com piscina e espaço gourmet',
            'Academia, crossfit e pilates',
            'Brinquedoteca completa',
            'Restaurantes exclusivos',
            'SPA day e night',
            'Fliperama'
        ],
        specs: {
            bedroomsRange: '1-4',
            areaRange: '29-251m²',
            bathroomsRange: '1-5',
            parkingRange: '1-4'
        },
        priceRange: {
            min: 815000,
            max: 6068412
        },
        images: {
            main: '/images/developments/setai-beach-resort.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/06-area-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/22-Nigth-Spa-scaled.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        videoUrl: undefined,
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-beach-resort-residence',
            galleryUrl: 'https://drive.google.com/drive/folders/1NN9CtZuSwv0dpjmjWcurUdRwptbddS-c'
        },
        units: [
            { id: 'sbr-res-001', unit: '1', type: 'GARDEN', area: 173.71, position: 'NORTE/OESTE', tower: 'RES', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 4012701, status: 'available' },
            { id: 'sbr-res-002', unit: '2', type: 'GARDEN', area: 173.45, position: 'NORTE', tower: 'RES', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 4006695, status: 'available' },
            { id: 'sbr-res-003', unit: '3', type: 'GARDEN', area: 173.88, position: 'NORTE', tower: 'RES', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 4016628, status: 'available' },
            { id: 'sbr-res-102', unit: '102', type: 'APTO', area: 122.43, position: 'NORTE', tower: 'RES', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 2943829.35, status: 'available' },
            { id: 'sbr-res-103', unit: '103', type: 'APTO', area: 122.24, position: 'NORTE', tower: 'RES', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 2939260.80, status: 'available' },
            { id: 'sbr-res-404', unit: '404', type: 'COBERTURA DUPLEX', area: 237.39, position: 'NORTE', tower: 'RES', bedrooms: 4, bathrooms: 4, parkingSpots: 3, totalPrice: 5732968.50, status: 'available' },
            { id: 'sbr-res-411', unit: '411', type: 'APTO/TERRAÇO', area: 196.58, position: 'SUL', tower: 'RES', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 4644202.50, status: 'available' },
            { id: 'sbr-res-501', unit: '501', type: 'COBERTURA DUPLEX', area: 251.28, position: 'NORTE/OESTE', tower: 'RES', bedrooms: 4, bathrooms: 5, parkingSpots: 4, totalPrice: 6068412, status: 'available' },
            { id: 'sbr-res-502', unit: '502', type: 'COBERTURA DUPLEX', area: 240.97, position: 'NORTE', tower: 'RES', bedrooms: 4, bathrooms: 4, parkingSpots: 3, totalPrice: 5819425.50, status: 'available' },
            { id: 'sbr-tn-001', unit: '1', type: 'FLAT', area: 36.05, position: 'NORTE/OESTE', tower: 'N', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 861000, status: 'available' },
            { id: 'sbr-tn-210', unit: '210', type: 'FLAT', area: 29.05, position: 'NORTE', tower: 'N', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 830000, status: 'available' },
            { id: 'sbr-tn-512', unit: '512', type: 'FLAT', area: 29.05, position: 'NORTE', tower: 'N', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 860000, status: 'available' },
            { id: 'sbr-tn-907', unit: '907', type: 'FLAT DUPLEX', area: 55.43, position: 'NORTE', tower: 'N', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 1296665.40, status: 'available' },
            { id: 'sbr-tn-908', unit: '908', type: 'FLAT DUPLEX', area: 55.43, position: 'NORTE', tower: 'N', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 1296665.40, status: 'available' },
            { id: 'sbr-tn-914', unit: '914', type: 'FLAT DUPLEX', area: 80.01, position: 'NORTE', tower: 'N', bedrooms: 2, bathrooms: 2, parkingSpots: 1, totalPrice: 1871661.53, status: 'available' },
            { id: 'sbr-ts-001', unit: '1', type: 'FLAT GARDEN', area: 53.55, position: 'SUL', tower: 'S', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 1274115.15, status: 'available' },
            { id: 'sbr-ts-127', unit: '127', type: 'FLAT', area: 29.05, position: 'SUL', tower: 'S', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 815000, status: 'available' },
            { id: 'sbr-ts-224', unit: '224', type: 'FLAT', area: 29.05, position: 'SUL', tower: 'S', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 830000, status: 'available' },
            { id: 'sbr-ts-427', unit: '427', type: 'FLAT', area: 29.05, position: 'SUL', tower: 'S', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 849000, status: 'available' },
            { id: 'sbr-ts-905', unit: '905', type: 'COBERTURA DUPLEX', area: 58.93, position: 'NORTE', tower: 'S', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 1402121.49, status: 'available' },
            { id: 'sbr-tp-701', unit: '701', type: 'COBERTURA DUPLEX', area: 104.46, position: 'NORTE', tower: 'P', bedrooms: 2, bathrooms: 2, parkingSpots: 1, totalPrice: 2443616.59, status: 'available' }
        ],
        tags: ['frente-mar', 'resort', 'flat', 'luxo', 'destaque'],
        order: 1,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 2. SETAI BY PININFARINA
    {
        id: 'dev-002',
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
        description: 'Colaboração exclusiva com a Pininfarina, marca centenária italiana referência mundial em design de altíssimo padrão. Empreendimento que posiciona a Paraíba no circuito internacional de luxo imobiliário. 3 torres independentes com conceitos distintos: Torre A (luxo supremo 205-302m²), Torre B (alto padrão 76-145m²), Torre C (flats compactos 27-41m²).',
        shortDescription: 'Design Pininfarina. 3 torres independentes, do flat compacto ao luxo supremo. Exclusividade internacional.',
        features: [
            'Design assinado pela Pininfarina (Itália)',
            'Torre A: Unidades de luxo 205-302m² com até 4 vagas',
            'Torre B: Alto padrão 76-145m² com 2-3 vagas',
            'Torre C: Flats 27-41m² com vagas rotativas',
            'Restaurante na base do empreendimento',
            'Acabamentos premium internacional',
            'Localização nobre Altiplano Cabo Branco',
            'Padrão arquitetônico europeu'
        ],
        specs: {
            bedroomsRange: '1-4',
            areaRange: '27-302m²',
            bathroomsRange: '1-4',
            parkingRange: '2-4 (Torre A/B), Rotativo (Torre C)'
        },
        priceRange: {
            min: 635283,
            max: 6540344
        },
        images: {
            main: '/images/developments/setai-pininfarina.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/10/PIN_48_CONDO_A_LOBBY_04-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/05/29-Piscina-Rooftop-Torre-A-1-scaled.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-residences-design-by-pininfarina/'
        },
        units: [
            { id: 'sp-tc-101', unit: 'FLAT 101', type: 'FLAT', area: 41.31, tower: 'C', bedrooms: 1, bathrooms: 1, parkingSpots: 0, totalPrice: 1000983.19, status: 'available' },
            { id: 'sp-tc-104', unit: 'FLAT 104', type: 'FLAT', area: 31.01, tower: 'C', bedrooms: 1, bathrooms: 1, parkingSpots: 0, totalPrice: 730531.40, status: 'available' },
            { id: 'sp-tc-105', unit: 'FLAT 105', type: 'FLAT', area: 33.07, tower: 'C', bedrooms: 1, bathrooms: 1, parkingSpots: 0, totalPrice: 785031.01, status: 'available' },
            { id: 'sp-tc-106', unit: 'FLAT 106', type: 'FLAT', area: 34.13, tower: 'C', bedrooms: 1, bathrooms: 1, parkingSpots: 0, totalPrice: 827004.49, status: 'available' },
            { id: 'sp-tc-107', unit: 'FLAT 107', type: 'FLAT', area: 27.76, tower: 'C', bedrooms: 1, bathrooms: 1, parkingSpots: 0, totalPrice: 635283.33, status: 'available' },
            { id: 'sp-ta-601', unit: '601', type: 'APTO', area: 302.64, tower: 'A', bedrooms: 4, bathrooms: 4, parkingSpots: 4, totalPrice: 5201855.12, status: 'available' },
            { id: 'sp-ta-2001', unit: '2001', type: 'APTO', area: 302.64, tower: 'A', bedrooms: 4, bathrooms: 4, parkingSpots: 4, totalPrice: 6327402.72, status: 'available' },
            { id: 'sp-ta-2701', unit: '2701', type: 'APTO', area: 302.64, tower: 'A', bedrooms: 4, bathrooms: 4, parkingSpots: 4, totalPrice: 6540344.16, status: 'available' },
            { id: 'sp-tb-301', unit: '301', type: 'APTO', area: 145.34, tower: 'B', bedrooms: 3, bathrooms: 3, parkingSpots: 3, totalPrice: 2668994.72, status: 'available' },
            { id: 'sp-tb-303', unit: '303', type: 'APTO', area: 76.63, tower: 'B', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1407218.01, status: 'available' },
            { id: 'sp-tb-3001', unit: '3001', type: 'APTO', area: 145.34, tower: 'B', bedrooms: 3, bathrooms: 3, parkingSpots: 3, totalPrice: 3162178.53, status: 'available' }
        ],
        tags: ['luxo', 'design-internacional', 'pininfarina', 'destaque'],
        order: 2,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 3. HERITAGE ONE
    {
        id: 'dev-003',
        slug: 'heritage-one',
        name: 'Heritage One',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Bessa (Aeroclube)',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0982, lng: -34.8377 },
            address: 'Rua Emanoel Orlando de Figueiredo Lima, Bessa, João Pessoa/PB'
        },
        deliveryDate: 'Junho 2028',
        registrationNumber: 'R-5-119.602',
        description: 'Linha Heritage do Setai Grupo GP. Localização premium no coração do Bessa, uma das regiões mais valorizadas de João Pessoa. Projeto arquitetônico sofisticado com apenas 14 unidades exclusivas de 2 tipologias (91m² e 98m²), todas com 2 vagas.',
        shortDescription: 'Linha Heritage. 14 unidades exclusivas no Bessa. Localização premium e acabamento sofisticado.',
        features: [
            'Apenas 14 unidades (exclusividade)',
            'Localização Bessa (área nobre)',
            '2 tipologias: 91m² e 98m²',
            'Todas as unidades com 2 vagas',
            'Posições nascente norte e sul',
            'Acabamento premium',
            'Linha Heritage (curadoria especial)'
        ],
        specs: {
            bedroomsRange: '2-3',
            areaRange: '91-98m²',
            parkingRange: '2'
        },
        priceRange: {
            min: 1082931,
            max: 1448343
        },
        images: {
            main: 'https://setaigrupogp.com.br/wp-content/uploads/2025/05/02-Fachada-4-scaled.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2024/10/Rectangle-9-1.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2024/10/Rectangle-9-3.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        units: [
            { id: 'ho-401', unit: '401', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1163847.11, status: 'available' },
            { id: 'ho-402', unit: '402', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1082931.01, status: 'available' },
            { id: 'ho-501', unit: '501', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1176778.74, status: 'available' },
            { id: 'ho-602', unit: '602', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1106996.15, status: 'available' },
            { id: 'ho-1101', unit: '1101', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1370753.26, status: 'available' },
            { id: 'ho-1102', unit: '1102', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1275452.08, status: 'available' },
            { id: 'ho-1201', unit: '1201', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1383684.90, status: 'available' },
            { id: 'ho-1202', unit: '1202', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1287484.65, status: 'available' },
            { id: 'ho-1302', unit: '1302', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1299517.22, status: 'available' },
            { id: 'ho-1402', unit: '1402', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1311549.78, status: 'available' },
            { id: 'ho-1501', unit: '1501', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1422479.80, status: 'available' },
            { id: 'ho-1502', unit: '1502', type: 'APTO', area: 91.81, position: 'NASC/SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1323582.35, status: 'available' },
            { id: 'ho-1601', unit: '1601', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1435411.44, status: 'available' },
            { id: 'ho-1701', unit: '1701', type: 'APTO', area: 98.67, position: 'NASC/NORTE', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 1448343.07, status: 'available' }
        ],
        tags: ['heritage', 'bessa', 'exclusivo'],
        order: 3,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 4. SETAI AURUS
    {
        id: 'dev-004',
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
        deliveryDate: 'Junho 2028',
        description: 'Inspirado na cor da areia "dourada" e no próprio ouro, símbolo de valor e exclusividade. Localização privilegiada em Areia Dourada, Cabedelo, próximo à Ilha de Areia Dourada que emerge diariamente sobre o oceano. Empreendimento diferenciado com unidades de 2 e 3 suítes.',
        shortDescription: 'Inspirado no ouro e na areia dourada. Localização privilegiada próximo à ilha que emerge do oceano.',
        features: [
            'Próximo à Ilha de Areia Dourada',
            'Unidades 2 e 3 suítes',
            'Garden exclusivo de 230m²',
            'Frente para o mar',
            'Acabamento dourado premium',
            'Localização Areia Dourada (Cabedelo)'
        ],
        specs: {
            bedroomsRange: '2-3',
            areaRange: '69-230m²',
            parkingRange: '1-2'
        },
        priceRange: {
            min: 1665507,
            max: 7564704
        },
        images: {
            main: 'https://setaigrupogp.com.br/wp-content/uploads/2025/05/setai_aurus_empreendimento-scaled.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/05/09-Gourmet-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/05/21-Piscina-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/05/10-Apartamento-scaled.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-aurus/'
        },
        units: [
            { id: 'sa-g02', unit: 'GARDEN 02', type: 'GARDEN', area: 230.14, position: 'NASC/SUL', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 7564704.72, status: 'available' },
            { id: 'sa-102', unit: '102', type: 'APTO', area: 69.18, position: 'SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 1, totalPrice: 1665507.57, status: 'available' },
            { id: 'sa-401', unit: '401', type: 'APTO', area: 124.93, position: 'SUL', bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 2900270.64, status: 'available' },
            { id: 'sa-402', unit: '402', type: 'APTO', area: 107.927, position: 'SUL', bedrooms: 2, bathrooms: 2, parkingSpots: 1, totalPrice: 2505543.18, status: 'available' }
        ],
        tags: ['frente-mar', 'areia-dourada', 'luxo'],
        order: 4,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 5. SETAI HOUSES RESORT
    {
        id: 'dev-005',
        slug: 'setai-houses',
        name: 'Setai Houses Resort',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Intermares',
            city: 'Cabedelo',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0615, lng: -34.8420 }
        },
        deliveryDate: 'Dezembro 2026',
        registrationNumber: 'R-02-39.466',
        description: 'Primeiro condomínio de casas inspirado em resorts e hotelarias 5 estrelas do Nordeste. Releitura dos melhores projetos dos arquitetos João Armentano, Alex Hanazaki e Leonardo Maia. Aproximadamente 100 casas com padrão resort em localização privilegiada na Praia de Intermares.',
        shortDescription: 'Primeiro condomínio resort de casas do Nordeste. ~100 casas assinadas por João Armentano, Hanazaki e Maia.',
        features: [
            'Primeiro condomínio resort de casas do NE',
            'Projeto João Armentano + Alex Hanazaki + Leonardo Maia',
            '~100 casas exclusivas',
            'Padrão hotelaria 5 estrelas',
            'Praia de Intermares',
            '2 vagas por casa',
            'Área de lazer resort completo'
        ],
        specs: {
            bedroomsRange: '3-4',
            areaRange: '294-365m²',
            parkingRange: '2'
        },
        priceRange: {
            min: 2396613,
            max: 3318908
        },
        images: {
            main: '/images/developments/setai-houses.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/07-Piscina-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/08-Living-scaled.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-houses-resort'
        },
        units: [
            { id: 'sh-006', unit: 'CASA 6', type: 'CASA', area: 314, bedrooms: 4, bathrooms: 3, parkingSpots: 2, totalPrice: 2509164.81, status: 'available' },
            { id: 'sh-057', unit: 'CASA 57', type: 'CASA', area: 304.42, bedrooms: 3, bathrooms: 3, parkingSpots: 2, totalPrice: 2396613.93, status: 'available' },
            { id: 'sh-085', unit: 'CASA 85', type: 'CASA', area: 324.4, bedrooms: 4, bathrooms: 3, parkingSpots: 2, totalPrice: 2509164.81, status: 'available' },
            { id: 'sh-302', unit: 'CASA 302', type: 'CASA', area: 365.53, bedrooms: 4, bathrooms: 4, parkingSpots: 2, totalPrice: 3318908.30, status: 'available' }
        ],
        tags: ['casas', 'resort', 'intermares', 'destaque'],
        order: 5,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 6. SETAI MIRAJ
    {
        id: 'dev-006',
        slug: 'setai-miraj',
        name: 'Setai Miraj',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Jardim Oceania (Bessa)',
            city: 'João Pessoa',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.1015, lng: -34.8300 }
        },
        deliveryDate: 'Dezembro 2026',
        registrationNumber: 'R-3-147.418',
        description: 'THE NEW VISION. Inspiração aerodinâmica do caça francês Mirage, visual leve com aletas em forma de asas e vistas 360º. Design futurista que une elegância e tecnologia em um dos bairros mais procurados de João Pessoa.',
        shortDescription: 'Inspirado no caça Mirage. Design aerodinâmico com aletas e vistas 360º. The New Vision.',
        features: [
            'Inspiração caça francês Mirage',
            'Design aerodinâmico único',
            'Aletas em forma de asas',
            'Vistas 360º',
            'Jardim Oceania (Bessa)',
            '2 tipologias: 76m² e 124m²',
            'Acabamento futurista'
        ],
        specs: {
            bedroomsRange: '2-3',
            areaRange: '76-124m²',
            parkingRange: '2'
        },
        priceRange: {
            min: 1340333,
            max: 2149143
        },
        images: {
            main: 'https://setaigrupogp.com.br/wp-content/uploads/2025/06/01-Fachada.png',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/22-Lazer-privativo.png',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/07-Piscina-Terreo.png',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/05-Lobby.png'
            ],
            videos: [],
            floorPlans: []
        },
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-miraj'
        },
        units: [
            { id: 'sm-301', unit: '301', type: 'APTO', area: 124.42, position: 'NASC/SUL', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 2117186.84, status: 'available' },
            { id: 'sm-303', unit: '303', type: 'APTO', area: 76.64, position: 'NASCENTE', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1340333.36, status: 'available' },
            { id: 'sm-401', unit: '401', type: 'APTO', area: 124.42, position: 'NASC/SUL', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 2122479.81, status: 'available' },
            { id: 'sm-403', unit: '403', type: 'APTO', area: 76.64, position: 'NASCENTE', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1347035.03, status: 'available' },
            { id: 'sm-503', unit: '503', type: 'APTO', area: 76.64, position: 'NASCENTE', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 1353770.20, status: 'available' },
            { id: 'sm-901', unit: '901', type: 'APTO', area: 124.42, position: 'NASC/SUL', bedrooms: 3, bathrooms: 2, parkingSpots: 2, totalPrice: 2149143.79, status: 'available' }
        ],
        tags: ['design-diferenciado', 'mirage', 'bessa'],
        order: 6,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 7. SETAI SAILOR
    {
        id: 'dev-007',
        slug: 'setai-sailor',
        name: 'Setai Sailor',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'launch',
        region: 'paraiba',
        location: {
            neighborhood: 'Praia do Poço',
            city: 'Cabedelo',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.0485, lng: -34.8375 }
        },
        deliveryDate: 'Junho 2028',
        description: 'Inspirado no mundo náutico dos grandes veleiros. 73 unidades compactas de 26m² a 48m², 3 espaços comerciais gastronômicos e rooftop surreal. Conceito náutico exclusivo na Praia do Poço.',
        shortDescription: 'Inspirado nos grandes veleiros. 73 unidades compactas + rooftop surreal. Conceito náutico exclusivo.',
        features: [
            'Conceito náutico veleiros',
            '73 unidades compactas',
            'Rooftop surreal',
            '3 espaços gastronômicos',
            'Praia do Poço',
            'Ideal para investimento',
            'Gardens exclusivos'
        ],
        specs: {
            bedroomsRange: '1-2',
            areaRange: '26-48m²',
            parkingRange: '1'
        },
        priceRange: {
            min: 582247,
            max: 1120084
        },
        images: {
            main: 'https://setaigrupogp.com.br/wp-content/uploads/2025/06/01-Fachada-3-scaled.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/10-Spa-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/09-Pub-scaled.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2025/06/16-Cobertura-scaled.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        externalLinks: {
            officialSite: 'https://setaigrupogp.com.br/setai-sailor'
        },
        units: [
            { id: 'ss-g01', unit: '01 GARDEN', type: 'GARDEN', area: 40.09, position: 'SUL', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 822684.68, status: 'available' },
            { id: 'ss-g02', unit: '02 GARDEN', type: 'GARDEN', area: 48.51, position: 'SUL', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 995471.04, status: 'available' },
            { id: 'ss-408', unit: '408', type: 'FLAT', area: 36.69, position: 'NASCENTE', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 1120084.27, status: 'available' },
            { id: 'ss-214', unit: '214', type: 'FLAT', area: 26.6, position: 'NORTE', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 582247.61, status: 'available' }
        ],
        tags: ['náutico', 'compacto', 'investimento'],
        order: 7,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    // 8. IMÓVEIS PRONTOS
    {
        id: 'dev-008',
        slug: 'imoveis-prontos',
        name: 'Imóveis Prontos — Pronta Entrega',
        developer: 'Setai Grupo GP',
        developerLogo: '/images/logos/setai.png',
        status: 'ready',
        region: 'paraiba',
        location: {
            neighborhood: 'Diversos',
            city: 'João Pessoa / Cabedelo',
            state: 'PB',
            region: 'paraiba',
            coordinates: { lat: -7.1195, lng: -34.8450 }
        },
        description: 'Seleção exclusiva de imóveis prontos para morar da Setai Grupo GP. Unidades disponíveis em empreendimentos consolidados como Setai Yacht, Setai Edition, Setai Aquamaris e Setai Sandro Barros. Oportunidade de entrada imediata sem espera de obra.',
        shortDescription: 'Imóveis prontos para morar. Entrada imediata nos melhores empreendimentos Setai.',
        features: [
            'Pronta entrega',
            'Sem espera de obra',
            'Diversos empreendimentos',
            'Oportunidades únicas',
            'Negociação direta'
        ],
        specs: {
            bedroomsRange: '1-3',
            areaRange: '21-92m²',
            parkingRange: '1-2'
        },
        priceRange: {
            min: 567000,
            max: 2310250
        },
        images: {
            main: 'https://setaigrupogp.com.br/wp-content/uploads/2024/09/Fachada-Yacht.jpg',
            gallery: [
                'https://setaigrupogp.com.br/wp-content/uploads/2024/09/Piscina-Yacht.jpg',
                'https://setaigrupogp.com.br/wp-content/uploads/2024/09/Lobby-Yacht.jpg'
            ],
            videos: [],
            floorPlans: []
        },
        units: [
            { id: 'ready-aq-g01', unit: 'GARDEN 01', type: 'GARDEN', area: 34.5, bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 931500, status: 'available', tower: 'Setai Aquamaris' },
            { id: 'ready-aq-g08', unit: 'GARDEN 08', type: 'GARDEN', area: 21, bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 567000, status: 'available', tower: 'Setai Aquamaris' },
            { id: 'ready-yacht-302', unit: '302', type: 'FLAT', area: 31.34, position: 'NORTE', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 783500, status: 'available', tower: 'Setai Yacht' },
            { id: 'ready-ed-3', unit: '3', type: 'FLAT', area: 30.9, position: 'NORTE', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 782500, status: 'available', tower: 'Setai Edition' },
            { id: 'ready-sb-35', unit: '35', type: 'APTO', area: 92.41, position: 'SUL/OESTE', bedrooms: 2, bathrooms: 2, parkingSpots: 2, totalPrice: 2310250, status: 'available', tower: 'Setai Sandro Barros' },
            { id: 'ready-sb-601', unit: '601', type: 'APTO', area: 24.45, position: 'NORTE', bedrooms: 1, bathrooms: 1, parkingSpots: 1, totalPrice: 599000, status: 'available', tower: 'Setai Sandro Barros' }
        ],
        tags: ['pronta-entrega', 'oportunidade'],
        order: 8,
        isHighlighted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },

    // PERNAMBUCO — Alliance
    {
        id: 'dev-pe-001',
        slug: 'alliance-recife-premium',
        name: 'Alliance Recife Premium',
        developer: 'Alliance',
        developerLogo: '/images/logos/alliance.png',
        status: 'launch' as DevStatusType,
        region: 'pernambuco',
        location: {
            neighborhood: 'Boa Viagem',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.1189, lng: -34.8994 },
        },
        description: 'Empreendimento premium da Alliance em Boa Viagem, Recife. Detalhes em breve.',
        shortDescription: 'Lançamento Alliance em Boa Viagem, Recife.',
        features: ['Localização premium', 'Construtora de referência'],
        specs: { bedroomsRange: '3-4', areaRange: '80-200m²' },
        priceRange: { min: 800000, max: 3000000 },
        images: { main: '', gallery: [], videos: [], floorPlans: [] },
        units: [],
        tags: ['pernambuco', 'luxo'],
        order: 10,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // PERNAMBUCO — Rio Ave
    {
        id: 'dev-pe-002',
        slug: 'rio-ave-recife',
        name: 'Rio Ave Recife',
        developer: 'Rio Ave',
        developerLogo: '/images/logos/rioave.png',
        status: 'launch' as DevStatusType,
        region: 'pernambuco',
        location: {
            neighborhood: 'Recife',
            city: 'Recife',
            state: 'PE',
            region: 'pernambuco',
            coordinates: { lat: -8.0476, lng: -34.8770 },
        },
        description: 'Empreendimento da construtora portuguesa Rio Ave em Recife. Detalhes em breve.',
        shortDescription: 'Lançamento Rio Ave em Recife.',
        features: ['Construtora portuguesa', 'Qualidade europeia'],
        specs: { bedroomsRange: '2-4', areaRange: '60-180m²' },
        priceRange: { min: 600000, max: 2500000 },
        images: { main: '', gallery: [], videos: [], floorPlans: [] },
        units: [],
        tags: ['pernambuco'],
        order: 11,
        isHighlighted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
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
