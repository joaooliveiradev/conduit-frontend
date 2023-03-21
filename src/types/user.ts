import * as t from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

export const UserTypeCodec = t.type({
  email: withMessage(NonEmptyString, () => "E-mail response should be a string and should not be empty"),
  token: withMessage(NonEmptyString, () => 'Token response should be a string and should not be empty'),
  username: withMessage(NonEmptyString, () => 'Username response should be a string and should not be empty'),
  bio: withMessage(t.string, () => 'Bio response should be a string '),
  image: withMessage(t.string, () => 'Image response should be a string '),
})
