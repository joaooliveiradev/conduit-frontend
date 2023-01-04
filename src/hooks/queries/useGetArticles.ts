import { ArticleCodec } from '@/types/article'
import { DefaultError, fetcher } from '@/libs'
import {
  useInfiniteQuery,
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { Either } from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import * as t from 'io-ts'
import { some, Option, isSome, none } from 'fp-ts/Option'
import { calculateTotalArticles } from '@/libs/calculateTotalArticles'

export const GetArticlesResponseCodec = t.type({
  articles: t.array(ArticleCodec),
  articlesCount: withMessage(
    t.number,
    () => 'articlesCount should be a number'
  ),
})

export type GetArticlesResponse = t.TypeOf<typeof GetArticlesResponseCodec>

export type GetArticlesOutput = t.OutputOf<typeof GetArticlesResponseCodec>

export const GET_ARTICLES_KEY = 'get-articles'

export const defaultArticlesLimit = 6

const oneMinute = 60 * 1000

type UseGetArticlesOptions = UseInfiniteQueryOptions<
  Either<DefaultError, GetArticlesOutput>,
  DefaultError
>

type ParamsProps = QueryFunctionContext<QueryKey, Option<number> | null>

export const getArticles = async (articlesLimit: Option<number>) => {
  const url = `/articles?limit=${
    isSome(articlesLimit) ? articlesLimit.value : defaultArticlesLimit
  }`
  const data = await fetcher<undefined, GetArticlesResponse>(
    url,
    GetArticlesResponseCodec
  )
  return data
}

export const useGetArticles = (options?: UseGetArticlesOptions) =>
  useInfiniteQuery<Either<DefaultError, GetArticlesOutput>, DefaultError>(
    [GET_ARTICLES_KEY],
    async ({ pageParam = some(defaultArticlesLimit) }: ParamsProps) =>
      await getArticles(pageParam ? pageParam : none),
    {
      ...options,
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      staleTime: oneMinute,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
