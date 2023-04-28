import {
  type QueryFiltersProps,
  type GetArticlesOutput,
  defaultArticlesLimit,
} from '@/hooks'
import { type ValidationError } from './errors'
import { type Either, match } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'

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
