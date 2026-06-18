const { spawn } = require('node:child_process');
const http = require('node:http');

const port = 64954;
const routesToWarm = [
  '/',
  '/blog',
  '/blog/bancada-de-marmore-em-florianopolis-preco-tipos-onde-fazer',
  '/blog/marmore-ou-granito-cozinha-florianopolis',
  '/blog/como-cuidar-do-marmore-limpeza-manutencao',
  '/catalogo',
  '/catalogo/marmores',
  '/catalogo/granitos',
  '/catalogo/quartzitos',
  '/catalogo/dekton',
  '/catalogo/silestones',
  '/catalogo/quartzos',
  '/catalogo/onix',
  '/catalogo/limestones',
  '/catalogo/infinity',
  '/catalogo/crystal',
  '/projeto-azul-imperial.html',
  '/projeto-escada-calcario.html',
];

const warmRoute = (route) => new Promise((resolve) => {
  const request = http.get({
    hostname: 'localhost',
    port,
    path: route,
    timeout: 120000,
  }, (response) => {
    response.resume();
    response.on('end', () => resolve({ route, status: response.statusCode }));
  });

  request.on('timeout', () => {
    request.destroy();
    resolve({ route, status: 'timeout' });
  });
  request.on('error', () => resolve({ route, status: 'error' }));
});

let warming = false;
const warmRoutes = async () => {
  if (warming) return;
  warming = true;
  console.log(`\n[dev] Pré-carregando rotas em http://localhost:${port}...`);
  for (const route of routesToWarm) {
    const startedAt = Date.now();
    const result = await warmRoute(route);
    const duration = Date.now() - startedAt;
    console.log(`[dev] ${route} ${result.status} ${duration}ms`);
  }
  console.log('[dev] Rotas principais prontas.\n');
};

const child = spawn(process.execPath, [
  '--require',
  './scripts/node24-readlink-fix.cjs',
  'node_modules/next/dist/bin/next',
  'dev',
  '--port',
  String(port),
], {
  cwd: process.cwd(),
  stdio: ['inherit', 'pipe', 'pipe'],
});

const handleOutput = (stream, output) => {
  output.on('data', (chunk) => {
    const text = chunk.toString();
    stream.write(text);
    if (text.includes('Ready in')) {
      setTimeout(warmRoutes, 1000);
    }
  });
};

handleOutput(process.stdout, child.stdout);
handleOutput(process.stderr, child.stderr);

const stop = () => {
  if (!child.killed) child.kill('SIGINT');
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
child.on('exit', (code) => process.exit(code ?? 0));
