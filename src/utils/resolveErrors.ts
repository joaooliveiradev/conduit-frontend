import type { ErrorResponse } from 'types/queryMutationError'

export const resolveErrors = (error: ErrorResponse ) => error.errors.body.join(', ')
