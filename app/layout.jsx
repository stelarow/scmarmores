import './globals.css';

export const metadata = {
  title: 'SC Mármores',
  description: 'Curadoria de pedras naturais, fabricação sob medida e instalação precisa.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
