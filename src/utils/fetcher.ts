import { parseCookies } from 'nookies'
import { baseURL } from './env-variables'
import { Either, left, right } from 'fp-ts/Either'
import {
  DefaultErrorType,
  handleFetcherErrors,
  UnknownError,
} from '@utils/errors'
import { validateCodec } from '@utils/validate-codec'
import * as t from 'io-ts'

export const fetcher = async <A>(
  path: string,
  customConfig?: RequestInit,
  codec?: t.Type<A, unknown, unknown>
): Promise<Either<DefaultErrorType, A>> => {
  try {
    const url = `${baseURL}${path}`
    const { 'conduit.token': accessToken } = parseCookies()

    const headers: HeadersInit = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: accessToken,
    }
    const defaultMethod = 'POST'

    const config: RequestInit = {
      headers,
      method: defaultMethod,
      ...customConfig,
    }

    const response = await fetch(url, config)

    if (response.ok) {
      const result = await response.json()
      if (!codec) return right(result)

      return validateCodec<A>(codec, result)
    }

    const responseError = await handleFetcherErrors(response)
    return left(responseError)
  } catch (error: unknown) {
    throw new UnknownError()
  }
}
