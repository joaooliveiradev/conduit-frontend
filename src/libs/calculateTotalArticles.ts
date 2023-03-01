import {
  type QueryFiltersProps,
  type GetArticlesOutput,
  defaultArticlesLimit,
} from '@/hooks/queries'
import { type Either, isRight } from 'fp-ts/Either'
import { DefaultError } from './errors'

export const calculateTotalArticles = (
  lastPage: Either<DefaultError, GetArticlesOutput>
) => {
  if (isRight(lastPage)) {
    const totalLastFetch = lastPage.right.articles.length
    const totalArticles = lastPage.right.articlesCount
    if (totalLastFetch === totalArticles) return null
    else {
      const limit = totalLastFetch + defaultArticlesLimit

      const filters: QueryFiltersProps = {
        limit: limit.toString(),
      }

      return filters
    }
  } else return null
}
