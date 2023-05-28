import {
  type AuthorizationError,
  type ValidationError,
  type UnknownError,
  fetcher,
} from '@/libs'
import {
  type QueryFunctionContext,
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { ArticleCodec } from '@/types'
import { withMessage } from 'io-ts-types'
import { type Either } from 'fp-ts/Either'
import { fromNullable, isSome } from 'fp-ts/Option'
import { defaultFilters, type QueryFiltersProps, calculateTotalArticles } from '@/hooks'
import { type, array, number, type TypeOf, type OutputOf } from 'io-ts'

const GetFeedArticlesResponseCodec = type({
  articles: array(ArticleCodec),
  articlesCount: withMessage(number, () => 'articlesCount should be a number'),
})

type GetFeedArticlesResponse = TypeOf<typeof GetFeedArticlesResponseCodec>

type GetFeedArticlesOutput = OutputOf<typeof GetFeedArticlesResponseCodec>

const oneMinute = 60 * 1000

export const GET_FEED_ARTICLES_KEY = 'get-feed-articles'

type GetFeedArticlesOptions = UseInfiniteQueryOptions<
  Either<ValidationError, GetFeedArticlesOutput>,
  UnknownError | AuthorizationError
>

export const getFeedArticles = async (filters: QueryFiltersProps) => {
  const query = new URLSearchParams(filters).toString()

  const url = `/articles/feed?${query}`

  return await fetcher<undefined, GetFeedArticlesResponse>(
    url,
    GetFeedArticlesResponseCodec
  )
}

type PageParamProps = QueryFunctionContext<QueryKey, QueryFiltersProps | null>

export const useFeedArticles = (
  filters?: QueryFiltersProps,
  options?: GetFeedArticlesOptions
) =>
  useInfiniteQuery<
    Either<ValidationError, GetFeedArticlesOutput>,
    UnknownError | AuthorizationError
  >(
    [GET_FEED_ARTICLES_KEY],
    async ({ pageParam = defaultFilters }: PageParamProps) => {
      const pageParamOption = fromNullable(pageParam)
      const filtersOption = fromNullable(filters)

      const queryFilters =
        isSome(filtersOption) && isSome(pageParamOption)
          ? { ...filtersOption.value, ...pageParamOption.value }
          : defaultFilters

      return await getFeedArticles(queryFilters)
    },
    {
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: oneMinute,
      cacheTime: oneMinute,
      refetchInterval: oneMinute,
      ...options,
    }
  )
