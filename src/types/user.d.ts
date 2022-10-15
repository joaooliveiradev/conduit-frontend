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

export const UserTypeCodec = t.type({
  user: t.type({
    email: withMessage(NonEmptyString, "E-mail response should be a string "),
    token: withMessage(NonEmptyString, "Token response should be a string "),
    username: withMessage(NonEmptyString, "Username response should be a string "),
    bio: withMessage(NonEmptyString, "Bio response should be a string "),
    image: withMessage(NonEmptyString, "Image response should be a string ")
  })
})

export type UserTwo = t.TypeOf<typeof UserTypeCodec>
