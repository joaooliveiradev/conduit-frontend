import type { ErrorResponse } from 'types/queryMutationError'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { baseURL } from '@utils/env-variables'
import { User, UserTwo, UserTypeCodec } from 'types/user'
import { Either, Right, Left, isRight, tryCatch} from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import { either } from 'io-ts-types'

//type SuccessResponse = User
type SuccessResponse = UserTwo

export type UseSignInInput = {
  user: {
    email: string
    password: string
  }
}

type UseSignInOptions = UseMutationOptions<
  Right<SuccessResponse>,
  Left<ErrorResponse>,
  UseSignInInput
>

const signIn = async (
  data: UseSignInInput
) => {
  const url = `${baseURL}/users/login`
  const options = {
    headers: {
      'Content-type': 'application/json;',
    },
    body: JSON.stringify(data),
    method: 'POST',
  }
  const response = await fetch(url, options)
  const json = await response.json()
  const result = UserTypeCodec.decode(json)
  if(isRight(result)){
    return result.right.user
  } else {
    return result.left[0]
  }
}

export const useSignIn = (options: UseSignInOptions) =>
  useMutation<Right<SuccessResponse>, Left<ErrorResponse>, UseSignInInput>(
    ['sign-in'],
    signIn,
    options
  )
