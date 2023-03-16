import {
  type GetArticlesOutput,
  type GetArticlesResponse,
  GetArticlesResponseCodec,
} from '@/hooks/queries'
import { type Either, isRight } from 'fp-ts/Either'
import { fetcher, DefaultError } from '@/libs'
import { type GetServerSideProps } from 'next'
import { baseWebUrl } from '@/types'

export const generateSiteMap = (
  articles: Either<DefaultError, GetArticlesOutput>
) => {
  if (isRight(articles)) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseWebUrl}/</loc>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     ${articles.right.articles
       .map((article) => {
         return `
       <url>
           <loc>${baseWebUrl}/article/${article.slug}</loc>
           <priority>1</priority>
           <changefreq>daily</changefreq>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
  } else {
    return ``
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const articles: Either<DefaultError, GetArticlesOutput> = await fetcher<
    undefined,
    GetArticlesResponse
  >('/articles', GetArticlesResponseCodec)

  const sitemaps = generateSiteMap(articles)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemaps)
  res.end()

  return {
    props: {},
  }
}

const SiteMaps = () => {
  //https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
}
export default SiteMaps
