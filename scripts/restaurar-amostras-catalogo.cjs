const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const pdf = path.join(root, 'SC MÁRMORES_CATÁLOGO DE MÁRMORES E GRANITOS_2025.pdf');
const dataPath = path.join(root, 'app/catalogo/catalog-assets.json');
const catalogDataPath = path.join(root, 'app/catalogo/catalog-data.js');
const renderDirectory = path.join(root, '.audit/catalog-pages-150');

const categories = [
  { slug: 'silestones', from: 3, to: 11 }, { slug: 'dekton', from: 12, to: 23 },
  { slug: 'granitos', from: 24, to: 32 }, { slug: 'quartzitos', from: 33, to: 44 },
  { slug: 'compacstones', from: 45, to: 47 }, { slug: 'onix', from: 48, to: 51 },
  { slug: 'marmores', from: 52, to: 62 }, { slug: 'limestones', from: 63, to: 64 },
  { slug: 'infinity', from: 65, to: 69 }, { slug: 'crystal', from: 70, to: 71 },
];

const featureNames = {
  4: 'Bronze Rivers', 5: 'Chateau Brown', 6: 'Raw G', 7: 'Cinder Craze', 8: 'Poblenou',
  9: 'Desert Silver', 10: 'Rougui', 11: 'Arden Blue', 13: 'Polar', 14: 'Grigio',
  15: 'Ceppo', 16: 'Umber', 17: 'Somnia', 18: 'Kovik', 19: 'Khalo', 20: 'Kreta',
  21: 'Laos', 22: 'Trilium', 23: 'Kairos', 24: 'Preto Indiano', 31: 'Branco Itaunas',
  33: 'Nebula Grey', 34: 'Nebula Gray', 35: 'Zion', 36: 'Green Valley',
  37: 'Explosion Blue', 38: 'Taj Mahal', 39: 'Pietro', 40: 'Ocean Blue',
  41: 'Madagascar', 42: 'Fantasy Blue', 43: 'Botanic', 44: 'Baly Blue',
  53: 'Salvatore', 54: 'Persa Fendi', 55: 'Delfos', 56: 'Daino Reale', 57: 'Carrara',
  58: 'Branco Sivec Dove', 59: 'Black and Gold', 60: 'Rafaello',
  61: 'Rosa Espirito Santo', 62: 'Marmore Parana Kronos', 64: 'Limestone Royale',
  66: 'White Macaubas MB28', 67: 'White Macaubas MB28', 68: 'White Macaubas MB28',
};
const coverNames = {
  3: 'Silestones', 12: 'Dekton', 24: 'Granitos', 33: 'Quartzitos',
  45: 'Quartzos', 48: 'Onix', 52: 'Marmores', 63: 'Limestones',
  65: 'Infinity', 70: 'Crystal',
};

const templates = [
  {
    pages: [4, 5, 6, 7, 8, 9, 10, 11],
    positions: [[79, 220, 295, 245], [450, 220, 295, 245], [799, 220, 314, 245], [75, 647, 295, 245], [450, 649, 300, 245], [799, 649, 314, 245]],
  },
  {
    pages: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    positions: [[98, 745, 295, 245], [461, 745, 295, 245], [824, 745, 295, 245], [98, 1223, 295, 245], [449, 1223, 295, 245], [824, 1223, 295, 245]],
  },
  {
    pages: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    positions: [[730, 477, 240, 240], [730, 758, 240, 240], [730, 1020, 240, 240], [730, 1294, 240, 240]],
  },
  {
    pages: [46, 47],
    positions: [[39, 215, 252, 354], [370, 215, 252, 354], [678, 215, 252, 354], [966, 215, 236, 354], [28, 699, 252, 354], [360, 699, 252, 354], [667, 699, 252, 354], [955, 699, 237, 354], [39, 1230, 252, 354], [370, 1230, 252, 354], [678, 1230, 252, 354], [966, 1230, 236, 354]],
  },
  {
    pages: [53, 54, 55, 56, 57, 58, 59, 60, 61, 66, 67, 68],
    positions: [[154, 498, 205, 288], [424, 498, 204, 288], [674, 498, 204, 288], [908, 498, 192, 288], [145, 891, 205, 288], [415, 891, 204, 288], [665, 891, 204, 288], [899, 891, 192, 288], [154, 1321, 205, 288], [414, 1321, 205, 288], [664, 1321, 205, 288], [898, 1321, 192, 288]],
  },
];

