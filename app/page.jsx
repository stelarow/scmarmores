import LegacyPage from './legacy-page';

export const metadata = {
  title: 'SC Mármores | Pedras sob medida para seus ambientes',
  description: 'Mármores, granitos, quartzitos e outras superfícies com orientação, produção sob medida e instalação.',
};

export default function HomePage() {
  return (
    <>
      <link rel="preload" href="/assets/hero-desktop-poster.webp" as="image" fetchpriority="high" />
      <LegacyPage filename="index.html" />
    </>
  );
}
