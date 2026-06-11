# Repository Guidelines

## Project Structure & Module Organization

This repository combines a preserved static site with a Next.js 14 App Router application.

- `app/` contains routes, layouts, shared React components, and global styles.
- `app/catalogo/` contains catalog pages, category data, and the asset manifest.
- Root `*.html`, `styles.css`, `script.js`, and `assets/` are preserved legacy sources.
- `public/assets/` mirrors legacy images used by Next.js; `public/catalogo/editorial/` stores catalog media.
- `scripts/` contains integrity checks and catalog preparation utilities.
- `.next-build/`, `out/`, and `node_modules/` are generated and must not be committed.

Treat files listed in `scripts/site-preservation-manifest.json` as protected. If an intentional legacy change is required, update its public copy and manifest metadata together.

## Build, Test, and Development Commands

- `npm ci`: install the exact locked dependencies.
- `npm run dev`: start the local Next.js development server.
- `npm run verify:preservation`: confirm protected legacy files, copies, and route bindings are unchanged.
- `npm run verify:catalog`: validate catalog manifests, image existence, naming, and duplicates.
- `npm run build`: run both verification checks and create the static export in `out/`.
- `npm start`: serve a production Next.js build when applicable; static deployment uses `out/`.

## Coding Style & Naming Conventions

Use two-space indentation, single quotes in JavaScript/JSX, semicolons, and concise functional React components. Name components in `PascalCase`, functions and variables in `camelCase`, and route directories/assets in lowercase kebab-case. Follow existing CSS class naming such as `catalog-category-list`. Keep interface copy in Brazilian Portuguese and preserve accessible labels, alt text, keyboard behavior, and reduced-motion support. No formatter or linter is configured, so match adjacent code closely.

## Testing Guidelines

The verification scripts are the current automated test suite. Run both checks before committing, and run `npm run build` for changes affecting routes, catalog data, CSS, or assets. For UI work, manually inspect desktop and mobile layouts and test navigation and contact links.

## Commit & Pull Request Guidelines

Recent history generally uses concise Conventional Commit prefixes, especially `feat:`. Prefer imperative messages such as `feat: adiciona filtro ao catalogo` or `fix: corrige rota de quartzitos`. Pull requests should describe scope, list verification commands, link relevant issues, and include before/after screenshots for visual changes. Keep generated output and unrelated dependency-lock changes out of the PR.
