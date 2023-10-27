import {
  ErrorState,
  Tabs,
  TabsPane,
  Pane,
  TabContent,
  Hero,
  ArticleGrid,
  ArticleCard,
  ProfileName,
  ArticleStats,
  EmptyState,
  ArticleReadingTime,
  Divider,
  ArticleDate,
  EmptyStateContent,
  EmptyIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  ErrorStateIcon,
  ErrorStateTextContent,
  ErrorStateTitle,
  ErrorStateMessage,
  Button,
} from '@/components'
import {
  getArticles,
  GET_ARTICLES_KEY,
  useGetArticles,
  useFeedArticles,
  defaultFilters,
  GET_FEED_ARTICLES_KEY,
} from '@/hooks'
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled from 'styled-components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '@/context'
import { chain, fromNullable, getRight, isSome, map, match } from 'fp-ts/Option'
import { f } from '@/libs'
import { type InfiniteData } from '@tanstack/react-query'
import { pipe } from 'fp-ts/function'
import React from 'react'
import { stringify as superJsonStringify } from 'superjson'
import { startsWith } from 'fp-ts/lib/string'

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.spacings.xxxhuge};
`

const getLastPage = <T,>(article: InfiniteData<T>) =>
  article.pages[article.pages.length - 1]

const Home: NextPage = () => {
  const { status } = useAuth()

  const {
    data: getArticlesData,
    fetchNextPage: fetchNextPageGetArticles,
    isFetching: isFetchingGetArticles,
    hasNextPage: hasNextPageGetArticles,
  } = useGetArticles({ queryKey: [GET_ARTICLES_KEY] }, defaultFilters)

  const maybeGetArticles = pipe(
    getArticlesData,
    fromNullable,
    map(getLastPage),
    chain(getRight)
  )

  const { ref: observerRefGetArticles, inView: inViewGetArticles } = useInView({
    skip: !hasNextPageGetArticles,
    threshold: 1,
  })

  React.useEffect(() => {
    if (inViewGetArticles && hasNextPageGetArticles) {
      fetchNextPageGetArticles()
    }
  }, [inViewGetArticles, fetchNextPageGetArticles, hasNextPageGetArticles])

  const {
    data: feedArticlesData,
    fetchNextPage: fetchNextPageFeedArticles,
    isFetching: isFetchingFeedArticles,
    hasNextPage: hasNextPageFeedArticles,
  } = useFeedArticles(
    {
      queryKey: [GET_FEED_ARTICLES_KEY],
      enabled: status === 'loggedIn',
    },
    defaultFilters
  )

  const maybeFeedArticles = pipe(
    feedArticlesData,
    fromNullable,
    map(getLastPage),
    chain(getRight)
  )

  const { ref: observerRefFeedArticles, inView: inViewFeedArticles } =
    useInView({
      skip: !hasNextPageFeedArticles,
      threshold: 1,
    })

  React.useEffect(() => {
    if (inViewFeedArticles && hasNextPageFeedArticles)
      fetchNextPageFeedArticles()
  }, [inViewFeedArticles, fetchNextPageFeedArticles, hasNextPageFeedArticles])

  return f(() => {
    if (status === 'loggedIn') {
      return (
        <ContentSection>
          <Hero />
          <Tabs defaultValue="global">
            <Pane>
              <TabsPane value="global">Global</TabsPane>
              <TabsPane value="foryou">For you</TabsPane>
            </Pane>
            <TabContent value="global">
              {isSome(maybeGetArticles) ? (
                maybeGetArticles.value.articlesCount === 0 ? (
                  <EmptyState>
                    <EmptyIcon />
                    <EmptyStateContent>
                      <EmptyStateTitle>
                        No articles are here... yet.
                      </EmptyStateTitle>
                      <EmptyStateDescription>
                        We don&apos;t have any articles yet, but you can be the
                        first! Access your profile and click in New Article.
                      </EmptyStateDescription>
                    </EmptyStateContent>
                  </EmptyState>
                ) : (
                  <>
                    <ArticleGrid>
                      {maybeGetArticles.value.articles.map((article) => (
                        <ArticleCard key={article.slug}>
                          <ArticleCard.Anchor href={`/article/${article.slug}`}>
                            <ArticleCard.Main>
                              <header>
                                <ArticleCard.Title>
                                  {article.title}
                                </ArticleCard.Title>
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
                              <ProfileName
                                name={article.author.username}
                                size={2}
                              />
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
                    <div ref={observerRefGetArticles} />
                  </>
                )
              ) : (
                <ErrorState>
                  <ErrorStateIcon />
                  <ErrorStateTextContent>
                    <ErrorStateTitle>Something went wrong.</ErrorStateTitle>
                    <ErrorStateMessage>
                      Something went wrong while trying to requesting the
                      articles.
                    </ErrorStateMessage>
                  </ErrorStateTextContent>
                  <Button
                    size="large"
                    isLoading={isFetchingGetArticles}
                    disabled={isFetchingGetArticles}
                    onClick={() => fetchNextPageGetArticles()}
                  >
                    Try again
                  </Button>
                </ErrorState>
              )}
            </TabContent>
            <TabContent value="foryou">
              {isSome(maybeFeedArticles) ? (
                maybeFeedArticles.value.articlesCount === 0 ? (
                  <EmptyState>
                    <EmptyIcon />
                    <EmptyStateContent>
                      <EmptyStateTitle>
                        No articles are here... yet.
                      </EmptyStateTitle>
                      <EmptyStateDescription>
                        We don&apos;t have any articles yet, but you can be the
                        first! Access your profile and click in New Article.
                      </EmptyStateDescription>
                    </EmptyStateContent>
                  </EmptyState>
                ) : (
                  <>
                    <ArticleGrid>
                      {maybeFeedArticles.value.articles.map((article) => (
                        <ArticleCard key={article.slug}>
                          <ArticleCard.Anchor href={`/article/${article.slug}`}>
                            <ArticleCard.Main>
                              <header>
                                <ArticleCard.Title>
                                  {article.title}
                                </ArticleCard.Title>
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
                              <ProfileName
                                name={article.author.username}
                                size={2}
                              />
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
                    <div ref={observerRefFeedArticles} />
                  </>
                )
              ) : (
                <ErrorState>
                  <ErrorStateIcon />
                  <ErrorStateTextContent>
                    <ErrorStateTitle>Something went wrong.</ErrorStateTitle>
                    <ErrorStateMessage>
                      Something went wrong while trying to requesting the
                      articles.
                    </ErrorStateMessage>
                  </ErrorStateTextContent>
                  <Button
                    size="large"
                    isLoading={isFetchingFeedArticles}
                    disabled={isFetchingFeedArticles}
                    onClick={() => fetchNextPageFeedArticles()}
                  >
                    Try again
                  </Button>
                </ErrorState>
              )}
            </TabContent>
          </Tabs>
        </ContentSection>
      )
    } else {
      return isSome(maybeGetArticles) ? (
        <ContentSection>
          <Hero />
          {maybeGetArticles.value.articlesCount === 0 ? (
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
                {maybeGetArticles.value.articles.map((article) => (
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
              <div ref={observerRefGetArticles} />
            </>
          )}
        </ContentSection>
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
            isLoading={isFetchingGetArticles}
            disabled={isFetchingGetArticles}
            onClick={() => fetchNextPageGetArticles()}
          >
            Try again
          </Button>
        </ErrorState>
      )
    }
  })
}

const oneHour = 3600

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  res.setHeader(
    'Cache-Control',
    `public, max-age=${oneHour}, s-maxage=${oneHour}, stale-while-revalidate=${oneHour}`
  )

  const onNone = () => ''

  const onSome = (username: string) => username

  const clientRequestedFolder = '/_next/data/'

  const isClientRequest = pipe(
    req.url,
    fromNullable,
    match(onNone, onSome),
    startsWith(clientRequestedFolder)
  )

  if (isClientRequest) {
    return {
      props: {},
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery([GET_ARTICLES_KEY], () =>
    getArticles(defaultFilters)
  )

  return {
    props: {
      dehydratedState: superJsonStringify(dehydrate(queryClient)),
    },
  }
}

export default Home
