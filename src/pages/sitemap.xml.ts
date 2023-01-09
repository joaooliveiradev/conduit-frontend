import {
  GetArticlesOutput,
  GetArticlesResponse,
  GetArticlesResponseCodec,
} from '@/hooks/queries'
import { Either, isRight } from 'fp-ts/Either'
import { fetcher, DefaultError } from '@/libs'
import { GetServerSideProps } from 'next'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const generateSiteMap = (
  articles: Either<DefaultError, GetArticlesOutput>
) => {
  if (isRight(articles)) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseURL}/</loc>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     ${articles.right.articles
       .map((article) => {
         return `
       <url>
           <loc>${baseURL}/article/${article.slug}</loc>
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
