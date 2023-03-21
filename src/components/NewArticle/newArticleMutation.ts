import { DefaultError, fetcher } from '@/libs'
import { type NewArticleRequest } from './NewArticle'
import * as t from 'io-ts'
import { ArticleCodec } from '@/types'
import { type Either } from 'fp-ts/Either'

const newArticleResponseCodec = t.type({
  article: ArticleCodec,
})

type NewArticleResponseCodec = t.TypeOf<typeof newArticleResponseCodec>

export type NewArticleResponseOutput = t.OutputOf<
  typeof newArticleResponseCodec
>

export const newArticleMutation = async (
  data: NewArticleRequest
): Promise<Either<DefaultError, NewArticleResponseOutput>> => {
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
