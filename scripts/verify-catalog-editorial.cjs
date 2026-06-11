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
