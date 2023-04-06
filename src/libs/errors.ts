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

export class DecodeError extends DefaultError {
  constructor(decodeErrors: string) {
    super({
      message:
        "Something wen't wrong with our servers, and we're working to fix it. Please try again later.",
      name: 'DecodeError',
      status: 422,
      decodeErrors,
    })
  }
}

export class AuthenticationError extends DefaultError {
  constructor(errorMessage: string) {
    super({
      name: 'AuthenticationError',
      status: 422,
      message: errorMessage,
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
    return new AuthenticationError(errorsToString(errors))
  } else {
    throw new UnknownError()
  }
}
