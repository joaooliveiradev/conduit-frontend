import React from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled, { css } from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getArticle, GET_ARTICLE_KEY, useGetArticle } from '@/hooks/queries'
import * as superJSON from 'superjson'
import {
  ErrorState,
  ArticleHeader,
  ArticleBody,
  ArticleSeo,
} from '@/components'
import {
  fromNullable,
  isSome,
  none,
  some,
  fromEither,
  Option,
} from 'fp-ts/Option'
import { isRight } from 'fp-ts/Either'
import { f } from '@/libs'
import { pipe } from 'fp-ts/function'

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
    ::-webkit-scrollbar {
      display: none;
    }
  `}
`

const HeaderSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xxsmall};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xhuge};
    color: ${theme.colors.black[100]};
    line-height: 47px;
    letter-spacing: -0.04em;
  `}
`

const Description = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
    line-height: ${theme.spacings.xxmedium};
    font-weight: 400;
  `}
`

const Article: NextPage<ArticleNextPageProps> = ({ slug }) => {
  const { data, refetch, isFetching } = useGetArticle(slug)

  const maybeArticle = f(() => {
    const dataOption = fromNullable(data)
    if (isSome(dataOption) && isRight(dataOption.value)) {
      return fromEither(dataOption.value)
    } else return none
  })

  return f(() => {
    if (isSome(maybeArticle)) {
      return (
        <>
          <ArticleSeo
            author={maybeArticle.value.article.author.username}
            description={maybeArticle.value.article.description}
            modifiedTime={maybeArticle.value.article.updatedAt}
            publishedTime={maybeArticle.value.article.createdAt}
            slug={maybeArticle.value.article.slug}
            title={maybeArticle.value.article.title}
            tags={maybeArticle.value.article.tagList}
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

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<GetServerSidePropsParams>) => {
  const queryClient = new QueryClient()

  const getSlug = (data: Option<GetServerSidePropsParams>) =>
    isSome(data) ? some(data.value.slug) : none

  const slugOption = pipe(params, fromNullable, getSlug)

  if (isSome(slugOption)) {
    await queryClient.prefetchQuery(
      [GET_ARTICLE_KEY],
      async () => await getArticle(slugOption.value)
    )
    return {
      props: {
        dehydratedState: superJSON.stringify(dehydrate(queryClient)),
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
