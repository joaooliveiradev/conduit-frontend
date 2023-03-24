import { UserTypeCodec } from '@/types'
import { type Either } from 'fp-ts/Either'
import { DefaultError, fetcher } from '@/libs'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import * as t from 'io-ts'

const UseMeResponseCodec = t.type({
  user: UserTypeCodec,
})

type UseMeResponse = t.TypeOf<typeof UseMeResponseCodec>

export type UseMeOutput = t.OutputOf<typeof UseMeResponseCodec>

type UseMeOptions = UseQueryOptions<
  Either<DefaultError, UseMeOutput>,
  DefaultError
>

const USE_ME_KEY = 'use-me'

const getMe = async () =>
  await fetcher<undefined, UseMeResponse>('/user', UseMeResponseCodec)

const useMe = (options?: UseMeOptions) =>
  useQuery<Either<DefaultError, UseMeOutput>, DefaultError>(
    [USE_ME_KEY],
    getMe,
    {
      ...options,
    }
  )

export { useMe }