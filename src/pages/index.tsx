import type { NextPage } from 'next'
import styled, { css } from 'styled-components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import * as React from 'react'
import { useAuth } from '@/context'
import {
  ErrorState,
  Articles,
  Tabs,
  TabsPane,
  Pane,
  TabContent,
  Hero,
} from '@/components'
import {
  defaultArticlesLimit,
  getArticles,
  GetArticlesOutput,
  GET_ARTICLES_KEY,
  useGetArticles,
  useFeedArticles,
} from '@/hooks/queries'
import {
  fromEither,
  fromNullable,
  isSome,
  none,
  Option,
  some,
} from 'fp-ts/Option'
import { Either } from 'fp-ts/Either'
import { f, DefaultError } from '@/libs'
import { InfiniteData } from '@tanstack/react-query'
import * as superJSON from 'superjson'

const ContentSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: ${theme.spacings.xxxxhuge} ${theme.spacings.xxxhuge};
  `}
`

const Home: NextPage = () => {
  const { status } = useAuth()

  const {
    data: getArticlesData,
    fetchNextPage: fextNextPageGetArticles,
    isFetching: isFetchingGetArticles,
    hasNextPage: hasNextPageGetArticles,
  } = useGetArticles()

  const { ref: observerRefGetArticles, inView: inViewGetArticles } = useInView({
    skip: !hasNextPageGetArticles,
    threshold: 1,
  })

  React.useEffect(() => {
    if (inViewGetArticles) {
      fextNextPageGetArticles()
    }
  }, [inViewGetArticles, fextNextPageGetArticles])

  const getArticlesDataOption = fromNullable(getArticlesData)

  const {
    data: feedArticlesData,
    fetchNextPage: fextNextPageFeedArticles,
    isFetching: isFetchingFeedArticles,
    hasNextPage: hasNextPageFeedArticles,
  } = useFeedArticles({
    enabled: status === 'loggedIn',
  })

  const { ref: observerRefFeedArticles, inView: inViewFeedArticles } =
    useInView({
      skip: !hasNextPageFeedArticles,
      threshold: 1,
    })

  React.useEffect(() => {
    if (inViewFeedArticles) {
      fextNextPageFeedArticles()
    }
  }, [inViewFeedArticles, fextNextPageFeedArticles])

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
                <>
                  <Articles articles={maybeGetArticles} />
                  <div ref={observerRefGetArticles} />
                </>
              ) : (
                <ErrorState
                  title="Something went wrong."
                  message="Something went wrong while trying to requesting the user informations."
                  buttonLabel="Try again"
                  onButtonClick={() => fextNextPageGetArticles()}
                  disabled={isFetchingGetArticles}
                  isButtonLoading={isFetchingGetArticles}
                />
              )}
            </TabContent>
            <TabContent value="foryou">
              {isSome(maybeFeedArticles) ? (
                <>
                  <Articles articles={maybeFeedArticles} />
                  <div ref={observerRefFeedArticles} />
                </>
              ) : (
                <ErrorState
                  title="Something went wrong."
                  message="Something went wrong while trying to requesting the user informations."
                  buttonLabel="Try again"
                  onButtonClick={() => fextNextPageGetArticles()}
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
          <Articles articles={maybeGetArticles} />
          <div ref={observerRefGetArticles} />
        </ContentSection>
      ) : (
        <ErrorState
          title="Something went wrong."
          message="Something went wrong while trying to requesting the user informations."
          buttonLabel="Try again"
          onButtonClick={() => fextNextPageGetArticles()}
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
    getArticles(some(defaultArticlesLimit))
  )

  return {
    props: {
      dehydratedState: superJSON.stringify(dehydrate(queryClient)),
    },
  }
}

export default Home
