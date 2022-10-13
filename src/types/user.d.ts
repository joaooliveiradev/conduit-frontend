import * as t from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

export type User = {
  user: {
    email: string
    token: string
    username: string
    bio: string
    image: string
  }
}

export const userTypesCodec = t.type({
  user: t.type({
    email: withMessage(NonEmptyString, "It's not your fault, ")
  })
})
