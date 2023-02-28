import { ArticleCodec } from '@/types'
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
import { isSome, fromNullable } from 'fp-ts/Option'
import { calculateTotalArticles } from '@/libs/calculateTotalArticles'

export type QueryParamsProps = {
  limit?: string
  author?: string
  favorited?: string
  offset?: string
  tag?: string
}

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

export const defaultArticlesLimit = '6'

export const defaultFilters: QueryParamsProps = {
  limit: defaultArticlesLimit,
}

const oneMinute = 60 * 1000

type UseGetArticlesOptions = UseInfiniteQueryOptions<
  Either<DefaultError, GetArticlesOutput>,
  DefaultError
>

export const getArticles = async (filters: QueryParamsProps) => {
  const query = new URLSearchParams(filters).toString()

  const url = `/articles?${query}`

  const data = await fetcher<undefined, GetArticlesResponse>(
    url,
    GetArticlesResponseCodec
  )
  return data
}

type ParamsProps = QueryFunctionContext<QueryKey, string | null>

export const useGetArticles = (
  filters?: QueryParamsProps,
  options?: UseGetArticlesOptions
) =>
  useInfiniteQuery<Either<DefaultError, GetArticlesOutput>, DefaultError>(
    [GET_ARTICLES_KEY],
    async ({ pageParam = defaultArticlesLimit }: ParamsProps) => {
      const pageParamOption = fromNullable(pageParam)
      const filtersOption = fromNullable(filters)

      const newFilters =
        isSome(filtersOption) && isSome(pageParamOption)
          ? { ...filtersOption.value, limit: pageParamOption.value }
          : defaultFilters

      return await getArticles(newFilters)
    },
    {
      ...options,
      getNextPageParam: (lastPage) => calculateTotalArticles(lastPage),
      staleTime: oneMinute,
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
