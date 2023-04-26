import React from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled, { css } from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getArticle, GET_ARTICLE_KEY, useGetArticle } from '@/hooks'
import {
  ErrorState,
  ArticleHeader,
  ArticleBody,
  ArticleSeo,
} from '@/components'
import { fromNullable, isSome, getRight, map } from 'fp-ts/Option'
import { f } from '@/libs'
import { pipe } from 'fp-ts/function'
import { chain } from 'fp-ts/Option'
import * as superJSON from 'superjson'

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

  const maybeArticle = pipe(data, fromNullable, chain(getRight))

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
