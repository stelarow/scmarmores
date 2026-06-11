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
  27: ['Preto Via Láctea', 'Patagonia', 'Everest White', 'Cianitus'],
  28: ['Bianco Antico', 'Bahamas White', 'Azul Bahia', 'Branco Dallas'],
  29: ['Marrom Tabaco', 'Preto São Gabriel Escovado', 'Preto São Gabriel Polido', 'Preto Florido'],
  30: ['Café Imperial', 'Cabernet', 'Branco Siena', 'Branco Ceará'],
  31: ['Branco Itaúnas'],
  33: ['Nebula Grey', 'Paleta cheia de diversidades', 'Mais de 30 modelos'],
  34: ['Nebula Gray', 'Astrea', 'Black Jade', 'Paramount'],
  35: ['Zion', 'Da Vinci', 'Avohai', 'Patagonia Cristal'],
  36: ['Green Valley', 'Moulin Rouge', 'Navaho', 'Vitória Régia'],
  37: ['Explosion Blue', 'Caravaggio', 'Terra Lunare', 'Tartaruga'],
  38: ['Taj Mahal', 'Sorrento', 'Roma Imperiale', 'Verde'],
  39: ['Pietro', 'Palomino', 'Otello', 'Octus Green'],
  40: ['Ocean Blue', 'Negresco', 'White Lux', 'Madre Pérola'],
  41: ['Madagascar', 'Kiara', 'Green Sky', 'Gaia'],
  42: ['Fantasy Blue', 'Ettore', 'Eruptio', 'Desert White'],
  43: ['Botanic', 'Brown Wood', 'Desert Grey', 'Blue Roma'],
  44: ['Baly Blue', 'Azul Macaubas'],
  46: ['Black Led', 'White Led', 'Titanium', 'Steel', 'Star Fish Led', 'Star Fish', 'Snowstorm', 'Silver Led', 'Silver', 'Santorini', 'Sandstorm', 'Sahara'],
  47: ['River Brown', 'Mountain', 'Metallic', 'Jazz White', 'Dust', 'Concrete', 'Carrara White', 'Brown', 'Beach Led', 'Beach', 'Arctic Premium', 'Arctic'],
  49: ['Desert Gold', 'Ônix Sentai', 'Ônix Verde', 'Ônix White Wine', 'Ônix Tanzania', 'Ônix Tiger', 'Ônix Super', 'Ônix Sunset White'],
  50: ['Ônix Snowflakes', 'Ônix Sublime', 'Ônix Orange', 'Ônix Ouro Mel', 'Ônix D Oro', 'Ônix Mare Rosso', 'Ônix Caramelo', 'Ônix Colorato'],
  51: ['Ônix Mare Brown', 'Ônix Burst', 'Ônix Azul', 'Ônix Branco', 'Ônix Âmbar', 'Ônix Arcobaleno', 'Ônix Mare Alabastro'],
  53: ['Salvatore', 'Biancatto', 'Petrus', 'Pinot Grigio', 'Griogio Maggiore', 'Mármore Paraná O.', 'White Wood', 'Verde Guatemala', 'Verde Alpi', 'Travertino Yellow', 'Travertino Silver', 'Travertino Romano'],
  54: ['Travertino Noche', 'Travertino Negro', 'Travertino Navona Bruto', 'Stuario', 'Statuarietto', 'Rosso Levanto', 'Root Green', 'Root Brown', 'Portoro White', 'Persa Fendi', 'Oliver Gray', 'Oliver Brown'],
  55: ['Nero Portoro', 'Marmara / Striato', 'Nero Marquina', 'Grigio Carnico', 'Marrom Emperador', 'Carrara Gioia S.', 'Carrara Gioia', 'Crema M. Basic', 'Branco Moura “C”', 'Branco M. Extra', 'Branco Moura “B”', 'Mármore Pegasus'],
  56: ['Dark Maze Delicato', 'Daino Reale Standard', 'Cremo', 'Crema M.', 'Crema M. Seleto', 'Crema M. Extra / Ivory', 'Crema M. Clássico', 'Cintilante', 'Paraná M. Serrat', 'Paraná Kronos', 'Fantasy Gray', 'Branco Moura “A”'],
  57: ['Carrara Venato', 'Catacatta Ouro', 'Calacatta Mielli', 'Calacatta', 'Calacatta Cremo', 'Calacatta', 'Calacatoro', 'Bronze Armane', 'Brescia Oniciata', 'Brescia Auraro', 'Branco Volakas', 'Branco T. Primos'],
  58: ['Branco Sivec Dove', 'Branco Português', 'Branco P. Atena', 'Branco P. Extra', 'Branco Pighes A-3', 'Branco Pighes A-2', 'Branco Pighes A-1', 'Botticino Royal', 'Botticino Nuovo', 'Botticino Clás. Extra', 'Botticino Clássico', 'Black Pr. L. Resina'],
  59: ['Black P. Bruto', 'Black Move Escovado', 'Black Line', 'Black and Gold', 'Bege Supreme', 'Bardiglio Wood', 'Athens Extra', 'Ariston', 'Arabescato Vagil', 'Arabescato Orobico', 'Angel White', 'Accona Reale'],
  60: ['Vicenzo Pellegrino', 'San', 'Rafaello', 'White Panda', 'Nero White', 'Mystery Macchiato', 'Paraná Mil. Classic', 'Paraná Mil.', 'Paraná C. Venatto', 'Paraná C. Supremo', 'Paraná C. Prime', 'Paraná C. Milano'],
  61: ['Paraná C. Dalmacia', 'Paraná C. D’Oro', 'Paraná Calacatta', 'Paraná Arabes.', 'Alba Pietra', 'Donatello', 'Calatta', 'Travertino Botticelli', 'Rosa Esp. Santo', 'Rajado Especial', 'Rajado Comum', 'Rajado Claro'],
  62: ['Pinta Verde Extra', 'Pinta Verde Claro', 'Pinta Verde Comum', 'Mármore Pegasus'],
  64: ['Limestone Royale', 'Travertino Ocean Grey', 'Limestone Valverde', 'Niwala Yellow', 'Limestone Baccarat'],
  66: ['Calacatta Bra. MB27', 'White Macaúbas MB28', 'Taj Mahal OC10', 'Hyle', 'Holos Selec MB13', 'Tundra Bianco SE13', 'Travertino Chiaro SE09', 'Travertino', 'Travertino Grey', 'Skov WD02', 'Statuario Principe MB21', 'Sahara Noir MB10'],
  67: ['Santos OC06', 'Pigalle RE13', 'Panda White SB18', 'Palladium Ivory SE11', 'Metal Silver ME01', 'Magella OC04', 'Iconic Cipollino MB25', 'Ceppo Romano SE12', 'Cammeo OC09', 'Calacatta H MB17', 'Atlantis Grey SE08', 'Andromeda OC08'],
  68: ['Absolute White SC01', 'Absolute Black SC02', 'Pulpis MB08', 'Precious Sodalite MB14', 'Pietra Grey MB09', 'Nero Marquina MB11', 'Metal Dark ME02', 'Metal Corten ME02', 'Concrete Light CE01', 'Concrete Grey CE03', 'Classico Statuario MB03', 'Calacatta Oro MB06'],
  69: ['Calacatta Glory MB07'],
  71: ['Crystal White', 'Allure'],
};

