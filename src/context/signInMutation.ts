import { SignInInput, UserTypeCodec } from 'types/user'
import { Either } from 'fp-ts/Either'
import { fetcher } from '@utils/fetcher'
import { DefaultErrorType } from '@utils/errors'
import * as t from 'io-ts'

const SignInResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignInResponseCodecType = t.TypeOf<typeof SignInResponseCodec>

export type SignInResponseOutput = t.OutputOf<typeof SignInResponseCodec>

export const signInMutation = async (
  data: SignInInput
): Promise<Either<DefaultErrorType, SignInResponseOutput>> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }

  const result = await fetcher<SignInResponseCodecType>(
    '/users/login',
    options,
    SignInResponseCodec
  )

  return result
}
