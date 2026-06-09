export const catalogCategories = [
  {
    slug: 'silestones',
    name: 'Silestones',
    pages: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    description: 'Modelos Silestones apresentados no catálogo SC Mármores 2025.',
  },
  {
    slug: 'dekton',
    name: 'Dekton',
    pages: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    description: 'Paleta diversificada de modelos Dekton apresentada no catálogo SC Mármores 2025.',
  },
  {
    slug: 'granitos',
    name: 'Granitos exóticos e clássicos',
    shortName: 'Granitos',
    pages: [24, 25, 26, 27, 28, 29, 30, 31, 32],
    description: 'Granitos exóticos e clássicos reunidos no catálogo SC Mármores 2025.',
  },
  {
    slug: 'quartzitos',
    name: 'Quartzitos',
    pages: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    description: 'Quartzitos em uma paleta ampla de cores e desenhos naturais.',
  },
  {
    slug: 'compacstones',
    name: 'Compacstones',
    pages: [45, 46, 47],
    description: 'Cores Compacstones apresentadas no catálogo SC Mármores 2025.',
  },
  {
    slug: 'onix',
    name: 'Ônix',
    pages: [48, 49, 50, 51],
    description: 'Modelos de ônix sujeitos à disponibilidade no estoque da loja.',
  },
  {
    slug: 'marmores',
    name: 'Mármores nacionais e importados',
    shortName: 'Mármores',
    pages: [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
    description: 'Mármores nacionais e importados reunidos no catálogo SC Mármores 2025.',
  },
  {
    slug: 'limestones',
    name: 'Limestones',
    pages: [63, 64],
    description: 'Modelos Limestones apresentados no catálogo SC Mármores 2025.',
  },
  {
    slug: 'infinity',
    name: 'Infinity',
    pages: [65, 66, 67, 68, 69],
    description: 'Modelos Infinity e seus respectivos códigos apresentados no catálogo.',
  },
  {
    slug: 'crystal',
    name: 'Crystal',
    pages: [70, 71],
    description: 'Modelos Crystal apresentados no catálogo SC Mármores 2025.',
  },
];

export const getCatalogCategory = (slug) => catalogCategories.find((category) => category.slug === slug);

export const catalogPageImage = (category, page) =>
  `/catalogo/${category.slug}/pagina-${String(page).padStart(2, '0')}.webp`;
