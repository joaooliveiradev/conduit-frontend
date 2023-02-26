import * as t from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

export const ProfileCodec = t.type({
  username: withMessage(
    NonEmptyString,
    () => 'Username field should be a string and not empty'
  ),
  bio: withMessage(
    NonEmptyString,
    () => 'Bio field should be a string and not empty'
  ),
  image: withMessage(
    NonEmptyString,
    () => 'Image field should be a string and not empty'
  ),
  following: withMessage(
    t.boolean,
    () => 'Following field should be a boolean'
  ),
})
