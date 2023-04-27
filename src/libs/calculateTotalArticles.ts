import {
  type QueryFiltersProps,
  type GetArticlesOutput,
  defaultArticlesLimit,
} from '@/hooks'
import { type ValidationError } from './errors'
import { type Either, isRight } from 'fp-ts/Either'

export const calculateTotalArticles = (
  lastPage: Either<ValidationError, GetArticlesOutput>
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
