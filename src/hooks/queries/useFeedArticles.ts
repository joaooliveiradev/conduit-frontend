import { EventCodec } from '@/types/article'
import { DefaultError, fetcher } from '@/utils'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'
import { withMessage } from 'io-ts-types'
import { Either } from 'fp-ts/Either'
import * as t from 'io-ts'

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

export const getFeedArticles = async () =>
  await fetcher<undefined, GetFeedArticlesResponse>(
    `/articles/feed`,
    GetFeedArticlesResponseCodec
  )

export const useFeedArticles = (
  options: GetFeedArticlesOptions
) =>
  useInfiniteQuery<Either<DefaultError, GetFeedArticlesOutput>, DefaultError>(
    [GET_FEED_ARTICLES_KEY],
    async () => await getFeedArticles(),
    {
      ...options,
      staleTime: oneMinute,
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: oneMinute,
    }
  )
