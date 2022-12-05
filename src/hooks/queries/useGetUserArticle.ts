import { EventCodec } from '@/types/article'
import { DefaultError, fetcher } from '@/utils'
import { useInfiniteQuery } from '@tanstack/react-query'
import { withMessage } from 'io-ts-types'
import * as t from 'io-ts'
import { Either } from 'fp-ts/Either'

const GetUserArticleResponseCodec = t.type({
  articles: t.array(EventCodec),
  articlesCount: withMessage(
    t.number,
    () => 'articlesCount should be a number'
  ),
})

type GetUserArticleResponse = t.TypeOf<typeof GetUserArticleResponseCodec>

type GetUserArticleOutput = t.OutputOf<typeof GetUserArticleResponseCodec>

export const GET_USER_ARTICLES_KEY = 'get-user-articles'

export const getUserArticles = async (author?: string) =>
  await fetcher<undefined, GetUserArticleResponse>(
    `/articles?author=${author}`,
    GetUserArticleResponseCodec
  )

export const useGetUserArticles = (author?: string) =>
  useInfiniteQuery<Either<DefaultError, GetUserArticleOutput>, DefaultError>(
    [GET_USER_ARTICLES_KEY, author],
    async () => await getUserArticles(author)
  )
