import { ErrorResponse } from 'types/queryMutationError'

export const resolveErrors = (error: ErrorResponse | null) =>
  error ? error.errors.body.join(', ') : ''