const onixPositions = {
  49: [[43, 20, 371, 250], [852, 38, 371, 250], [45, 510, 369, 250], [855, 500, 368, 250], [45, 980, 369, 235], [869, 970, 369, 250], [43, 1400, 371, 220], [876, 1385, 354, 210]],
  50: [[46, 20, 368, 250], [855, 38, 368, 250], [43, 455, 371, 250], [855, 467, 371, 250], [34, 936, 368, 250], [855, 925, 371, 250], [32, 1338, 371, 250], [856, 1340, 367, 250]],
  51: [[19, 30, 368, 250], [852, 53, 371, 250], [23, 485, 367, 250], [852, 500, 368, 250], [23, 982, 370, 250], [848, 955, 372, 250], [848, 1408, 372, 250]],
};
const limestoneSamples = [
  { name: 'Travertino Ocean Grey', position: [48, 490, 340, 480] },
  { name: 'Limestone Valverde', position: [850, 481, 313, 469] },
  { name: 'Limestone Royale', position: [77, 1098, 313, 467] },
  { name: 'Niwala Yellow', position: [449, 852, 340, 480] },
  { name: 'Limestone Baccarat', position: [830, 1074, 356, 503] },
];

function readPageNames() {
  const source = fs.readFileSync(catalogDataPath, 'utf8');
  const start = source.indexOf('const pageNames =');
  const end = source.indexOf('\n\nconst featureNames', start);
  const expression = source.slice(start, end).replace('const pageNames =', '').replace(/;\s*$/, '');
  return vm.runInNewContext(`(${expression})`);
}

function renderPages() {
  fs.mkdirSync(renderDirectory, { recursive: true });
  if (fs.existsSync(path.join(renderDirectory, 'page-71.png'))) return;
  execFileSync('pdftoppm', ['-f', '4', '-l', '71', '-r', '150', '-png', pdf, path.join(renderDirectory, 'page')], { stdio: 'inherit' });
}

function categoryForPage(page) {
  return categories.find(({ from, to }) => page >= from && page <= to).slug;
}

function crop(category, page, index, name, position) {
  const outputDirectory = path.join(root, 'public/catalogo/editorial', category);
  fs.mkdirSync(outputDirectory, { recursive: true });
  const filename = `pagina-${String(page).padStart(3, '0')}-amostra-${String(index + 1).padStart(2, '0')}.webp`;
  const output = path.join(outputDirectory, filename);
  const [x, y, width, height] = position;
  execFileSync('magick', [path.join(renderDirectory, `page-${String(page).padStart(2, '0')}.png`), '-crop', `${width}x${height}+${x}+${y}`, '+repage', '-strip', '-quality', '88', '-define', 'webp:method=6', output]);
  return { src: `/catalogo/editorial/${category}/${filename}`, page, sequence: 101 + index, role: 'sample', name, width, height, source: `PDF pagina ${page}, posicao visual ${index + 1}` };
}

function retainedAssets(oldData, pageNames) {
  const result = Object.fromEntries(categories.map(({ slug }) => [slug, []]));
  for (const [category, assets] of Object.entries(oldData)) {
    for (const asset of assets) {
      let keep = asset.role === 'feature';
      let name = featureNames[asset.page] || coverNames[asset.page];
      if (category === 'onix' && asset.page >= 49) keep = false;
      if (category === 'granitos' && asset.page === 32) keep = false;
      if (category === 'granitos' && asset.page >= 25 && asset.page <= 30) {
        keep = true;
        name = pageNames[asset.page]?.[Math.floor((asset.sequence - 2) / 2)];
      }
      if (category === 'granitos' && asset.page === 31) { keep = true; name = 'Branco Itaunas'; }
      if (category === 'crystal' && asset.page === 71) { keep = true; name = asset.sequence === 2 || asset.sequence === 4 ? 'Crystal White' : 'Allure'; }
      if (category === 'marmores' && asset.page === 62 && asset.sequence >= 3) { keep = true; name = pageNames[62]?.[asset.sequence - 3]; }
      if (category === 'infinity' && asset.page === 69) { keep = true; name = 'Calacatta Glory MB07'; }
      if (category === 'dekton' && asset.page === 23 && asset.sequence >= 4) { keep = true; name = pageNames[23]?.[asset.sequence - 4]; }
      if (category === 'quartzitos' && asset.page === 44 && asset.sequence >= 3) { keep = true; name = asset.sequence === 5 ? 'Azul Macaubas' : pageNames[44]?.[asset.sequence - 3]; }
      if (keep) result[category].push({ ...asset, name: name || asset.name });
    }
  }
  return result;
}

function main() {
  const pageNames = readPageNames();
  const oldData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  renderPages();
  const result = retainedAssets(oldData, pageNames);
  for (const template of templates) {
    for (const page of template.pages) {
      pageNames[page].forEach((name, index) => result[categoryForPage(page)].push(crop(categoryForPage(page), page, index, name, template.positions[index])));
    }
  }
  for (const page of [49, 50, 51]) pageNames[page].forEach((name, index) => result.onix.push(crop('onix', page, index, name, onixPositions[page][index])));
  limestoneSamples.forEach(({ name, position }, index) => {
    result.limestones.push(crop('limestones', 64, index, name, position));
  });
  for (const assets of Object.values(result)) assets.sort((a, b) => a.page - b.page || a.sequence - b.sequence);
  fs.writeFileSync(dataPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log('Amostras restauradas diretamente das posicoes legendadas no PDF.');
}

main();
