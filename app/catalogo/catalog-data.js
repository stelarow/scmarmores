import catalogAssets from './catalog-assets.json';

const pageNames = {
  4: ['Bronze Rivers', 'Persian White', 'Siberian', 'Linen Cream', 'Motion Grey', 'Blanc Elysee'],
  5: ['Chateau Brown', 'Eclectic Pearl', 'Romantic Ash', 'Bohemian Flame', 'Victorian Silver', 'Versailles Ivory'],
  6: ['Victorian Silver', 'Ffrom02', 'Ffrom03', 'Raw D', 'Raw G', 'Raw A'],
  7: ['Concrete Pulse', 'Cinder Craze', 'Brass Relish', 'Ethereal Dusk', 'Ethereal Glow', 'Ethereal Noctis'],
  8: ['Posidonia Green', 'Faro White', 'Poblenou', 'Seaport', 'Nolita', 'Miami Vena'],
  9: ['Desert Silver', 'Night Tebas18', 'Pearl Jasmine', 'Charcoal Soapstone', 'Et Marquina', 'Et Statuario'],
  10: ['Et Calacatta Gold', 'Coral Clay Colour', 'Blanco Norte14', 'White Storm14', 'Rougui', 'Stellar Blanco13'],
  11: ['Arden Blue', 'Yukon', 'White Zeus', 'Gris Expo', 'Stellar Night'],
  13: ['Polar', 'Sandick', 'Adia', 'Trevi', 'Nebu', 'Ava'],
  14: ['Zentum', 'Moone', 'Sirius', 'Domoos', 'Zenith', 'Grigio'],
  15: ['Marmorio', 'Nebbia', 'Grafite', 'Sabbia', 'Ceppo', 'Avorio'],
  16: ['Salina', 'Marina', 'Malibu', 'Argentium', 'Umber', 'Albarium'],
  17: ['Morpheus', 'Neural', 'Awake', 'Daze', 'Somnia', 'Vigil'],
  18: ['Lucid', 'Trance', 'Reverie', 'Nacre', 'Kovik', 'Aeris'],
  19: ['Eter', 'Uyuni', 'Rem', 'Helena', 'Laurent', 'Khalo'],
  20: ['Rio Branco', 'Bromo', 'Bergen', 'Lunar', 'Kreta', 'Kira'],
  21: ['Soke', 'Laos', 'Taga', 'Arga', 'Opera', 'Natura'],
  22: ['Entzo', 'Trilium', 'Halo', 'Kelya', 'Keon', 'Aura'],
  23: ['Avorio', 'Kairos', 'Danae'],
  25: ['Green Galaxy', 'Red Dragon', 'Vogue', 'Verde Candeias'],
  26: ['Verde Ubatuba', 'Snow Matrix', 'Riviera', 'Branco Fortaleza'],
  27: ['Preto Via Láctea', 'Patagonia', 'Preto Indiano', 'Branco Itaúnas'],
  28: ['Bianco Antico', 'Bahamas White', 'Azul Bahia', 'Branco Dallas'],
  29: ['Marrom Tabaco', 'Preto São Gabriel Escovado', 'Amarelo Ornamental', 'Cinza Andorinha'],
  30: ['Café Imperial', 'Cabernet', 'Branco Siena', 'Preto São Gabriel'],
  34: ['Nebula Grey', 'Astrea', 'Mont Blanc'],
  35: ['Zion', 'Emerald Green', 'Acqua'],
  36: ['Green Valley', 'Red Mirage', 'Cristallo'],
  37: ['Explosion Blue', 'Macaubas Fantasy', 'Perla Santana'],
  38: ['Taj Mahal', 'Sorrento', 'Kalahari'],
  39: ['Pietro', 'Palomino', 'Infinity White'],
  40: ['Ocean Blue', 'Black Tempest', 'Louise Blue'],
  41: ['Madagascar', 'Kiev', 'Nacarado'],
  42: ['Fantasy Blue', 'Ettore', 'Blue Roma'],
  43: ['Botanic', 'Brown', 'White Lux'],
  44: ['Baly Blue', 'Azul Imperial'],
  46: ['Black Led', 'White Led', 'Titanium', 'Steel', 'Star Fish Led', 'Star Fish', 'Snowstorm', 'Silver Led', 'Silver', 'Santorini', 'Sandstorm', 'Sahara'],
  47: ['River Brown', 'Mountain', 'Metallic', 'Jazz White', 'Dust', 'Concrete', 'Carrara White', 'Brown', 'Beach Led', 'Beach', 'Arctic Premium', 'Arctic'],
  49: ['Desert Gold', 'Ônix Sentai', 'Ônix Verde', 'Ônix White Wine', 'Ônix Tanzania', 'Ônix Tiger', 'Ônix Super', 'Ônix Sunset White'],
  50: ['Ônix Snowflakes', 'Ônix Sublime', 'Ônix Orange', 'Ônix Ouro Mel', 'Ônix D Oro', 'Ônix Mare Rosso', 'Ônix Caramelo', 'Ônix Colorato'],
  51: ['Ônix Mare Brown', 'Ônix Burst', 'Ônix Azul', 'Ônix Branco', 'Ônix Âmbar', 'Ônix Arcobaleno', 'Ônix Mare Alabastro'],
  64: ['Limestone Royale', 'Travertino Ocean Grey', 'Limestone Valverde', 'Niwala Yellow', 'Limestone Baccarat'],
  66: ['Calacatta', 'White Macaubas MB28', 'Taj Mahal OC10', 'Hyle', 'Holos MB13', 'Tundra Bianco SE13', 'Travertino Chiaro SE09', 'Skov WD02', 'Statuario Principe MB21', 'Sahara Noir MB10'],
  67: ['Santos OC06', 'Pigalle RE13', 'Panda White SB18', 'Palladium Ivory SE11', 'Metal Silver ME01', 'Magella OC04', 'Iconic Cipollino MB25', 'Ceppo Romano SE12', 'Cammeo OC09', 'Calacatta H MB17', 'Atlantis Grey SE08', 'Andromeda OC08'],
  68: ['Absolute White SC01', 'Absolute Black SC02', 'Pulpis MB08', 'Precious Sodalite MB14', 'Pietra Grey MB09', 'Nero Marquina MB11', 'Metal Dark ME02', 'Metal Corten ME02', 'Concrete Light CE01', 'Concrete Grey CE03', 'Classico Statuario MB03', 'Calacatta Oro MB06'],
  69: ['Calacatta Glory MB07'],
  71: ['Crystal White', 'Allure'],
};

