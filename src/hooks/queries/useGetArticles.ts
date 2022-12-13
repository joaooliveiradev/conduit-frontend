import { EventCodec } from '@/types/article'
import { DefaultError, fetcher } from '@/utils'
import {
  useInfiniteQuery,
  QueryFunctionContext,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { Either, isRight } from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import * as t from 'io-ts'
import { none, some, Option, isSome } from 'fp-ts/Option'

const GetArticlesResponseCodec = t.type({
  articles: t.array(EventCodec),
  articlesCount: withMessage(
    t.number,
    () => 'articlesCount should be a number'
  ),
})

type GetArticlesResponse = t.TypeOf<typeof GetArticlesResponseCodec>

export type GetArticlesOutput = t.OutputOf<typeof GetArticlesResponseCodec>

export const GET_ARTICLES_KEY = 'get-articles'

export const defaultArticlesLimit = 6

const oneMinute = 60 * 1000

type UseGetArticlesOptions = UseInfiniteQueryOptions<
  Either<DefaultError, GetArticlesOutput>,
  DefaultError
>

type ParamsProps = QueryFunctionContext<QueryKey, Option<number>>

const calculateTotalArticles = (
  lastPage: Either<DefaultError, GetArticlesOutput>
) => {
  if (isRight(lastPage)) {
    const totalLastFetch = lastPage.right.articles.length
    const totalArticles = lastPage.right.articlesCount
    if (totalLastFetch === totalArticles) return some(totalArticles)
    else return some(totalLastFetch + defaultArticlesLimit)
  }
  return none
}

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
    ({ pageParam = some(defaultArticlesLimit) }: ParamsProps) =>
      getArticles(pageParam),
    {
      ...options,
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      staleTime: oneMinute,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
