import { type, string, boolean, array, number } from 'io-ts'
import { withMessage, NonEmptyString } from 'io-ts-types'

const AuthorCodec = type({
  username: withMessage(
    NonEmptyString,
    () => 'username response should be a string and should not be empty'
  ),
  bio: withMessage(string, () => 'bio response should be a string'),
  image: withMessage(string, () => 'image response should be a string'),
  following: withMessage(
    boolean,
    () => 'following response should be a boolean'
  ),
})

export const ArticleCodec = type({
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
    array(string),
    () => 'tagList response should be an array of strings or an emtpy array'
  ),
  favorited: withMessage(
    boolean,
    () => 'favorited response should be a boolean'
  ),
  favoritesCount: withMessage(
    number,
    () => 'favoritesCount response should be an number'
  ),
})

export const ArticleBySlugCodec = type({
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
    array(string),
    () => 'tagList response should be an array of strings or an emtpy array'
  ),
  author: AuthorCodec,
  favorited: withMessage(
    boolean,
    () => 'favorited response should be a boolean'
  ),
  favoritesCount: withMessage(
    number,
    () => 'favoritesCount response should be an number'
  ),
})

export const NewArticleCodec = type({
  title: withMessage(string, () => 'title should be a string'),
  description: withMessage(string, () => 'description should be a string'),
  body: withMessage(string, () => 'body should be a string'),
})
