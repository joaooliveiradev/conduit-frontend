import { UserTypeCodec } from '@/types'
import { type ValidationError, fetcher, type UnknownError } from '@/libs'
import { useMutation } from '@tanstack/react-query'
import type { Either } from 'fp-ts/Either'
import { useAuth } from '@/context'
import { type, type TypeOf, type OutputOf } from 'io-ts'

export type SignUpRequest = {
  user: {
    username: string
    email: string
    password: string
  }
}

const SignUpResponseCodec = type({
  user: UserTypeCodec,
})

type SignUpCodec = TypeOf<typeof SignUpResponseCodec>

type SignUpResponseOutput = OutputOf<typeof SignUpResponseCodec>

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
    Either<ValidationError, SignUpResponseOutput>,
    UnknownError,
    SignUpRequest
  >([USE_SIGN_UP_KEY], signUpMutation, {
    onSuccess: (response) => handleLogin(response),
  })
}
