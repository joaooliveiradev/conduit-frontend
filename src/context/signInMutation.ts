import { SignInInput, UserTypeCodec } from 'types/user'
import { baseURL } from '@utils/env-variables'
import { right, left, Either, isRight } from 'fp-ts/Either'
import * as t from 'io-ts'

const SignInResponseCodec = t.type({
  user: UserTypeCodec,
})

export type SignInResponse = t.TypeOf<typeof SignInResponseCodec>

export const signInMutation = async (
  data: SignInInput
): Promise<Either<t.ValidationError[], SignInResponse>> => {
  const options = {
    headers: {
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
    method: 'POST',
  }
  const response = await fetch(`${baseURL}/users/login`, options)
  if (!response.ok) {
    const errorMsg = await response.json()
    throw errorMsg
  }
  const json = await response.json()
  const validationResult = SignInResponseCodec.decode(json)
  return isRight(validationResult)
    ? right(validationResult.right)
    : left(validationResult.left)
}
