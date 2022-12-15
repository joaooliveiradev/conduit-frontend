import { defaultArticlesLimit, GetArticlesOutput } from '@/hooks/queries'
import { Either, isRight } from 'fp-ts/Either'
import { none, some } from 'fp-ts/Option'
import { DefaultError } from './errors'

export const calculateTotalArticles = (
  lastPage: Either<DefaultError, GetArticlesOutput>
) => {
  if (isRight(lastPage)) {
    const totalLastFetch = lastPage.right.articles.length
    const totalArticles = lastPage.right.articlesCount
    if (totalLastFetch === totalArticles) return null
    else return some(totalLastFetch + defaultArticlesLimit)
  }
  return none
}
