import { pipe } from 'fp-ts/lib/function'
import { UnknownError } from '@utils/errors'
import * as t from 'io-ts'
import { right, left, isRight, Either } from 'fp-ts/Either'

const validationHandler = <A>(dataValidation: t.Validation<A>) =>
  isRight(dataValidation)
    ? right(dataValidation.right)
    : left(new UnknownError())


export const validateCodec = <A>(
  codec: t.Type<A, unknown, unknown>,
  data: A
): Either<UnknownError, A> => pipe(data, codec.decode, validationHandler<A>)
