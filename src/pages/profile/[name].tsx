import styled from 'styled-components'
import {
  ArticleCard,
  ArticleGrid,
  ArticleStats,
  EmptyState,
  ErrorState,
  ProfileHeader,
  ProfileName,
} from '@/components'
import {
  defaultFilters,
  getProfile,
  GET_PROFILE_KEY,
  type QueryFiltersProps,
  useGetArticles,
  useProfile,
  GET_ARTICLES_KEY,
  getArticles,
} from '@/hooks'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { type GetServerSidePropsContext } from 'next'
import { type ParsedUrlQuery } from 'querystring'
import { fromNullable, isSome, chain, getRight, map, match } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { f } from '@/libs'
import { useInView } from 'react-intersection-observer'
import React from 'react'
import { transparentize } from 'polished'
import * as superJSON from 'superjson'

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 111.66px;
  gap: ${({ theme }) => theme.spacings.xhuge};
  &::before {
    content: '';
    height: 1px;
    position: absolute;
    background-color: ${({ theme }) =>
      transparentize(0.7, theme.colors.grey[300])};
    width: 100%;
    transform: translateY(50px);
    left: 0;
  }
`

interface ProfileParams extends ParsedUrlQuery {
  name: string
}

const Profile = ({ name }: ProfileParams) => {
  const { data, refetch, isLoading } = useProfile(name)

  const maybeData = pipe(data, fromNullable, chain(getRight))

  const username = pipe(
    maybeData,
    map(({ profile }) => profile.username)
  )

  const filters = pipe(
    username,
    match(
      () => undefined,
      (username): QueryFiltersProps => ({ ...defaultFilters, author: username })
    )
  )

  const {
    data: articlesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticles({ ...filters })

  const { ref: refObserver, inView } = useInView({
    skip: !hasNextPage,
    threshold: 1,
  })

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, inView, hasNextPage])

  const maybeArticles = f(() => {
    const pages = pipe(
      articlesData,
      fromNullable,
      match(
        () => [],
        (article) => article.pages
      )
    )

    const getLastPage = <T,>(pages: T[]) => pages[pages.length - 1]

    return pipe(pages, getLastPage, getRight)
  })

  return isSome(maybeData) ? (
    <Wrapper>
      <ProfileHeader
        name={maybeData.value.profile.username}
        description={maybeData.value.profile.bio}
      />
      {isSome(maybeArticles) ? (
        maybeArticles.value.articles.length === 0 ? (
          <EmptyState
            title="No articles are here... yet."
            message="This user hasn't written any articles yet."
          />
        ) : (
          <>
            <ArticleGrid>
              {maybeArticles.value.articles.map((article) => (
                <ArticleCard key={article.slug}>
                  <ArticleCard.Anchor href={`/article/${article.slug}`}>
                    <ArticleCard.Main>
                      <header>
                        <ArticleCard.Title>{article.title}</ArticleCard.Title>
                      </header>
                      <section>
                        <ArticleCard.Text>
                          {article.description}
                        </ArticleCard.Text>
                      </section>
                    </ArticleCard.Main>
                  </ArticleCard.Anchor>
                  <ArticleCard.Footer>
                    <ArticleCard.Anchor
                      href={`/profile/${article.author.username}`}
                    >
                      <ProfileName name={article.author.username} size={2} />
                    </ArticleCard.Anchor>
                    <ArticleStats
                      date={article.updatedAt}
                      readTime={article.body}
                    />
                  </ArticleCard.Footer>
                </ArticleCard>
              ))}
            </ArticleGrid>
            <div ref={refObserver} />
          </>
        )
      ) : (
        <ErrorState
          message="Something went wrong while trying to requesting the articles."
          title="Something went wrong"
          buttonLabel="Try again"
          disabled={isFetchingNextPage}
          isButtonLoading={isFetchingNextPage}
          onButtonClick={fetchNextPage}
        />
      )}
    </Wrapper>
  ) : (
    <ErrorState
      message="Something went wrong while trying to requesting the user informations."
      title="Something went wrong"
      buttonLabel="Try again"
      onButtonClick={refetch}
      disabled={isLoading}
      isButtonLoading={isLoading}
    />
  )
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ProfileParams>) => {
  const queryClient = new QueryClient()

  const username = pipe(
    params,
    fromNullable,
    map((params) => params.name)
  )

  if (isSome(username)) {
    await queryClient.prefetchQuery(
      [GET_PROFILE_KEY],
      async () => await getProfile(username.value)
    )

    const filters: QueryFiltersProps = {
      ...defaultFilters,
      author: username.value,
    }

    await queryClient.prefetchInfiniteQuery(
      [GET_ARTICLES_KEY],
      async () => await getArticles(filters)
    )

    return {
      props: {
        dehydratedState: superJSON.stringify(dehydrate(queryClient)),
        name: username.value,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default Profile
