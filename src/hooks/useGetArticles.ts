import { ArticleCodec } from '@/types'
import { fetcher, type ValidationError, type UnknownError } from '@/libs'
import {
  useInfiniteQuery,
  type QueryFunctionContext,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { type Either } from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import { isSome, fromNullable } from 'fp-ts/Option'
import { calculateTotalArticles } from '@/libs/calculateTotalArticles'
import { type, array, number, type TypeOf, type OutputOf } from 'io-ts'

export type QueryFiltersProps = {
  limit?: string
  author?: string
  favorited?: string
  offset?: string
  tag?: string
}

export const GetArticlesResponseCodec = type({
  articles: array(ArticleCodec),
  articlesCount: withMessage(number, () => 'articlesCount should be a number'),
})

export type GetArticlesResponse = TypeOf<typeof GetArticlesResponseCodec>

export type GetArticlesOutput = OutputOf<typeof GetArticlesResponseCodec>

export const GET_ARTICLES_KEY = 'get-articles'

export const defaultArticlesLimit = 6

export const defaultFilters = {
  limit: defaultArticlesLimit.toString(),
}

const oneMinute = 60 * 1000

type UseGetArticlesOptions = UseInfiniteQueryOptions<
  Either<ValidationError, GetArticlesOutput>,
  UnknownError
>

export const getArticles = async (filters: QueryFiltersProps) => {
  const query = new URLSearchParams(filters).toString()

  const url = `/articles?${query}`

  const data = await fetcher<undefined, GetArticlesResponse>(
    url,
    GetArticlesResponseCodec
  )
  return data
}

type PageParamProps = QueryFunctionContext<QueryKey, QueryFiltersProps | null>

export const useGetArticles = (
  filters?: QueryFiltersProps,
  options?: UseGetArticlesOptions
) =>
  useInfiniteQuery<Either<ValidationError, GetArticlesOutput>, UnknownError>(
    [GET_ARTICLES_KEY],
    async ({ pageParam = defaultFilters }: PageParamProps) => {
      const pageParamOption = fromNullable(pageParam)
      const filtersOption = fromNullable(filters)

      const queryFilters =
        isSome(filtersOption) && isSome(pageParamOption)
          ? { ...filtersOption.value, ...pageParamOption.value }
          : defaultFilters

      return await getArticles(queryFilters)
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
