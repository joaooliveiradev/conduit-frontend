import { baseWebUrl } from '@/types'
import { NextSeo, ArticleJsonLd } from 'next-seo'

type PageSeoProps = {
  title: string
  description: string
  author: string
  slug: string
  publishedTime: string
  modifiedTime: string
  tags?: ReadonlyArray<string>
}


export const ArticleSeo = ({
  title,
  description,
  slug,
  author,
  publishedTime,
  modifiedTime,
  tags,
}: PageSeoProps) => {
  const baseURL = baseWebUrl
  const url = `${baseURL}/articles/${slug}`
  const coverImage = `${baseURL}/cover.png`

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          description: description,
          title: title,
          url: url,
          type: 'article',
          article: {
            // TODO: authors here need to be changed to the profile route
            authors: [author],
            publishedTime: publishedTime,
            modifiedTime: modifiedTime,
            tags: tags,
          },
        }}
        additionalMetaTags={[
          {
            property: 'dc:creator',
            content: author,
          },
        ]}
      />
      <ArticleJsonLd
        url={url}
        authorName={author}
        description={description}
        title={title}
        datePublished={publishedTime}
        dateModified={modifiedTime}
        images={[coverImage]}
        publisherName={author}
        isAccessibleForFree={true}
      />
    </>
  )
}
