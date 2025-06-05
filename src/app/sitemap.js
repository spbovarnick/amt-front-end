const EXTERNAL_DATA_URL = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : process.env.NEXT_PUBLIC_DOMAIN

export default async function sitemap() {
  const request = await fetch(`${EXTERNAL_DATA_URL}/api/v1/pages/index`);
  const pages = await request.json();

  const staticPages = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7
    },
  ]

  const dynamicPages = pages?.map((page) => (
    {
      url: `${BASE_URL}/page/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    }
  ))

  return staticPages.concat(dynamicPages)
}