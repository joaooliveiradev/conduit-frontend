import {
  handleFetcherErrors,
  UnknownError,
  ValidationError,
  AuthorizationError,
} from '@/libs'
import { parseCookies } from 'nookies'
import { type Either, left, right } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { baseApiUrl } from '@/types'
import { match } from 'fp-ts/Either'
import { type Type, type Errors } from 'io-ts'

const validateCodec = <A>(codec: Type<A, unknown, unknown>, data: A) => {
  const onLeft = (errors: Errors) => {
    const errorMessage =
      "Something wen't wrong with our servers, and we're working to fix it. Please try again later."
    return left(new ValidationError(errorMessage, errors.join(', ')))
  }

  const onRight = <A>(data: A) => right<ValidationError, A>(data)

  return pipe(data, codec.decode, match(onLeft, onRight))
}

export const fetcher = async <D, A>(
  path: string,
  codec: Type<A, unknown, unknown>,
  data?: D,
  customConfig?: RequestInit
): Promise<Either<ValidationError, A>> => {
  try {
    const url = `${baseApiUrl}${path}`
    const { 'conduit.token': accessToken } = parseCookies()

    const headers: HeadersInit = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: accessToken,
    }

    const defaultMethod = 'GET'

    const config: RequestInit = {
      headers,
      method: defaultMethod,
      body: data ? JSON.stringify(data) : null,
      ...customConfig,
    }

    const response = await fetch(url, config)

    if (response.ok) {
      const result = await response.json()
      return validateCodec<A>(codec, result)
    }

    const responseError = await handleFetcherErrors(response)
    return left(responseError)
  } catch (error: unknown) {
    if (error instanceof AuthorizationError) throw new AuthorizationError()
    else throw new UnknownError()
  }
}
