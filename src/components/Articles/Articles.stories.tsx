import type { Meta, Story } from '@storybook/react'
import { Articles, type ArticlesProps } from '@/components'

const stories: Meta<ArticlesProps> = {
  component: Articles,
  argTypes: {
    articles: {
      table: {
        disable: true,
      },
    },
  },
}

export default stories

const Template: Story<ArticlesProps> = ({ articles }) => (
  <Articles articles={articles} />
)

const emptyArticles: ArticlesProps = {
  articles: {
    value: {
      articles: [],
      articlesCount: 0,
    },
    _tag: 'Some',
  },
}

export const Empty = Template.bind({})
Empty.args = emptyArticles


const filledArticles: ArticlesProps = {
  articles: {
    value: {
      articles: [
        {
          id: '1',
          slug: '1',
          title: '1',
          description: 'Some good description right here',
          body: 'some good text right here',
          createdAt: '2022-11-29T20:56:56.225Z',
          updatedAt: '2022-11-29T20:56:56.225Z',
          tagList: ['good-text', 'marcola', 'article10'],
          author: {
            username: 'akashi80',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
          authorId: '1',
        },
        {
          id: '2',
          authorId: '2',
          slug: '2',
          title: '2',
          description: 'Some good description right hereSome good ',
          body: 'some good text right heresome good text right heresome good text right heresome good text right heresome good text',
          createdAt: '2022-12-13T15:39:16.297Z',
          updatedAt: '2022-12-13T15:39:16.297Z',
          tagList: ['reactjs', 'angularjs', 'dragons'],
          author: {
            username: 'akashi97',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
        },
        {
          id: '3',
          slug: '3',
          title: '3',
          description: 'Some good description right here',
          body: 'some good text right here',
          createdAt: '2022-11-29T20:56:56.225Z',
          updatedAt: '2022-11-29T20:56:56.225Z',
          tagList: ['reactjs', 'angularjs', 'dragons'],
          author: {
            username: 'akashi80',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
          authorId: '3',
        },
        {
          id: '4',
          authorId: '4',
          slug: '4',
          title: '4',
          description: 'Some good description right hereSome good ',
          body: 'some good text right heresome good text right heresome good text right heresome good text right heresome good text',
          createdAt: '2022-12-13T15:39:16.297Z',
          updatedAt: '2022-12-13T15:39:16.297Z',
          tagList: ['reactjs', 'angularjs', 'dragons'],
          author: {
            username: 'akashi97',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
        },
        {
          id: '5',
          slug: '5',
          title: '5',
          description: 'Some good description right here',
          body: 'some good text right here',
          createdAt: '2022-11-29T20:56:56.225Z',
          updatedAt: '2022-11-29T20:56:56.225Z',
          tagList: ['reactjs', 'angularjs', 'dragons'],
          author: {
            username: 'akashi80',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
          authorId: '5',
        },
        {
          id: '6',
          authorId: '6',
          slug: '6',
          title: '6',
          description: 'Some good description right hereSome good ',
          body: 'some good text right heresome good text right heresome good text right heresome good text right heresome good text',
          createdAt: '2022-12-13T15:39:16.297Z',
          updatedAt: '2022-12-13T15:39:16.297Z',
          tagList: ['reactjs', 'angularjs', 'dragons'],
          author: {
            username: 'akashi97',
            bio: '',
            image: '',
            following: false,
          },
          favorited: false,
          favoritesCount: 0,
        },
      ],
      articlesCount: 6,
    },
    _tag: 'Some',
  },
}

export const Filled = Template.bind({})
Filled.args = filledArticles
