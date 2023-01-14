import React from 'react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled, { css } from 'styled-components'
import type { ParsedUrlQuery } from 'querystring'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import {
  getArticle,
  GET_ARTICLE_KEY,
  useGetArticle,
} from '@/hooks/queries/useGetArticle'
import * as superJSON from 'superjson'
import { isRight } from 'fp-ts/Either'
import {
  ErrorState,
  ArticleHeader,
  ArticleBody,
  ArticleSeo,
} from '@/components'
import { fromNullable, isSome, none, some } from 'fp-ts/Option'
import { f } from '@/libs'

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

  const dataOption = fromNullable(data)

  return f(() => {
    if (isSome(dataOption)) {
      if (isRight(dataOption.value)) {
        return (
          <>
            <ArticleSeo
              author={dataOption.value.right.article.author.username}
              description={dataOption.value.right.article.description}
              modifiedTime={dataOption.value.right.article.updatedAt}
              publishedTime={dataOption.value.right.article.createdAt}
              slug={dataOption.value.right.article.slug}
              title={dataOption.value.right.article.title}
              tags={dataOption.value.right.article.tagList}
            />
            <Wrapper>
              <HeaderSection>
                <ArticleHeader
                  date={dataOption.value.right.article.createdAt}
                  name={dataOption.value.right.article.author.username}
                  readTime={dataOption.value.right.article.updatedAt}
                />
                <Title>{dataOption.value.right.article.title}</Title>
                <Description>
                  {dataOption.value.right.article.description}
                </Description>
              </HeaderSection>
              <ArticleBody articleText={dataOption.value.right.article.body} />
            </Wrapper>
          </>
        )
      } else {
        return (
          <ErrorState
            message="Something went wrong while trying to requesting the user informations."
            title="Something went wrong"
            buttonLabel="Try again"
            onButtonClick={refetch}
            isButtonLoading={isFetching}
            disabled={isFetching}
          />
        )
      }
    } else {
      return (
        <ErrorState
          message="Something went wrong while trying to requesting the user informations."
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

  const paramsOption = fromNullable(params)

  const slug = isSome(paramsOption) ? some(paramsOption.value.slug) : none

  if (isSome(slug)) {
    await queryClient.prefetchQuery(
      [GET_ARTICLE_KEY],
      async () => await getArticle(slug.value)
    )
    return {
      props: {
        dehydratedState: superJSON.stringify(dehydrate(queryClient)),
        slug: slug.value,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default Article
