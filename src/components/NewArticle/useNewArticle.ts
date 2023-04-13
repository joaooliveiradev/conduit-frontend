import { AuthorizationError, DecodeError, fetcher, UnknownError } from '@/libs'
import { type NewArticleRequest } from './NewArticle'
import { ArticleBySlugCodec as NewArticleCodec } from '@/types'
import { type Either } from 'fp-ts/Either'
import { useMutation } from '@tanstack/react-query'
import * as t from 'io-ts'

const newArticleResponseCodec = t.type({
  article: NewArticleCodec,
})

type NewArticleResponseCodec = t.TypeOf<typeof newArticleResponseCodec>

export type NewArticleResponseOutput = t.OutputOf<
  typeof newArticleResponseCodec
>

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

export const useNewArticle = () =>
  useMutation<
    Either<DecodeError, NewArticleResponseOutput>,
    AuthorizationError | UnknownError,
    NewArticleRequest
  >([NEW_ARTICLE_KEY], postArticle)
