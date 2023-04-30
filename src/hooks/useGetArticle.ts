import { fetcher, type ValidationError, type UnknownError } from '@/libs'
import { ArticleBySlugCodec } from '@/types'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { Either } from 'fp-ts/Either'
import { type, type TypeOf, type OutputOf } from 'io-ts'

const GetArticleCodec = type({
  article: ArticleBySlugCodec,
})

type GetArticleOutput = OutputOf<typeof GetArticleCodec>

type GetArticleResponse = TypeOf<typeof GetArticleCodec>

type GetArticlesOptions = UseQueryOptions<
  Either<ValidationError, GetArticleOutput>,
  UnknownError
>

export const GET_ARTICLE_KEY = 'get-article-by-slug'

export const getArticle = async (slug: string) =>
  await fetcher<undefined, GetArticleResponse>(
    `/articles/${slug}`,
    GetArticleCodec
  )

export const useGetArticle = (slug: string, options?: GetArticlesOptions) =>
  useQuery<Either<ValidationError, GetArticleOutput>, UnknownError>(
    [GET_ARTICLE_KEY],
    async () => await getArticle(slug),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      ...options,
    }
  )
