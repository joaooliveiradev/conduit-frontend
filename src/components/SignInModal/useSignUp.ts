import { UserTypeCodec } from '@/types'
import { AuthenticationError, fetcher, UnknownError } from '@/libs'
import { useMutation } from '@tanstack/react-query'
import { type Either } from 'fp-ts/Either'
import { useAuth } from '@/context'
import * as t from 'io-ts'

export type SignUpRequest = {
  user: {
    username: string
    email: string
    password: string
  }
}

const SignUpResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignUpCodec = t.TypeOf<typeof SignUpResponseCodec>

export type SignUpResponseOutput = t.OutputOf<typeof SignUpResponseCodec>

export const signUpMutation = async (data: SignUpRequest) => {
  const options: RequestInit = {
    method: 'POST',
  }

  return await fetcher<SignUpRequest, SignUpCodec>(
    '/users',
    SignUpResponseCodec,
    data,
    options
  )
}

const USE_SIGN_UP_KEY = 'sign-up'

export const useSignUp = () => {
  const { handleLogin } = useAuth()

  return useMutation<
    Either<AuthenticationError, SignUpResponseOutput>,
    UnknownError,
    SignUpRequest
  >([USE_SIGN_UP_KEY], signUpMutation, {
    onSuccess: (response) => handleLogin(response),
  })
}
