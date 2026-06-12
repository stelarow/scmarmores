const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const manifest = require('./site-preservation-manifest.json');
const failures = [];

const resolveFile = (relativePath) => path.join(root, relativePath);
const normalizeContent = (relativePath, content) => {
  if (!/\.(?:html|js|jsx|css|json)$/i.test(relativePath)) return content;
  return Buffer.from(content.toString('utf8').replace(/\r\n/g, '\n'));
};
const readFile = (relativePath) => {
  const content = fs.readFileSync(resolveFile(relativePath));
  return normalizeContent(relativePath, content);
};
const hashFile = (relativePath) => {
  const content = readFile(relativePath);
  return crypto.createHash('sha256').update(content).digest('hex');
};

for (const original of manifest.originals) {
  const absolutePath = resolveFile(original.path);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`Arquivo original ausente: ${original.path}`);
    continue;
  }

  const content = readFile(original.path);
  const hash = hashFile(original.path);
  if (content.length !== original.size || hash !== original.sha256) {
    failures.push(`Arquivo original alterado: ${original.path}`);
  }
}

for (const [source, copy] of manifest.copies) {
  if (!fs.existsSync(resolveFile(copy))) {
    failures.push(`Cópia usada pelo Next.js ausente: ${copy}`);
    continue;
  }
  if (hashFile(source) !== hashFile(copy)) {
    failures.push(`Cópia usada pelo Next.js diverge do original: ${copy}`);
  }
}

for (const [source, route] of manifest.routes) {
  const routePath = resolveFile(route);
  if (!fs.existsSync(routePath)) {
    failures.push(`Rota Next.js ausente: ${route}`);
    continue;
  }

  const routeSource = fs.readFileSync(routePath, 'utf8');
  if (!routeSource.includes(`filename="${source}"`)) {
    failures.push(`Rota Next.js não está ligada a ${source}: ${route}`);
  }
}

if (failures.length) {
  console.error('Falha na verificação de preservação do site:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Preservação confirmada: ${manifest.originals.length} originais, ${manifest.copies.length} cópias e ${manifest.routes.length} rotas Next.js.`);
