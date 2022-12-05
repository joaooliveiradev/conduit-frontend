import styled from 'styled-components'
import { Hero } from './Hero'
import { useAuth } from '@/context'
import { ErrorState, Articles } from '@/components'
import { useGetArticles } from '@/hooks/queries'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { fromEither, fromNullable, isSome, none } from 'fp-ts/Option'
import { f } from '@/utils/expression'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 130px 0px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
`

export const Home = () => {
  const { status } = useAuth()
  const { data, fetchNextPage, isFetching, hasNextPage } = useGetArticles()
  const { ref: observerRef, inView } = useInView({
    skip: !hasNextPage,
    threshold: 1,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const dataOption = fromNullable(data)

  const maybeArticles = f(() => {
    const pages = f(() => {
      if (isSome(dataOption)) {
        const pages = dataOption.value.pages
        return pages
      }
      return []
    })

    const lastPage = fromNullable(pages[pages.length - 1])

    if (isSome(lastPage)) {
      return fromEither(lastPage.value)
    } else return none
  })

  return (
    <Wrapper>
      {isSome(maybeArticles) ? (
        <ContentWrapper>
          <Hero userStatus={status} />
          <Articles articles={maybeArticles} />
          <div ref={observerRef} />
        </ContentWrapper>
      ) : (
        <ErrorState
          title="Something went wrong."
          message="Something went wrong while trying to requesting the user informations."
          buttonLabel="Try again"
          buttonOnClick={() => fetchNextPage()}
          disabled={isFetching}
          buttonisLoading={isFetching}
        />
      )}
    </Wrapper>
  )
}