const categoryDefinitions = [
  {
    slug: 'silestones',
    name: 'Silestones',
    eyebrow: 'Desenho controlado',
    statement: 'Superfícies de presença serena para composições precisas.',
    description: 'Uma paleta de tons claros, minerais e profundos para projetos que pedem continuidade visual e desenho consistente.',
  },
  {
    slug: 'dekton',
    name: 'Dekton',
    eyebrow: 'Amplitude de linguagem',
    statement: 'Da materia silenciosa aos contrastes mais marcantes.',
    description: 'Uma seleção ampla de superfícies em diferentes leituras de cor, textura e movimento.',
  },
  {
    slug: 'granitos',
    name: 'Granitos exóticos e clássicos',
    shortName: 'Granitos',
    eyebrow: 'Resistencia natural',
    statement: 'Pedras singulares, escolhidas pelo desenho que entregam ao espaço.',
    description: 'Granitos de expressões variadas, dos fundos uniformes aos desenhos minerais mais raros e marcantes.',
  },
  {
    slug: 'quartzitos',
    name: 'Quartzitos',
    eyebrow: 'Força e expressão',
    statement: 'Veios, cores e profundidades que transformam grandes planos.',
    description: 'Quartzitos selecionados por sua presença natural e pela diversidade de desenhos encontrados em cada pedra.',
  },
  {
    slug: 'compacstones',
    name: 'Compacstones',
    eyebrow: 'Uniformidade mineral',
    statement: 'Uma paleta objetiva para superfícies contínuas.',
    description: 'Cores organizadas para apoiar composições claras, consistentes e tecnicamente bem resolvidas.',
  },
  {
    slug: 'onix',
    name: 'Ônix',
    eyebrow: 'Luz e translucidez',
    statement: 'Matéria que muda de presença conforme a luz atravessa o espaço.',
    description: 'Uma seleção de ônix com desenhos, tonalidades e níveis de translucidez sujeitos a disponibilidade.',
  },
  {
    slug: 'marmores',
    name: 'Mármores nacionais e importados',
    shortName: 'Mármores',
    eyebrow: 'Veios e profundidade',
    statement: 'Mármores para projetos em que cada detalhe precisa ter intenção.',
    description: 'Uma coleção extensa de mármores nacionais e importados, reunindo diferentes tons, veios e presenças.',
  },
  {
    slug: 'limestones',
    name: 'Limestones',
    eyebrow: 'Textura serena',
    statement: 'Tons naturais para arquiteturas de leitura calma.',
    description: 'Limestones e travertinos de aparência contida, selecionados para composições que valorizam textura e continuidade.',
  },
  {
    slug: 'infinity',
    name: 'Infinity',
    eyebrow: 'Planos continuos',
    statement: 'Superfícies desenhadas para ampliar a leitura do ambiente.',
    description: 'Modelos identificados por nome e código para facilitar a orientação durante a especificação do projeto.',
  },
  {
    slug: 'crystal',
    name: 'Crystal',
    eyebrow: 'Brilho mineral',
    statement: 'Clareza e luminosidade como parte da composição.',
    description: 'Uma seleção luminosa apresentada como referência visual para escolhas acompanhadas pela equipe.',
  },
];

const editorialDescription = (category, asset) => {
  if (asset.role === 'feature') {
    return `Referência de aplicação para observar escala, luz e presença de ${category.shortName || category.name.toLowerCase()} no ambiente.`;
  }
  return 'Amostra visual para orientar a primeira seleção. Desenho e tonalidade podem variar entre chapas e lotes.';
};

const enrichAssets = (category) => {
  const pageIndexes = new Map();
  return catalogAssets[category.slug].map((asset, index) => {
    const names = pageNames[asset.page] || [];
    const pageIndex = pageIndexes.get(asset.page) || 0;
    pageIndexes.set(asset.page, pageIndex + 1);
    const nameIndex = asset.role === 'feature' && names.length < 2 ? 0 : Math.max(0, pageIndex - 1);
    return {
      ...asset,
      id: `${category.slug}-${asset.page}-${asset.sequence}`,
      name: names[nameIndex] || (asset.role === 'feature' ? category.statement : `Seleção ${String(index + 1).padStart(2, '0')}`),
      description: editorialDescription(category, asset),
    };
  });
};

export const catalogCategories = categoryDefinitions.map((category) => {
  const assets = enrichAssets(category);
  return {
    ...category,
    assets,
    hero: assets.find((asset) => asset.role === 'feature') || assets[0],
    preview: assets.find((asset) => asset.role === 'sample') || assets[0],
  };
});

export const getCatalogCategory = (slug) => catalogCategories.find((category) => category.slug === slug);
