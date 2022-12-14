import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { right, left, isRight, Either } from 'fp-ts/Either'
import { DecodeError } from '@/libs'
import { PathReporter } from 'io-ts/PathReporter'

const validationHandler = <A>(
  dataValidation: t.Validation<A>
): Either<DecodeError, A> => {
  if (isRight(dataValidation)) {
    return right(dataValidation.right)
  } else {
    const decodeErrors = PathReporter.report(dataValidation)
    return left(new DecodeError(decodeErrors.join(', ')))
  }
}

export const validateCodec = <A>(
  codec: t.Type<A, unknown, unknown>,
  data: A
): Either<DecodeError, A> =>
  pipe(data, codec.decode, validationHandler<A>)
