import { UserTypeCodec } from '@/types/user'
import { Either } from 'fp-ts/Either'
import type { DefaultErrorProps } from '@utils/errors'
import { fetcher } from '@utils/fetcher'
import * as t from 'io-ts'

const UseMeResponseCodec = t.type({
  user: UserTypeCodec
})

type UseMeResponse = t.TypeOf<typeof UseMeResponseCodec>

export type UseMeOutput = t.OutputOf<typeof UseMeResponseCodec>

export const useMe = async (): Promise<Either<DefaultErrorProps, UseMeOutput>> => {

  const result = await fetcher<undefined, UseMeResponse>('/user', UseMeResponseCodec)

  return result
}
