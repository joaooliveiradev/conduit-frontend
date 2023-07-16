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
} from '@/components'
import {
  getArticles,
  GET_ARTICLES_KEY,
  useGetArticles,
  useFeedArticles,
  defaultFilters,
} from '@/hooks'
import type { GetServerSidePropsContext, NextPage } from 'next'
import styled from 'styled-components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '@/context'
import { chain, fromNullable, getRight, isSome, map } from 'fp-ts/Option'
import { f } from '@/libs'
import { type InfiniteData } from '@tanstack/react-query'
import { pipe } from 'fp-ts/function'
import React from 'react'
import { stringify as superJsonStringify } from 'superjson'

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
  } = useGetArticles(defaultFilters)

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
  } = useFeedArticles(defaultFilters, {
    enabled: status === 'loggedIn',
  })

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
                  <EmptyState
                    title="No articles are here... yet."
                    message="We don't have any articles yet, but you can be the first! Access your profile and click in New Article."
                  />
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
                            <ArticleStats
                              date={article.updatedAt}
                              articleBody={article.body}
                            />
                          </ArticleCard.Footer>
                        </ArticleCard>
                      ))}
                    </ArticleGrid>
                    <div ref={observerRefGetArticles} />
                  </>
                )
              ) : (
                <ErrorState
                  title="Something went wrong."
                  message="Something went wrong while trying to requesting the articles."
                  buttonLabel="Try again"
                  onButtonClick={fetchNextPageGetArticles}
                  disabled={isFetchingGetArticles}
                  isButtonLoading={isFetchingGetArticles}
                />
              )}
            </TabContent>
            <TabContent value="foryou">
              {isSome(maybeFeedArticles) ? (
                maybeFeedArticles.value.articlesCount === 0 ? (
                  <EmptyState
                    title="No articles are here... yet."
                    message="You need to follow some user to receive their articles."
                  />
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
                            <ArticleStats
                              date={article.updatedAt}
                              articleBody={article.body}
                            />
                          </ArticleCard.Footer>
                        </ArticleCard>
                      ))}
                    </ArticleGrid>
                    <div ref={observerRefFeedArticles} />
                  </>
                )
              ) : (
                <ErrorState
                  title="Something went wrong."
                  message="Something went wrong while trying to requesting the articles."
                  buttonLabel="Try again"
                  onButtonClick={fetchNextPageFeedArticles}
                  disabled={isFetchingFeedArticles}
                  isButtonLoading={isFetchingFeedArticles}
                />
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
            <EmptyState
              title="No articles are here... yet."
              message="We don't have any articles yet, but you can be the first! Create an account and write one!"
            />
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
                      <ArticleStats
                        date={article.updatedAt}
                        articleBody={article.body}
                      />
                    </ArticleCard.Footer>
                  </ArticleCard>
                ))}
              </ArticleGrid>
              <div ref={observerRefGetArticles} />
            </>
          )}
        </ContentSection>
      ) : (
        <ErrorState
          title="Something went wrong."
          message="Something went wrong while trying to requesting the articles."
          buttonLabel="Try again"
          onButtonClick={fetchNextPageGetArticles}
          disabled={isFetchingGetArticles}
          isButtonLoading={isFetchingGetArticles}
        />
      )
    }
  })
}

const oneHour = 3600

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const queryClient = new QueryClient()

  res.setHeader(
    'Cache-Control',
    `public, max-age=${oneHour}, stale-while-revalidate=${oneHour}`
  )

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
