import type { NextPage } from 'next'
import styled, { css } from 'styled-components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useAuth } from '@/context'
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
  type GetArticlesOutput,
  GET_ARTICLES_KEY,
  useGetArticles,
  useFeedArticles,
  defaultFilters,
} from '@/hooks'
import {
  fromEither,
  fromNullable,
  isSome,
  none,
  type Option,
} from 'fp-ts/Option'
import { type Either } from 'fp-ts/Either'
import { f, DefaultError } from '@/libs'
import { type InfiniteData } from '@tanstack/react-query'
import React from 'react'
import * as superJSON from 'superjson'

const ContentSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.spacings.xxxhuge};
  `}
`

const Home: NextPage = () => {
  const { status } = useAuth()

  const {
    data: getArticlesData,
    fetchNextPage: fetchNextPageGetArticles,
    isFetching: isFetchingGetArticles,
    hasNextPage: hasNextPageGetArticles,
  } = useGetArticles(defaultFilters)

  const { ref: observerRefGetArticles, inView: inViewGetArticles } = useInView({
    skip: !hasNextPageGetArticles,
    threshold: 1,
  })

  React.useEffect(() => {
    if (inViewGetArticles && hasNextPageGetArticles) {
      fetchNextPageGetArticles()
    }
  }, [inViewGetArticles, fetchNextPageGetArticles, hasNextPageGetArticles])

  const getArticlesDataOption = fromNullable(getArticlesData)

  const {
    data: feedArticlesData,
    fetchNextPage: fetchNextPageFeedArticles,
    isFetching: isFetchingFeedArticles,
    hasNextPage: hasNextPageFeedArticles,
  } = useFeedArticles(defaultFilters, {
    enabled: status === 'loggedIn',
  })

  const { ref: observerRefFeedArticles, inView: inViewFeedArticles } =
    useInView({
      skip: !hasNextPageFeedArticles,
      threshold: 1,
    })

  React.useEffect(() => {
    if (inViewFeedArticles && hasNextPageFeedArticles)
      fetchNextPageFeedArticles()
  }, [inViewFeedArticles, fetchNextPageFeedArticles, hasNextPageFeedArticles])

  const feedArticlesDataOption = fromNullable(feedArticlesData)

  const handleMaybeArticles = (
    data: Option<InfiniteData<Either<DefaultError, GetArticlesOutput>>>
  ) => {
    const pages = f(() => {
      if (isSome(data)) {
        const pages = data.value.pages
        return pages
      }
      return []
    })

    const lastPage = fromNullable(pages[pages.length - 1])

    if (isSome(lastPage)) {
      return fromEither(lastPage.value)
    } else return none
  }

  const maybeGetArticles = handleMaybeArticles(getArticlesDataOption)

  const maybeFeedArticles = handleMaybeArticles(feedArticlesDataOption)

  return f(() => {
    if (status === 'loggedIn') {
      return (
        <ContentSection>
          <Hero userStatus={status} />
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
                              readTime={article.body}
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
                              readTime={article.body}
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
          <Hero userStatus={status} />
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
                        readTime={article.body}
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

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery([GET_ARTICLES_KEY], () =>
    getArticles(defaultFilters)
  )

  return {
    props: {
      dehydratedState: superJSON.stringify(dehydrate(queryClient)),
    },
  }
}

export default Home