const featureNames = {
  4: 'Bronze Rivers',
  5: 'Château Brown',
  6: 'Raw G',
  7: 'Cinder Craze',
  8: 'Poblenou',
  9: 'Desert Silver',
  10: 'Rougui',
  11: 'Arden Blue',
  13: 'Polar',
  14: 'Grigio',
  15: 'Ceppo',
  16: 'Umber',
  17: 'Somnia',
  18: 'Kovik',
  19: 'Khalo',
  20: 'Kreta',
  21: 'Laos',
  22: 'Trilium',
  23: 'Kairos',
  24: 'Preto Indiano',
  31: 'Branco Itaúnas',
  33: 'Nebula Grey',
  34: 'Nebula Gray',
  35: 'Zion',
  36: 'Green Valley',
  37: 'Explosion Blue',
  38: 'Taj Mahal',
  39: 'Pietro',
  40: 'Ocean Blue',
  41: 'Madagascar',
  42: 'Fantasy Blue',
  43: 'Botanic',
  44: 'Baly Blue',
  53: 'Salvatore',
  54: 'Persa Fendi',
  55: 'Delfos',
  56: 'Daino Reale',
  57: 'Carrara',
  58: 'Branco Sivec Dove',
  59: 'Black and Gold',
  60: 'Rafaello',
  61: 'Rosa Espírito Santo',
  62: 'Mármore Paraná Kronos',
  66: 'White Macaúbas MB28',
  67: 'White Macaúbas MB28',
  68: 'White Macaúbas MB28',
  64: 'Limestone Royale',
};

