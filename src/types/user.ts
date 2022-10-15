import * as t from 'io-ts'
// import { withMessage, NonEmptyString } from 'io-ts-types'

export const UserTypeCodec = t.type({
  email: t.string,
  token: t.string,
  username: t.string,
  bio: t.string,
  image: t.string,
  // user: t.type({
  //   email: withMessage(NonEmptyString, 'E-mail response should be a string '),
  //   token: withMessage(NonEmptyString, 'Token response should be a string '),
  //   username: withMessage(
  //     NonEmptyString,
  //     'Username response should be a string '
  //   ),
  //   bio: withMessage(NonEmptyString, 'Bio response should be a string '),
  //   image: withMessage(NonEmptyString, 'Image response should be a string '),
  // }),
})

export type User = t.TypeOf<typeof UserTypeCodec>
