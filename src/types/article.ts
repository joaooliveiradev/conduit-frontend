import * as t from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

//Omit Ts in IO-TS
// declare function omit<O, K>

const AuthorCodec = t.type({
  username: withMessage(
    NonEmptyString,
    () => 'username response should be a string and should not be empty'
  ),
  bio: withMessage(t.string, () => 'bio response should be a string'),
  image: withMessage(t.string, () => 'image response should be a string'),
  following: withMessage(
    t.boolean,
    () => 'following response should be a boolean'
  ),
})

export const ArticleCodec = t.type({
  id: withMessage(
    NonEmptyString,
    () => 'id response should be a string and should be not empty'
  ),
  authorId: withMessage(
    NonEmptyString,
    () => 'authorId response should be a string and should be not empty'
  ),
  slug: withMessage(
    NonEmptyString,
    () => 'slug response should be a string and should be not empty'
  ),
  title: withMessage(
    NonEmptyString,
    () => 'title response should be a string and should be not empty'
  ),
  description: withMessage(
    NonEmptyString,
    () => 'description response should be a string and should be not empty'
  ),
  body: withMessage(
    NonEmptyString,
    () => 'body response should be a string and should be not empty'
  ),
  createdAt: withMessage(
    NonEmptyString,
    () => 'createdAt response should be a string and should be not empty'
  ),
  updatedAt: withMessage(
    NonEmptyString,
    () => 'updatedAt response should be a string and should be not empty'
  ),
  author: AuthorCodec,
  tagList: withMessage(
    t.array(t.string),
    () => 'tagList response should be an array of strings or an emtpy array'
  ),
  favorited: withMessage(
    t.boolean,
    () => 'favorited response should be a boolean'
  ),
  favoritesCount: withMessage(
    t.number,
    () => 'favoritesCount response should be an number'
  ),
})

export const ArticleBySlugCodec = t.type({
  id: withMessage(
    NonEmptyString,
    () => 'id response should be a string and should be not empty'
  ),
  slug: withMessage(
    NonEmptyString,
    () => 'slug response should be a string and should be not empty'
  ),
  title: withMessage(
    NonEmptyString,
    () => 'title response should be a string and should be not empty'
  ),
  description: withMessage(
    NonEmptyString,
    () => 'description response should be a string and should be not empty'
  ),
  body: withMessage(
    NonEmptyString,
    () => 'body response should be a string and should be not empty'
  ),
  createdAt: withMessage(
    NonEmptyString,
    () => 'createdAt response should be a string and should be not empty'
  ),
  updatedAt: withMessage(
    NonEmptyString,
    () => 'updatedAt response should be a string and should be not empty'
  ),
  tagList: withMessage(
    t.array(t.string),
    () => 'tagList response should be an array of strings or an emtpy array'
  ),
  author: AuthorCodec,
  favorited: withMessage(
    t.boolean,
    () => 'favorited response should be a boolean'
  ),
  favoritesCount: withMessage(
    t.number,
    () => 'favoritesCount response should be an number'
  ),
})

// const xCodec = t.type(omit(ArticleCodec.props, 'authorId'))
