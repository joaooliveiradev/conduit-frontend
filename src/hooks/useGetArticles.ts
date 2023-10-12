import {
  useInfiniteQuery,
  type QueryFunctionContext,
  type QueryKey,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { ArticleCodec } from '@/types'
import { fetcher, type ValidationError, type UnknownError } from '@/libs'
import { type Either } from 'fp-ts/Either'
import { withMessage } from 'io-ts-types'
import { isSome, fromNullable } from 'fp-ts/Option'
import { match } from 'fp-ts/Either'
import { type, array, number, type TypeOf, type OutputOf } from 'io-ts'
import { pipe } from 'fp-ts/function'

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

export const GET_ARTICLES_PROFILE_KEY = 'get-articles-profile'

export const defaultArticlesLimit = 6

export const defaultFilters = {
  limit: defaultArticlesLimit.toString(),
}

export const calculateTotalArticles = (
  lastPage: Either<ValidationError, GetArticlesOutput>
) => {
  const getLimit = (totalLastFetch: number) =>
    totalLastFetch + defaultArticlesLimit

  const getFilters = (limit: number): QueryFiltersProps => ({
    limit: limit.toString(),
  })

  const getTotalArticles = (articles: GetArticlesOutput) => {
    const totalLastFetch = articles.articles.length
    const total = articles.articlesCount
    const isEqual = totalLastFetch === total
    return isEqual ? null : pipe(totalLastFetch, getLimit, getFilters)
  }

  const onRight = (articles: GetArticlesOutput) => getTotalArticles(articles)

  const onLeft = () => null

  return pipe(lastPage, match(onLeft, onRight))
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
  options: UseGetArticlesOptions,
  filters?: QueryFiltersProps
) =>
  useInfiniteQuery<Either<ValidationError, GetArticlesOutput>, UnknownError>({
    queryFn: async ({ pageParam = defaultFilters }: PageParamProps) => {
      const pageParamOption = fromNullable(pageParam)
      const filtersOption = fromNullable(filters)

      const queryFilters =
        isSome(filtersOption) && isSome(pageParamOption)
          ? { ...filtersOption.value, ...pageParamOption.value }
          : defaultFilters

      return await getArticles(queryFilters)
    },
    getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: oneMinute,
    cacheTime: oneMinute,
    refetchInterval: oneMinute,
    ...options,
  })
