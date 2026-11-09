const screenshotFiles = import.meta.glob('../assets/projects/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url',
})

export function getProjectScreenshots(slug) {
  return Object.entries(screenshotFiles)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([first], [second]) => first.localeCompare(second))
    .map(([path, src]) => {
      const fileName = path.split('/').at(-1).replace(/\.[^.]+$/, '')
      const caption = fileName.replace(/[-_]+/g, ' ')
      return {
        src,
        caption,
        alt: `${caption} screenshot for ${slug.replace(/-/g, ' ')}`,
      }
    })
}
