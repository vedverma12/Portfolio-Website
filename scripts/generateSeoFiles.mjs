import { unlink, writeFile } from 'node:fs/promises'
import { siteData } from '../src/data/siteData.js'

const siteUrl = siteData.seo.siteUrl.trim()
const origin = siteUrl ? new URL(siteUrl).origin : null
const routes = [
  '/',
  '/about',
  '/skills',
  '/projects',
  ...siteData.projects.map(({ slug }) => `/projects/${slug}`),
  '/experience',
  '/contact',
]

const xmlEscape = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const sitemapPath = new URL('../public/sitemap.xml', import.meta.url)
const sitemap = origin
  ? [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...routes.map((route) => `  <url><loc>${xmlEscape(new URL(route, origin).toString())}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n')
  : null

const robots = [
  'User-agent: *',
  'Allow: /',
  ...(origin ? [`Sitemap: ${new URL('/sitemap.xml', origin).toString()}`] : []),
  '',
].join('\n')

await writeFile(new URL('../public/robots.txt', import.meta.url), robots)

if (sitemap) {
  await writeFile(sitemapPath, sitemap)
} else {
  try {
    await unlink(sitemapPath)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}
