import { SignInInput, UserTypeCodec } from '@/types/user'
import { fetcher } from '@/utils'
import * as t from 'io-ts'

const SignUpResponseCodec = t.type({
  user: UserTypeCodec,
})

type SignUpCodec = t.TypeOf<typeof SignUpResponseCodec>

export type SignUpResponseOutput = t.OutputOf<typeof SignUpResponseCodec>

export const signUpMutation = async (data: SignInInput) => {
  const options: RequestInit = {
    method: 'POST',
  }
  return await fetcher<SignInInput, SignUpCodec>('/users', SignUpResponseCodec, data, options)
}
