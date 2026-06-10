'use client';

import { useEffect } from 'react';

export default function LegacyRedirect({ href }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="legacy-redirect">
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <p>Esta seleção agora faz parte da curadoria completa.</p>
      <a href={href}>Continuar para o catálogo <span>→</span></a>
    </main>
  );
}
