import { ProfileCodec } from '@/types/profile'
import { fetcher, type ValidationError, type UnknownError } from '@/libs'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { type Either } from 'fp-ts/Either'
import { type, type TypeOf, type OutputOf } from 'io-ts'

const UseProfileResponseCodec = type({
  profile: ProfileCodec,
})

type UseProfileResponse = TypeOf<typeof UseProfileResponseCodec>

type UseProfileOutput = OutputOf<typeof UseProfileResponseCodec>

export const GET_PROFILE_KEY = 'get-profile'

const oneDay = 1000 * 60 * 60 * 24

export const getProfile = async (username: string) =>
  await fetcher<undefined, UseProfileResponse>(
    `/profiles/${username}`,
    UseProfileResponseCodec
  )

type UseProfileOptions = UseQueryOptions<
  Either<ValidationError, UseProfileOutput>,
  UnknownError
>

export const useProfile = (username: string, options?: UseProfileOptions) =>
  useQuery<Either<ValidationError, UseProfileOutput>, UnknownError>({
    queryKey: [GET_PROFILE_KEY, username],
    queryFn: async () => await getProfile(username),
    cacheTime: oneDay,
    staleTime: oneDay,
    refetchInterval: oneDay,
    ...options,
  })
