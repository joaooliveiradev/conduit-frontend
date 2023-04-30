import { UserTypeCodec } from '@/types'
import { type Either } from 'fp-ts/Either'
import {
  fetcher,
  type AuthorizationError,
  type ValidationError,
  type UnknownError,
} from '@/libs'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { type, type TypeOf, type OutputOf } from 'io-ts'

const UseMeResponseCodec = type({
  user: UserTypeCodec,
})

type UseMeResponse = TypeOf<typeof UseMeResponseCodec>

export type UseMeOutput = OutputOf<typeof UseMeResponseCodec>

type UseMeOptions = UseQueryOptions<
  Either<ValidationError, UseMeOutput>,
  UnknownError | AuthorizationError
>

const oneHour = 1000 * 60 * 60

const getMe = async () =>
  await fetcher<undefined, UseMeResponse>('/user', UseMeResponseCodec)

const USE_ME_KEY = 'use-me'

export const getUseMeKey = (accessToken: string) =>
  accessToken ? [USE_ME_KEY, accessToken] : [USE_ME_KEY]

export const useMe = (options: UseMeOptions) => {
  return useQuery<
    Either<ValidationError, UseMeOutput>,
    UnknownError | AuthorizationError
  >({
    queryFn: getMe,
    retry: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: oneHour,
    cacheTime: oneHour,
    ...options,
  })
}
