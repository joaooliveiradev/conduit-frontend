import { ErrorState, ArticleHeader, ArticleBody } from '@/components'
import type { GetServerSidePropsContext, NextPage } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getArticle, GET_ARTICLE_KEY, useGetArticle } from '@/hooks'
import { fromNullable, isSome, getRight, map } from 'fp-ts/Option'
import { f } from '@/libs'
import { pipe } from 'fp-ts/function'
import { chain } from 'fp-ts/Option'
import { stringify as superJsonStringify } from 'superjson'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { baseWebUrl } from '@/types'
import styled, { css } from 'styled-components'

type ArticleNextPageProps = {
  slug: string
}

const Wrapper = styled.article`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: ${theme.spacings.xxxxhuge} ${theme.spacings.xxxhuge};
    row-gap: ${theme.spacings.xhuge};
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xxsmall};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fonts.sizes.xhuge};
  color: ${({ theme }) => theme.colors.black[100]};
  line-height: 47px;
  letter-spacing: -0.04em;
`

const Description = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
    line-height: ${theme.spacings.xxmedium};
    font-weight: 400;
  `}
`

const Article: NextPage<ArticleNextPageProps> = ({ slug }) => {
  const { data, refetch, isFetching } = useGetArticle(slug)

  const maybeArticle = pipe(data, fromNullable, chain(getRight))

  return f(() => {
    if (isSome(maybeArticle)) {
      return (
        <>
          <NextSeo
            title={maybeArticle.value.article.title}
            description={maybeArticle.value.article.description}
            openGraph={{
              description: maybeArticle.value.article.description,
              title: maybeArticle.value.article.title,
              url: `${baseWebUrl}/article/${maybeArticle.value.article.slug}`,
              type: 'article',
              article: {
                authors: [
                  `${baseWebUrl}/profile/${maybeArticle.value.article.author.username}`,
                ],
                publishedTime: maybeArticle.value.article.createdAt,
                modifiedTime: maybeArticle.value.article.updatedAt,
                tags: maybeArticle.value.article.tagList,
              },
            }}
            additionalMetaTags={[
              {
                property: 'dc:creator',
                content: maybeArticle.value.article.author.username,
              },
            ]}
          />
          <ArticleJsonLd
            url={`${baseWebUrl}/article/${maybeArticle.value.article.slug}`}
            authorName={maybeArticle.value.article.author.username}
            description={maybeArticle.value.article.description}
            title={maybeArticle.value.article.title}
            datePublished={maybeArticle.value.article.createdAt}
            dateModified={maybeArticle.value.article.updatedAt}
            images={[`${baseWebUrl}/cover.png`]}
            publisherName={maybeArticle.value.article.author.username}
            isAccessibleForFree={true}
          />
          <Wrapper>
            <HeaderSection>
              <ArticleHeader
                date={maybeArticle.value.article.createdAt}
                name={maybeArticle.value.article.author.username}
                readTime={maybeArticle.value.article.updatedAt}
              />
              <Title>{maybeArticle.value.article.title}</Title>
              <Description>
                {maybeArticle.value.article.description}
              </Description>
            </HeaderSection>
            <ArticleBody articleText={maybeArticle.value.article.body} />
          </Wrapper>
        </>
      )
    } else {
      return (
        <ErrorState
          message="Something went wrong while trying to requesting the articles."
          title="Something went wrong"
          buttonLabel="Try again"
          onButtonClick={refetch}
          isButtonLoading={isFetching}
          disabled={isFetching}
        />
      )
    }
  })
}

interface GetServerSidePropsParams extends ParsedUrlQuery {
  slug: string
}

const oneHour = 3600

export const getServerSideProps = async ({
  params,
  res,
}: GetServerSidePropsContext<GetServerSidePropsParams>) => {
  const queryClient = new QueryClient()

  res.setHeader(
    'Cache-Control',
    `public, max-age=${oneHour}, stale-while-revalidate=${oneHour}`
  )

  const slugOption = pipe(
    params,
    fromNullable,
    map((paramsOption) => paramsOption.slug)
  )

  if (isSome(slugOption)) {
    await queryClient.prefetchQuery(
      [GET_ARTICLE_KEY],
      async () => await getArticle(slugOption.value)
    )

    return {
      props: {
        dehydratedState: superJsonStringify(dehydrate(queryClient)),
        slug: slugOption.value,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default Article
