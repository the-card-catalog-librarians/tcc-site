// @ts-check

// import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// import remarkGithubAlerts from "remark-github-alerts"

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), react()],
  // markdown: {
  //   processor: unified({ remarkPlugins: [remarkGithubAlerts] }),
  // },
})
