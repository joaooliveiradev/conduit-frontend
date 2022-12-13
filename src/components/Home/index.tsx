import styled, { css } from 'styled-components'
import { Hero } from './Hero'
import { useAuth } from '@/context'
import {
  ErrorState,
  Articles,
  Tabs,
  TabsPane,
  Pane,
  TabContent,
} from '@/components'
import { GetArticlesOutput, useGetArticles } from '@/hooks/queries'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { fromEither, fromNullable, isSome, none, Option } from 'fp-ts/Option'
import { Either } from 'fp-ts/Either'
import { f, DefaultError } from '@/utils'
import { useFeedArticles } from '@/hooks/queries/useFeedArticles'
import { InfiniteData } from '@tanstack/react-query'

const ContentSection = styled.section`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin: ${theme.spacings.xxxxhuge} ${theme.spacings.xxxhuge};
  `}
`

export const Home = () => {
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

  useEffect(() => {
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

  useEffect(() => {
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
}
