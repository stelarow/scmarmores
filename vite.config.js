import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        marmores: resolve(import.meta.dirname, 'marmores.html'),
        quartzitos: resolve(import.meta.dirname, 'quartzitos.html'),
        granitos: resolve(import.meta.dirname, 'granitos.html'),
        superficiesEspeciais: resolve(import.meta.dirname, 'superficies-especiais.html'),
        execucao: resolve(import.meta.dirname, 'execucao.html'),
        projetoAzulImperial: resolve(import.meta.dirname, 'projeto-azul-imperial.html'),
        projetoEscadaCalcario: resolve(import.meta.dirname, 'projeto-escada-calcario.html'),
      },
    },
  },
});
