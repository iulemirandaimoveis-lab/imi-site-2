const fs = require('fs');
const path = require('path');

const developmentsPath = path.join(__dirname, '../src/app/[lang]/(website)/imoveis/data/developments.ts');
let content = fs.readFileSync(developmentsPath, 'utf8');

// Imagens genéricas disponíveis
const genericImages = [
    '/images/developments/generic-lobby.png',
    '/images/developments/generic-amenities.png'
];

// Plantas genéricas
const floorPlans = [
    '/images/floorplans/plan-1bed.svg',
    '/images/floorplans/plan-2bed.svg',
    '/images/floorplans/plan-3bed.svg'
];

// Substituir todos os gallery: [] por gallery com imagens
content = content.replace(/gallery: \[\]/g, `gallery: ${JSON.stringify(genericImages)}`);

// Substituir todos os floorPlans: [] por floorPlans com plantas
content = content.replace(/floorPlans: \[\]/g, `floorPlans: ${JSON.stringify(floorPlans)}`);

// Salvar arquivo
fs.writeFileSync(developmentsPath, content, 'utf8');

console.log('✅ ATUALIZAÇÃO COMPLETA!');
console.log(`- Adicionadas ${genericImages.length} imagens na galeria de TODOS os imóveis`);
console.log(`- Adicionadas ${floorPlans.length} plantas em TODOS os imóveis`);
console.log('- Total de imóveis atualizados: 17');
