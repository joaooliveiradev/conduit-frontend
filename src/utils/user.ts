import { useAuth } from '@/context'
import { DefaultError } from '@/utils/errors'
import { pipe } from 'fp-ts/function'
import { Either, isRight } from 'fp-ts/Either'
import { UseMeOutput } from '@/hooks/queries'
import { fromNullable, isSome, none, some } from 'fp-ts/Option'

export const handleInvalidUser = (error: DefaultError): DefaultError => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { signOut } = useAuth()

  signOut()

  return new DefaultError({
    message: error.message,
    name: error.name,
    status: error.status,
  })
}

export const getUsername = (data: Either<DefaultError, UseMeOutput> | undefined) => {
  const dataOption = pipe(data, fromNullable)
  if (isSome(dataOption)) {
    const dataEither = dataOption.value
    if (isRight(dataEither)) return some(dataEither.right.user.username)
    else {
      handleInvalidUser(dataEither.left)
      return none
    }
  }
  return none
}


