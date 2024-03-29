import {
  type AuthorizationError,
  type ValidationError,
  fetcher,
  type UnknownError,
} from '@/libs'
import type { NewArticleRequest } from '@/pages/editor'
import { ArticleBySlugCodec as NewArticleCodec } from '@/types'
import type { Either } from 'fp-ts/Either'
import { type UseMutationOptions, useMutation } from '@tanstack/react-query'
import { type, type TypeOf, type OutputOf } from 'io-ts'

const newArticleResponseCodec = type({
  article: NewArticleCodec,
})

type NewArticleResponseCodec = TypeOf<typeof newArticleResponseCodec>

export type NewArticleResponseOutput = OutputOf<typeof newArticleResponseCodec>

export const postArticle = async (data: NewArticleRequest) => {
  const options: RequestInit = {
    method: 'POST',
  }

  const result = await fetcher<NewArticleRequest, NewArticleResponseCodec>(
    '/articles',
    newArticleResponseCodec,
    data,
    options
  )

  return result
}

const NEW_ARTICLE_KEY = 'new-article'

type NewArticleOptions = UseMutationOptions<
  Either<ValidationError, NewArticleResponseOutput>,
  AuthorizationError | UnknownError,
  NewArticleRequest
>

export const useNewArticle = (options?: NewArticleOptions) =>
  useMutation<
    Either<ValidationError, NewArticleResponseOutput>,
    AuthorizationError | UnknownError,
    NewArticleRequest
  >({ mutationKey: [NEW_ARTICLE_KEY], mutationFn: postArticle, ...options })
