import { UserTypeCodec } from '@/types/user'
import { Either } from 'fp-ts/Either'
import { DefaultError, fetcher } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/auth'
import * as t from 'io-ts'
import { handleInvalidUser } from '@/utils/user'

const UseMeResponseCodec = t.type({
  user: UserTypeCodec,
})

type UseMeResponse = t.TypeOf<typeof UseMeResponseCodec>

export type UseMeOutput = t.OutputOf<typeof UseMeResponseCodec>

const getMe = async () =>
  await fetcher<undefined, UseMeResponse>('/user', UseMeResponseCodec)

const useMe = () => {
  const { status } = useAuth()
  return useQuery<Either<DefaultError, UseMeOutput>, DefaultError>(
    ['use-me'],
    getMe,
    {
      enabled: status === 'loggedIn',
      onError: (error) => handleInvalidUser(error),
    }
  )
}

export { useMe }
