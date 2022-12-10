import styled from 'styled-components'
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
import { GetArticlesOutput, useGetArticles, useMe } from '@/hooks/queries'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { fromEither, fromNullable, isSome, none, Option } from 'fp-ts/Option'
import { Either } from 'fp-ts/Either'
import { f, DefaultError } from '@/utils'
import { useGetUserArticles } from '@/hooks/queries/useGetUserArticle'
import { InfiniteData } from '@tanstack/react-query'
import { getUsername } from '@/utils/user'

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 133px 97px 140px 97px;
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
  const { data: useMeData } = useMe()
  const maybeUsername = getUsername(useMeData)

  const {
    data: getUserArticlesData,
    fetchNextPage: fextNextPageGetUserArticles,
    isFetching: isFetchingGetUserArticles,
    hasNextPage: hasNextPageGetUserArticles,
  } = useGetUserArticles(isSome(maybeUsername) ? maybeUsername.value : '', {
    enabled: isSome(maybeUsername),
  })

  const { ref: observerRefGetUserArticles, inView: inViewGetUserArticles } =
    useInView({
      skip: !hasNextPageGetUserArticles,
      threshold: 1,
    })

  useEffect(() => {
    if (inViewGetUserArticles) {
      fextNextPageGetUserArticles()
    }
  }, [inViewGetUserArticles, fextNextPageGetUserArticles])

  const getUserArticlesDataOption = fromNullable(getUserArticlesData)

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

  const maybeGetUserArticles = handleMaybeArticles(getUserArticlesDataOption)
  return status === 'loggedIn' ? (
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
              buttonOnClick={() => fextNextPageGetArticles()}
              disabled={isFetchingGetArticles}
              buttonisLoading={isFetchingGetArticles}
            />
          )}
        </TabContent>
        <TabContent value="foryou">
          {isSome(maybeGetUserArticles) ? (
            <>
              <Articles articles={maybeGetUserArticles} />
              <div ref={observerRefGetUserArticles} />
            </>
          ) : (
            <ErrorState
              title="Something went wrong."
              message="Something went wrong while trying to requesting the user informations."
              buttonLabel="Try again"
              buttonOnClick={() => fextNextPageGetArticles()}
              disabled={isFetchingGetUserArticles}
              buttonisLoading={isFetchingGetUserArticles}
            />
          )}
        </TabContent>
      </Tabs>
    </ContentSection>
  ) : isSome(maybeGetArticles) ? (
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
      buttonOnClick={() => fextNextPageGetArticles()}
      disabled={isFetchingGetArticles}
      buttonisLoading={isFetchingGetArticles}
    />
  )
}
