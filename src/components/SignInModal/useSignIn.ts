import { UserTypeCodec } from '@/types'
import type { Either } from 'fp-ts/Either'
import { fetcher, type ValidationError, type UnknownError } from '@/libs'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context'
import { type, type TypeOf, type OutputOf } from 'io-ts'

export type SignInRequest = {
  user: {
    email: string
    password: string
  }
}

const SignInResponseCodec = type({
  user: UserTypeCodec,
})

type SignInResponseCodecType = TypeOf<typeof SignInResponseCodec>

export type SignInResponseOutput = OutputOf<typeof SignInResponseCodec>

export const signInMutation = async (data: SignInRequest) => {
  const options: RequestInit = {
    method: 'POST',
  }

  const result = await fetcher<SignInRequest, SignInResponseCodecType>(
    '/users/login',
    SignInResponseCodec,
    data,
    options
  )

  return result
}

const USE_SIGN_IN_KEY = 'sign-in'

export const useSignIn = () => {
  const { handleLogin } = useAuth()
  return useMutation<
    Either<ValidationError, SignInResponseOutput>,
    UnknownError,
    SignInRequest
  >([USE_SIGN_IN_KEY], signInMutation, {
    onSuccess: (response) => handleLogin(response),
  })
}
