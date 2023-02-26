import { DefaultError, fetcher } from '@/libs'
import { ArticleBySlugCodec } from '@/types'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { Either } from 'fp-ts/Either'
import * as t from 'io-ts'

const GetArticleCodec = t.type({
  article: ArticleBySlugCodec,
})

type GetArticleOutput = t.OutputOf<typeof GetArticleCodec>

type GetArticleResponse = t.TypeOf<typeof GetArticleCodec>

type GetArticlesOptions = UseQueryOptions<
  Either<DefaultError, GetArticleOutput>,
  DefaultError
>

export const GET_ARTICLE_KEY = 'get-article-by-slug'

export const getArticle = async (slug: string) =>
  await fetcher<undefined, GetArticleResponse>(
    `/articles/${slug}`,
    GetArticleCodec
  )

export const useGetArticle = (slug: string, options?: GetArticlesOptions) =>
  useQuery<Either<DefaultError, GetArticleOutput>, DefaultError>(
    [GET_ARTICLE_KEY],
    async () => await getArticle(slug),
    {
      ...options,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  )
