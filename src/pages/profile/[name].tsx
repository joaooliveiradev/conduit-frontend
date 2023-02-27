import styled, { css } from 'styled-components'
import { ErrorState, ProfileHeader } from '@/components'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import * as superJSON from 'superjson'
import React from 'react'
import { getProfile, GET_PROFILE_KEY, useProfile } from '@/hooks/queries'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  fromNullable,
  isSome,
  none,
  Option,
  some,
  fromEither,
} from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { f } from '@/libs'
import { isRight } from 'fp-ts/Either'

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 111.66px;
  &::before {
    ${({ theme }) => css`
      content: '';
      position: absolute;
      border: 1px solid ${theme.colors.grey[300]};
      width: 100%;
      transform: translateY(50px);
      left: 0;
    `}
  }
`

interface ProfileParams extends ParsedUrlQuery {
  name: string
}

const Profile = ({ name }: ProfileParams) => {
  const { data } = useProfile(name)

  const maybeProfile = f(() => {
    const dataOption = fromNullable(data)
    if (isSome(dataOption) && isRight(dataOption.value)) {
      return fromEither(dataOption.value)
    } else return none
  })
  //todo: put the articles
  //see the error handling, what do when not find the user, etc
  // put the right links on the button, new article, edit profile, etc
  return isSome(maybeProfile) ? (
    <Wrapper>
      <ProfileHeader
        name={maybeProfile.value.profile.username}
        description={maybeProfile.value.profile.bio}
      />
    </Wrapper>
  ) : (
    <ErrorState
      message="Something went wrong while trying to requesting the user informations."
      title="Something went wrong"
      buttonLabel="Try again"
      onButtonClick={() => console.log('tento dnv')}
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
