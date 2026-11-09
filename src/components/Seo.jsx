import { Helmet } from 'react-helmet-async'
import { siteData } from '../data/siteData'

export default function Seo({ title, description, path = '/' }) {
  const fullTitle = `${title} | ${siteData.person.name}`
  const canonicalUrl = siteData.seo.siteUrl
    ? new URL(path, siteData.seo.siteUrl).toString()
    : ''

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {siteData.seo.socialImage && <meta property="og:image" content={siteData.seo.socialImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
