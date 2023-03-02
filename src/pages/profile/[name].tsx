import styled, { css } from 'styled-components'
import { Articles, ErrorState, ProfileHeader } from '@/components'
import {
  dehydrate,
  type InfiniteData,
  QueryClient,
} from '@tanstack/react-query'
import {
  defaultFilters,
  type GetArticlesOutput,
  getProfile,
  GET_PROFILE_KEY,
  type QueryFiltersProps,
  useGetArticles,
  useProfile,
} from '@/hooks/queries'
import { type GetServerSidePropsContext } from 'next'
import { type ParsedUrlQuery } from 'querystring'
import {
  fromNullable,
  isSome,
  none,
  type Option,
  some,
  fromEither,
} from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { DefaultError, f } from '@/libs'
import { type Either, isRight } from 'fp-ts/Either'
import { useInView } from 'react-intersection-observer'
import React from 'react'
import { transparentize } from 'polished'
import * as superJSON from 'superjson'

const Wrapper = styled.section`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 111.66px;
    gap: ${theme.spacings.xhuge};
    &::before {
      content: '';
      height: 1px;
      position: absolute;
      background-color: ${transparentize(0.7, theme.colors.grey[300])};
      width: 100%;
      transform: translateY(50px);
      left: 0;
    }
  `}
`

interface ProfileParams extends ParsedUrlQuery {
  name: string
}

const Profile = ({ name }: ProfileParams) => {
  const { data, refetch, isLoading } = useProfile(name)

  const maybeProfile = f(() => {
    const dataOption = fromNullable(data)
    if (isSome(dataOption) && isRight(dataOption.value)) {
      return fromEither(dataOption.value)
    } else return none
  })

  const username = f(() =>
    isSome(maybeProfile) ? some(maybeProfile.value.profile.username) : none
  )

  const filters = f(() => {
    if (isSome(username)) {
      const filter: QueryFiltersProps = {
        ...defaultFilters,
        author: username.value,
      }
      return filter
    } else return undefined
  })

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
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

  const articlesDataOption = fromNullable(articlesData)

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

  const maybeArticles = handleMaybeArticles(articlesDataOption)

  return isSome(maybeProfile) ? (
    <Wrapper>
      <ProfileHeader
        name={maybeProfile.value.profile.username}
        description={maybeProfile.value.profile.bio}
      />
      {isSome(maybeArticles) ? (
        <Articles articles={maybeArticles} />
      ) : (
        <ErrorState
          message="Something went wrong while trying to requesting the articles."
          title="Something went wrong"
          buttonLabel="Try again"
          disabled={isFetchingNextPage}
          isButtonLoading={isFetchingNextPage}
          onButtonClick={() => fetchNextPage()}
        />
      )}
      <div ref={refObserver} />
    </Wrapper>
  ) : (
    <ErrorState
      message="Something went wrong while trying to requesting the user informations."
      title="Something went wrong"
      buttonLabel="Try again"
      onButtonClick={() => refetch()}
      disabled={isLoading}
      isButtonLoading={isLoading}
    />
  )
}

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext<ProfileParams>) => {
  const queryClient = new QueryClient()

  const getUser = (data: Option<ProfileParams>) =>
    isSome(data) ? some(data.value.name) : none

  const userOption = pipe(params, fromNullable, getUser)

  if (isSome(userOption)) {
    await queryClient.prefetchQuery(
      [GET_PROFILE_KEY],
      async () => await getProfile(userOption.value)
    )
    return {
      props: {
        dehydratedState: superJSON.stringify(dehydrate(queryClient)),
        name: userOption.value,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default Profile
