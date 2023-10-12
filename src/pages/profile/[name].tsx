import {
  ArticleCard,
  ArticleDate,
  ArticleGrid,
  ArticleReadingTime,
  ArticleStats,
  Divider,
  EmptyState,
  EmptyIcon,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateTitle,
  ErrorState,
  ProfileHeader,
  ProfileName,
  Button,
  ErrorStateIcon,
  ErrorStateTextContent,
  ErrorStateMessage,
  ErrorStateTitle,
} from '@/components'
import {
  defaultFilters,
  getProfile,
  GET_PROFILE_KEY,
  type QueryFiltersProps,
  useGetArticles,
  useProfile,
  GET_ARTICLES_PROFILE_KEY,
  getArticles,
} from '@/hooks'
import { dehydrate, InfiniteData, QueryClient } from '@tanstack/react-query'
import { type GetServerSidePropsContext } from 'next'
import { type ParsedUrlQuery } from 'querystring'
import { fromNullable, isSome, chain, getRight, map, match } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { transparentize } from 'polished'
import { stringify as superJsonStringify } from 'superjson'
import { NextSeo } from 'next-seo'
import { defaultSEO } from '@/pages/_app'
import { baseWebUrl } from '@/types'
import styled from 'styled-components'

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

const getLastPage = <T,>(articles: InfiniteData<T>) =>
  articles.pages[articles.pages.length - 1]

const Profile = ({ name }: ProfileParams) => {
  const {
    data,
    refetch: refetchProfile,
    isLoading: isLoadingProfile,
  } = useProfile(name)

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
  } = useGetArticles({ queryKey: [GET_ARTICLES_PROFILE_KEY] }, filters)

  const maybeArticles = pipe(
    articlesData,
    fromNullable,
    map(getLastPage),
    chain(getRight)
  )

  const { ref: refObserver, inView } = useInView({
    skip: !hasNextPage,
    threshold: 1,
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, inView, hasNextPage])

  return isSome(maybeData) ? (
    <Wrapper>
      <NextSeo
        {...defaultSEO}
        title={`Profile - ${maybeData.value.profile.username}`}
        description={maybeData.value.profile.bio}
        openGraph={{
          type: 'profile',
          url: `${baseWebUrl}/profile/${maybeData.value.profile.username}`,
          profile: {
            username: maybeData.value.profile.username,
          },
        }}
      />
      <ProfileHeader
        name={maybeData.value.profile.username}
        description={maybeData.value.profile.bio}
      />
      {isSome(maybeArticles) ? (
        maybeArticles.value.articles.length === 0 ? (
          <EmptyState>
            <EmptyIcon />
            <EmptyStateContent>
              <EmptyStateTitle>No articles are here... yet.</EmptyStateTitle>
              <EmptyStateDescription>
                We don&apos;t have any articles yet, but you can be the first!
                Access your profile and click in New Article.
              </EmptyStateDescription>
            </EmptyStateContent>
          </EmptyState>
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
                    <ArticleStats>
                      <ArticleReadingTime articleBody={article.body} />
                      <Divider />
                      <ArticleDate date={article.updatedAt} />
                    </ArticleStats>
                  </ArticleCard.Footer>
                </ArticleCard>
              ))}
            </ArticleGrid>
            <div ref={refObserver} />
          </>
        )
      ) : (
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
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            Try again
          </Button>
        </ErrorState>
      )}
    </Wrapper>
  ) : (
    <ErrorState>
      <ErrorStateIcon />
      <ErrorStateTextContent>
        <ErrorStateTitle>Something went wrong.</ErrorStateTitle>
        <ErrorStateMessage>
          Something went wrong while trying to requesting the user informations.
        </ErrorStateMessage>
      </ErrorStateTextContent>
      <Button
        size="large"
        onClick={() => refetchProfile()}
        disabled={isLoadingProfile}
        isLoading={isLoadingProfile}
      >
        Try again
      </Button>
    </ErrorState>
  )
}

const oneHour = 3600

export const getServerSideProps = async ({
  params,
  res,
}: GetServerSidePropsContext<ProfileParams>) => {
  res.setHeader(
    'Cache-Control',
    `public, max-age=${oneHour}, stale-while-revalidate=${oneHour}`
  )

  const queryClient = new QueryClient()

  const username = pipe(
    params,
    fromNullable,
    map((params) => params.name)
  )

  if (isSome(username)) {
    await queryClient.prefetchQuery(
      [GET_PROFILE_KEY, username.value],
      async () => await getProfile(username.value)
    )

    const filters: QueryFiltersProps = {
      ...defaultFilters,
      author: username.value,
    }

    await queryClient.prefetchInfiniteQuery(
      [GET_ARTICLES_PROFILE_KEY],
      async () => await getArticles(filters)
    )

    return {
      props: {
        dehydratedState: superJsonStringify(dehydrate(queryClient)),
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
