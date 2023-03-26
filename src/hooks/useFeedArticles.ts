import { ArticleCodec } from '@/types'
import { DefaultError, fetcher } from '@/libs'
import {
  type QueryFunctionContext,
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { withMessage } from 'io-ts-types'
import { type Either } from 'fp-ts/Either'
import { calculateTotalArticles } from '@/libs/calculateTotalArticles'
import { fromNullable, isSome } from 'fp-ts/Option'
import { defaultFilters, type QueryFiltersProps } from '@/hooks'
import * as t from 'io-ts'

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
  useInfiniteQuery<Either<DefaultError, GetFeedArticlesOutput>, DefaultError>(
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
