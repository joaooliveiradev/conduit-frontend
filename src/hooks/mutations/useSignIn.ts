import type { ErrorResponse } from 'types/queryMutationError'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { baseURL } from '@utils/env-variables'
import { User } from 'types/user'

type SuccessResponse = User

export type UseSignInInput = {
  user: {
    email: string
    password: string
  }
}

type UseSignInOptions = UseMutationOptions<
  SuccessResponse,
  ErrorResponse,
  UseSignInInput
>

export const useSignIn = (options: UseSignInOptions) =>
  useMutation<SuccessResponse, ErrorResponse, UseSignInInput>(
    ['sign-in'],
    async (data: UseSignInInput) => {
      const response = await fetch(`${baseURL}/users/login`, {
        headers: {
          'Content-type': 'application/json;',
        },
        body: JSON.stringify(data),
        method: 'POST',
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        throw errorResponse
      }
      return response.json()
    },
    options
  )
