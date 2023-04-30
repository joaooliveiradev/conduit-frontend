import { type, string, boolean } from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

export const ProfileCodec = type({
  username: withMessage(
    NonEmptyString,
    () => 'Username field should be a string and not empty'
  ),
  bio: withMessage(string, () => 'Bio field should be a string and not empty'),
  image: withMessage(
    string,
    () => 'Image field should be a string and not empty'
  ),
  following: withMessage(boolean, () => 'Following field should be a boolean'),
})