const featureNameOverrides = {
  '44:5': 'Azul Macaubas',
};

const categoryHeroSources = {
  silestones: '/catalogo/editorial/silestones/pagina-004-imagem-02.webp',
  dekton: '/catalogo/editorial/dekton/pagina-013-imagem-02.webp',
  marmores: '/catalogo/editorial/marmores/pagina-053-imagem-02.webp',
  limestones: '/catalogo/editorial/limestones/pagina-064-imagem-02.webp',
  infinity: '/catalogo/editorial/infinity/pagina-066-imagem-02.webp',
  crystal: '/catalogo/editorial/crystal/pagina-071-imagem-02.webp',
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
    desktopHeroSrc: '/catalogo/editorial/limestones/banner-desktop.webp',
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

const getCategoryAssets = (category) => {
  if (category.slug === 'quartzitos') {
    return catalogAssets.quartzitos.filter((asset) => asset.page !== 33 || asset.sequence === 1);
  }
  if (category.slug !== 'granitos') return catalogAssets[category.slug];

  return catalogAssets.granitos.filter((asset) => {
    if (asset.page < 25 || asset.page > 30) return true;
    return asset.role === 'feature';
  });
};

const getAssetRole = (category, asset) => {
  if (category.slug === 'granitos' && asset.page >= 25 && asset.page <= 30) {
    return 'sample';
  }
  if (category.slug === 'compacstones' && asset.page > 45) return 'sample';
  if (category.slug === 'onix' && asset.page > 48) return asset.sequence === 1 ? 'feature' : 'sample';
  if (category.slug === 'crystal' && asset.page === 71) return asset.sequence <= 3 ? 'feature' : 'sample';
  if (category.slug === 'infinity' && asset.page === 69) return asset.sequence === 1 ? 'feature' : 'sample';
  if (category.slug === 'quartzitos' && asset.page === 44 && asset.sequence === 5) return 'feature';
  if (['silestones', 'dekton', 'quartzitos', 'marmores', 'limestones', 'infinity'].includes(category.slug)) {
    return asset.sequence <= 2 ? 'feature' : 'sample';
  }
  return asset.role;
};

const getSampleNameIndex = (category, asset, pageIndex) => {
  if (category.slug === 'granitos' && asset.page >= 25 && asset.page <= 30) {
    return Math.floor((asset.sequence - 2) / 2);
  }
  if (category.slug === 'compacstones') return asset.sequence - 5;
  if (category.slug === 'dekton' && asset.page === 23) return asset.sequence - 4;
  if (category.slug === 'crystal' && asset.page === 71) return asset.sequence >= 4 ? asset.sequence - 4 : asset.sequence - 2;
  if (category.slug === 'infinity' && asset.page === 69) return 0;
  if (category.slug === 'quartzitos' && asset.page === 33) return asset.sequence - 2;
  if (['silestones', 'dekton', 'quartzitos', 'marmores', 'limestones', 'infinity'].includes(category.slug)) {
    return asset.sequence - 3;
  }
  return Math.max(0, pageIndex - 1);
};

const enrichAssets = (category) => {
  const pageIndexes = new Map();
  return getCategoryAssets(category).map((asset, index) => {
    const names = pageNames[asset.page] || [];
    const pageIndex = pageIndexes.get(asset.page) || 0;
    pageIndexes.set(asset.page, pageIndex + 1);
    const role = getAssetRole(category, asset);
    const nameIndex = getSampleNameIndex(category, asset, pageIndex);
    return {
      ...asset,
      role,
      id: `${category.slug}-${asset.page}-${asset.sequence}`,
      name: asset.name || (role === 'feature'
        ? featureNameOverrides[`${asset.page}:${asset.sequence}`] || featureNames[asset.page] || names[nameIndex] || category.statement
        : names[nameIndex] || `Seleção ${String(index + 1).padStart(2, '0')}`),
      description: editorialDescription(category, { ...asset, role }),
    };
  });
};

export const catalogCategories = categoryDefinitions.map((category) => {
  const assets = enrichAssets(category);
  return {
    ...category,
    assets,
    hero: assets.find((asset) => asset.src === categoryHeroSources[category.slug])
      || assets.find((asset) => asset.role === 'feature')
      || assets[0],
    preview: assets.find((asset) => asset.role === 'sample') || assets[0],
  };
});

export const getCatalogCategory = (slug) => catalogCategories.find((category) => category.slug === slug);
