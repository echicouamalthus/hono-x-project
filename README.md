# Installation de TailwindCSS v4 avec Honox

Ce guide vous montrera comment configurer TailwindCSS v4 avec Honox dans votre projet.

## Prérequis

- Node.js installé
- Un projet honox

## Étapes d'installation

### 1. Installer les dépendances

Commencez par installer les dépendances nécessaires :

```bash
npm install tailwindcss @tailwindcss/vite honox @hono/vite-build @hono/vite-dev-server
```

### 2. Configurer Vite

Créez ou modifiez le fichier `vite.config.ts` pour inclure les plugins nécessaires :

```typescript
import build from "@hono/vite-build/cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import honox from "honox/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), honox({ devServer: { adapter } }), build()],
});
```

### 3. Configurer TailwindCSS

Créez ou modifiez le fichier `style.css` pour inclure TailwindCSS :

```css
@import "tailwindcss";
```

### 4. Configurer le Renderer

Créez ou modifiez le fichier `_renderer.tsx` pour utiliser TailwindCSS et Honox :

```tsx
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        {import.meta.env.PROD ? (
          <link href="/dist/style.css" rel="stylesheet" />
        ) : (
          <link href="/app/style.css" rel="stylesheet" />
        )}

        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body class={"bg-red-400"}>{children}</body>
    </html>
  );
});
```

### 5. Lancer le projet

Enfin, lancez votre projet avec la commande suivante :

```bash
npm run dev
```

Votre projet devrait maintenant être configuré avec TailwindCSS v4 et Honox.
