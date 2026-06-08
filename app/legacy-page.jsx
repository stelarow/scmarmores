import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import LegacyInteractions from './legacy-interactions';

const readLegacyPage = cache((filename) => {
  const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
  const bodyMatch = source.match(/<body(?:\s+class="([^"]*)")?[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    throw new Error(`Não foi possível ler o conteúdo de ${filename}`);
  }

  return {
    bodyClass: bodyMatch[1] ?? '',
    html: bodyMatch[2].replace(/<script\b[^>]*src="\/script\.js"[^>]*><\/script>/i, ''),
  };
});

export default function LegacyPage({ filename }) {
  const page = readLegacyPage(filename);

  return (
    <>
      <div className={page.bodyClass || undefined} dangerouslySetInnerHTML={{ __html: page.html }} />
      <LegacyInteractions bodyClass={page.bodyClass} />
    </>
  );
}
