import { SignInInput, UserTypeCodec } from '@/types/user'
import { Either } from 'fp-ts/Either'
import { fetcher } from '@utils/fetcher'
import { DefaultError } from '@utils/errors'
import * as t from 'io-ts'

const SignInResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignInResponseCodecType = t.TypeOf<typeof SignInResponseCodec>

export type SignInResponseOutput = t.OutputOf<typeof SignInResponseCodec>

export const signInMutation = async (
  data: SignInInput
): Promise<
  Either<DefaultError, SignInResponseOutput>> => {
  const options: RequestInit = {
    method: 'POST',
  }

  const result = await fetcher<SignInInput, SignInResponseCodecType>(
    '/users/login',
    SignInResponseCodec,
    data,
    options
  )

  return result
}
