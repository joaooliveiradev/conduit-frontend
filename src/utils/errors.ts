export type DefaultErrorType = {
  name: string
  message: string
  status: number
}

type ErrorResponse = {
  errors: {
    body: string[]
  }
}

export class DefaultError extends Error {
  name: string
  status: number

  constructor({ name, status, message }: DefaultErrorType) {
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

export class CodecValidationError extends DefaultError {
  constructor() {
    super({
      message:
        "There was an error on the server and the request could not be completed. Sorry. It's not your fault, please wait a few minutes before you try again.",
      name: 'Codec Validation Error',
      status: 422,
    })
  }
}

export const errorsToString = (error: ErrorResponse) =>
  error.errors.body.join(', ')

export const handleFetcherErrors = async (
  responseErr: Response
): Promise<DefaultErrorType> => {
  const isGenericError = !responseErr.headers.get('content-type')
  if (isGenericError) throw new UnknownError()

  const apiError = await responseErr.json()

  return new DefaultError({
    message: errorsToString(apiError),
    name: responseErr.statusText,
    status: responseErr.status,
  })
}
