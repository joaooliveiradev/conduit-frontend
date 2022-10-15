import * as t from 'io-ts'
import type { ErrorResponse } from 'types/queryMutationError'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { baseURL } from '@utils/env-variables'
import { UserTypeCodec } from 'types/user'
import { Either, Right, Left, right, left } from 'fp-ts/Either'
// import { pipe } from 'fp-ts/lib/function'
// import { either } from 'io-ts-types'

const SignInResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignInResponse = t.TypeOf<typeof SignInResponseCodec>
t
export type UseSignInInput = {
  user: {
    email: string
    password: string
  }
}

export type UseSignInOptions = UseMutationOptions<
  Right<SignInResponse>,
  Left<ErrorResponse>,
  UseSignInInput
>

async function post<Data>(path: string, data: Data) {
  const url = `${baseURL}${path}`
  const options = {
    headers: {
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
    method: 'POST',
  }

  const response = await fetch(url, options)
  if (response.status >= 400 && response.status <= 599) {
    throw Error()
    // throw Error({ status: response.status, body: response.body })
  }

  return response
}

const signInMutation = async (
  data: UseSignInInput
): Promise<Either<t.ValidationError[], SignInResponse>> => {
  const response = await post(`/users/login`, data)
  const json = await response.json()
  const validationResult = SignInResponseCodec.decode(json)

  if (validationResult._tag == 'Right') {
    return right(validationResult.right)
  }

  return left(validationResult.left)
}

export const useSignIn = () =>
  useMutation(['sign-in'], signInMutation, {
    onSuccess: (result) => {},
    onError: (error) => {},
  })
