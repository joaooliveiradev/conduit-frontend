import { EventCodec } from '@/types/article'
import { DefaultError, fetcher } from '@/libs'
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { withMessage } from 'io-ts-types'
import { Either } from 'fp-ts/Either'
import * as t from 'io-ts'
import { calculateTotalArticles } from '@/libs/calculateTotalArticles'
import { some, Option, isSome, none } from 'fp-ts/Option'
import { defaultArticlesLimit } from './useGetArticles'

const GetFeedArticlesResponseCodec = t.type({
  articles: t.array(EventCodec),
  articlesCount: withMessage(
    t.number,
    () => 'articlesCount should be a number'
  ),
})

type GetFeedArticlesResponse = t.TypeOf<typeof GetFeedArticlesResponseCodec>

type GetFeedArticlesOutput = t.OutputOf<typeof GetFeedArticlesResponseCodec>

const oneMinute = 60 * 1000

export const GET_FEED_ARTICLES_KEY = 'get-feed-articles'

type GetFeedArticlesOptions = UseInfiniteQueryOptions<
  Either<DefaultError, GetFeedArticlesOutput>,
  DefaultError
>

type ParamsProps = QueryFunctionContext<QueryKey, Option<number> | null>

export const getFeedArticles = async (articlesLimit: Option<number>) => {
  const url = `/articles/feed?limit=${
    isSome(articlesLimit) ? articlesLimit.value : defaultArticlesLimit
  }`

  return await fetcher<undefined, GetFeedArticlesResponse>(
    url,
    GetFeedArticlesResponseCodec
  )
}

export const useFeedArticles = (options: GetFeedArticlesOptions) =>
  useInfiniteQuery<Either<DefaultError, GetFeedArticlesOutput>, DefaultError>(
    [GET_FEED_ARTICLES_KEY],
    async ({ pageParam = some(defaultArticlesLimit) }: ParamsProps) =>
      await getFeedArticles(pageParam ? pageParam : none),
    {
      ...options,
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      staleTime: oneMinute,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
