// @ts-check

import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), react(), sitemap(), {
    name: "ga-injector",
    hooks: {
      "astro:config:setup": ({injectScript})=>{
        injectScript("head-inline",`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-T106EFK72F');`);
          injectScript('head-inline',`var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-T106EFK72F';
              document.head.appendChild(s);`)
      }
    }
  }],
  site: "https://thecardcataloglibrarians.com",
})