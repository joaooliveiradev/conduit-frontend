import { ProfileCodec } from '@/types/profile'
import { DefaultError, fetcher } from '@/libs'
import { useQuery } from '@tanstack/react-query'
import { type Either } from 'fp-ts/Either'
import * as t from 'io-ts'

const UseProfileResponseCodec = t.type({
  profile: ProfileCodec,
})

type UseProfileResponse = t.TypeOf<typeof UseProfileResponseCodec>

type UseProfileOutput = t.OutputOf<typeof UseProfileResponseCodec>

export const GET_PROFILE_KEY = 'get-profile'

export const getProfile = async (user: string) =>
  await fetcher<undefined, UseProfileResponse>(
    `/profiles/${user}`,
    UseProfileResponseCodec
  )

export const useProfile = (user: string) =>
  useQuery<Either<DefaultError, UseProfileOutput>>(
    [GET_PROFILE_KEY],
    async () => await getProfile(user),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )
