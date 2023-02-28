import { ArticleCodec } from '@/types'
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
import { fromNullable, isSome } from 'fp-ts/Option'
import {
  defaultArticlesLimit,
  defaultFilters,
  QueryParamsProps,
} from '@/hooks/queries'

const GetFeedArticlesResponseCodec = t.type({
  articles: t.array(ArticleCodec),
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

type ParamsProps = QueryFunctionContext<QueryKey, string | null>

export const getFeedArticles = async (filters: QueryParamsProps) => {
  const query = new URLSearchParams(filters).toString()

  const url = `/articles/feed?${query}`

  return await fetcher<undefined, GetFeedArticlesResponse>(
    url,
    GetFeedArticlesResponseCodec
  )
}

export const useFeedArticles = (
  filters?: QueryParamsProps,
  options?: GetFeedArticlesOptions
) =>
  useInfiniteQuery<Either<DefaultError, GetFeedArticlesOutput>, DefaultError>(
    [GET_FEED_ARTICLES_KEY],
    async ({ pageParam = defaultArticlesLimit }: ParamsProps) => {
      const pageParamOption = fromNullable(pageParam)
      const filtersOption = fromNullable(filters)

      const newFilters =
        isSome(filtersOption) && isSome(pageParamOption)
          ? { ...filtersOption.value, limit: pageParamOption.value }
          : defaultFilters

      return await getFeedArticles(newFilters)
    },
    {
      ...options,
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      staleTime: oneMinute,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
