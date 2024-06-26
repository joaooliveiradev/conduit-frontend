import {
  ErrorState,
  ArticleBody,
  ArticleReadingTime,
  ArticleStats,
  Divider,
  ArticleDate,
  ProfileName,
  Anchor,
  Button,
  ErrorStateIcon,
  ErrorStateTextContent,
  ErrorStateTitle,
  ErrorStateMessage,
} from '@/components'
import type { GetServerSidePropsContext, NextPage } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getArticle, GET_ARTICLE_KEY, useGetArticle } from '@/hooks'
import { fromNullable, isSome, getRight, map } from 'fp-ts/Option'
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  row-gap: ${({ theme }) => theme.spacings.xhuge};
`

const HeaderSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xxsmall};
`

const Header = styled.header`
  display: flex;
  align-items: center;
  column-gap: ${({ theme }) => theme.spacings.xsmall};
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
            <Header>
              <Anchor
                href={`/profile/${maybeArticle.value.article.author.username}`}
              >
                <ProfileName
                  name={maybeArticle.value.article.author.username}
                  size={2}
                />
              </Anchor>
              <Divider />
              <ArticleStats>
                <ArticleReadingTime
                  articleBody={maybeArticle.value.article.body}
                />
                <Divider />
                <ArticleDate date={maybeArticle.value.article.updatedAt} />
              </ArticleStats>
            </Header>
            <Title>{maybeArticle.value.article.title}</Title>
            <Description>{maybeArticle.value.article.description}</Description>
          </HeaderSection>
          <ArticleBody articleText={maybeArticle.value.article.body} />
        </Wrapper>
      </>
    )
  } else {
    return (
      <ErrorState>
        <ErrorStateIcon />
        <ErrorStateTextContent>
          <ErrorStateTitle>Something went wrong.</ErrorStateTitle>
          <ErrorStateMessage>
            Something went wrong while trying to requesting the articles.
          </ErrorStateMessage>
        </ErrorStateTextContent>
        <Button
          size="large"
          onClick={() => refetch()}
          disabled={isFetching}
          isLoading={isFetching}
        >
          Try again
        </Button>
      </ErrorState>
    )
  }
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
      [GET_ARTICLE_KEY, slugOption.value],
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
