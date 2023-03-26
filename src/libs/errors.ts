export type DefaultErrorProps = {
  name: string
  message: string
  status: number
}

type ErrorAPIResponse = {
  errors: {
    body: string[]
  }
}

export class DefaultError extends Error {
  name: string
  status: number

  constructor({ name, status, message }: DefaultErrorProps) {
    super(message)
    this.name = name
    this.status = status
  }
}

export class UnknownError extends DefaultError {
  constructor() {
    super({
      message: 'Something went wrong, please try again',
      name: 'Unknown Error',
      status: 500,
    })
  }
}

export class DecodeError extends DefaultError {
  decodeErrors: string
  constructor(decodeErrors: string) {
    super({
      message: 'Something went wrong, please try again',
      name: 'Decode Validation Error',
      status: 422,
    })
    this.decodeErrors = decodeErrors
  }
}

export class AuthError extends DefaultError {
  constructor() {
    super({
      message: 'Unauthorized',
      name: 'Auth Error Validation',
      status: 401,
    })
  }
}

export const errorsToString = (error: ErrorAPIResponse) =>
  error.errors.body.join(', ')

export const handleFetcherErrors = async (responseErr: Response) => {
  if (responseErr.status === 401) {
    throw new AuthError()
  } else if (responseErr.status === 422) {
    const apiError = await responseErr.json()
    return new DecodeError(errorsToString(apiError))
  } else throw new UnknownError()
}
