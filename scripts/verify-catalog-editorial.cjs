const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const data = require(path.join(root, 'app/catalogo/catalog-assets.json'));
const failures = [];
const seen = new Set();
const contentHashes = new Map();
const allowedSourceDuplicates = new Set([
  [
    '/catalogo/editorial/dekton/pagina-017-amostra-03.webp',
    '/catalogo/editorial/dekton/pagina-018-amostra-03.webp',
  ].sort().join('|'),
]);
const expectedNames = new Map(Object.entries({
  '/catalogo/editorial/compacstones/pagina-046-amostra-07.webp': 'Snowstorm Premium',
  '/catalogo/editorial/onix/pagina-049-amostra-07.webp': 'Ônix Sunset',
  '/catalogo/editorial/onix/pagina-049-amostra-08.webp': 'Ônix Super White',
  '/catalogo/editorial/marmores/pagina-056-amostra-01.webp': 'Dark Maze',
  '/catalogo/editorial/marmores/pagina-056-amostra-02.webp': 'Reale',
  '/catalogo/editorial/marmores/pagina-056-amostra-03.webp': 'Cremo Delicato',
  '/catalogo/editorial/marmores/pagina-056-amostra-04.webp': 'Crema M. Standard',
  '/catalogo/editorial/marmores/pagina-057-amostra-01.webp': 'Carrara',
  '/catalogo/editorial/marmores/pagina-057-amostra-02.webp': 'Catacatta Venato',
  '/catalogo/editorial/marmores/pagina-057-amostra-03.webp': 'Calacatta Ouro',
  '/catalogo/editorial/marmores/pagina-057-amostra-04.webp': 'Calacatta Mielli',
  '/catalogo/editorial/marmores/pagina-059-amostra-06.webp': 'Bardiglio',
  '/catalogo/editorial/marmores/pagina-059-amostra-07.webp': 'Athens Wood',
  '/catalogo/editorial/marmores/pagina-059-amostra-08.webp': 'Ariston Extra',
  '/catalogo/editorial/marmores/pagina-060-amostra-01.webp': 'Vicenzo',
  '/catalogo/editorial/marmores/pagina-060-amostra-02.webp': 'San Pellegrino',
  '/catalogo/editorial/marmores/pagina-060-amostra-05.webp': 'Nero',
  '/catalogo/editorial/marmores/pagina-060-amostra-06.webp': 'Mystery White',
  '/catalogo/editorial/marmores/pagina-060-amostra-07.webp': 'Paraná Mil. Macchiato',
  '/catalogo/editorial/marmores/pagina-060-amostra-08.webp': 'Paraná Mil. Classic',
  '/catalogo/editorial/marmores/pagina-061-amostra-07.webp': 'Calatta Botticelli',
  '/catalogo/editorial/marmores/pagina-061-amostra-08.webp': 'Travertino',
  '/catalogo/editorial/limestones/pagina-064-amostra-01.webp': 'Travertino Ocean Grey',
  '/catalogo/editorial/limestones/pagina-064-amostra-02.webp': 'Limestone Valverde',
  '/catalogo/editorial/limestones/pagina-064-amostra-03.webp': 'Limestone Royale',
  '/catalogo/editorial/infinity/pagina-066-amostra-05.webp': 'Holos',
  '/catalogo/editorial/infinity/pagina-066-amostra-06.webp': 'Tundra Selec MB13',
  '/catalogo/editorial/infinity/pagina-066-amostra-07.webp': 'Travertino Bianco SE13',
  '/catalogo/editorial/infinity/pagina-066-amostra-08.webp': 'Travertino Chiaro SE09',
}));
let assetCount = 0;

for (const [category, assets] of Object.entries(data)) {
  if (!assets.length) failures.push(`Categoria sem imagens: ${category}`);

  for (const asset of assets) {
    assetCount += 1;
    const absolutePath = path.join(root, 'public', asset.src.replace(/^\//, ''));
    if (!fs.existsSync(absolutePath)) failures.push(`Imagem ausente: ${asset.src}`);
    if (seen.has(asset.src)) failures.push(`Imagem duplicada no manifesto: ${asset.src}`);
    seen.add(asset.src);
    if (fs.existsSync(absolutePath)) {
      const hash = crypto.createHash('sha256').update(fs.readFileSync(absolutePath)).digest('hex');
      if (contentHashes.has(hash)) {
        const pair = [contentHashes.get(hash), asset.src].sort().join('|');
        if (!allowedSourceDuplicates.has(pair)) failures.push(`Duplicate image content: ${pair}`);
      } else {
        contentHashes.set(hash, asset.src);
      }
    }
    if (!asset.name) failures.push(`Imagem sem nome explícito: ${asset.src}`);
    if (expectedNames.has(asset.src) && expectedNames.get(asset.src) !== asset.name) {
      failures.push(`Nome divergente do PDF: ${asset.src} (${asset.name})`);
    }
  }
}

const publicCatalog = path.join(root, 'public/catalogo');
const legacyDirectories = fs
  .readdirSync(publicCatalog, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'editorial');

if (legacyDirectories.length) {
  failures.push(`Pastas antigas de pranchas encontradas: ${legacyDirectories.map(({ name }) => name).join(', ')}`);
}

if (failures.length) {
  console.error('Falha na verificação do catálogo editorial:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Catálogo editorial confirmado: ${Object.keys(data).length} categorias e ${assetCount} imagens.`);
