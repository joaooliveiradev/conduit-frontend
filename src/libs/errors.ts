export type DefaultErrorProps = {
  name: string
  message: string
  status: number
  decodeErrors?: string
}

type ErrorAPIResponse = {
  errors: {
    body: string[]
  }
}

enum HttpStatus {
  Unauthorized = 401,
  UnprocessableEntity = 422,
}

export class DefaultError extends Error {
  name: string
  status: number
  decodeErrors?: string
  constructor({ name, status, message, decodeErrors }: DefaultErrorProps) {
    super(message)
    this.name = name
    this.status = status
    this.decodeErrors = decodeErrors
  }
}

export class UnknownError extends DefaultError {
  constructor() {
    super({
      message: 'Something unexpected happened. Please try again later.',
      name: 'UnknownError',
      status: 500,
    })
  }
}

export class ValidationError extends DefaultError {
  constructor(errorMessage: string, decodeErrors?: string) {
    super({
      name: 'ValidationError',
      status: 422,
      message: errorMessage,
      decodeErrors,
    })
  }
}

export class AuthorizationError extends DefaultError {
  constructor() {
    super({
      message: 'Authorization failed due to an invalid or expired token.',
      name: 'AuthorizationError',
      status: 401,
    })
  }
}

export const errorsToString = (error: ErrorAPIResponse) =>
  error.errors.body.join(', ')

export const handleFetcherErrors = async (responseErr: Response) => {
  if (responseErr.status === HttpStatus.Unauthorized) {
    throw new AuthorizationError()
  } else if (responseErr.status === HttpStatus.UnprocessableEntity) {
    const errors = await responseErr.json()
    return new ValidationError(errorsToString(errors))
  } else {
    throw new UnknownError()
  }
}
