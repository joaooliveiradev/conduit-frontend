import { UserTypeCodec } from '@/types/user'
import { Either } from 'fp-ts/Either'
import { type DefaultErrorProps, fetcher } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/auth'
import * as t from 'io-ts'

const UseMeResponseCodec = t.type({
  user: UserTypeCodec,
})

type UseMeResponse = t.TypeOf<typeof UseMeResponseCodec>

type UseMeOutput = t.OutputOf<typeof UseMeResponseCodec>

const useMe = async () =>
  await fetcher<undefined, UseMeResponse>('/user', UseMeResponseCodec)

const useMeQuery = () => {
  const { status } = useAuth()

  return useQuery<Either<DefaultErrorProps, UseMeOutput>, DefaultErrorProps>(
    ['use-me'],
    useMe,
    {
      enabled: status === 'loggedIn',
    }
  )
}

export { useMeQuery as useMe }
