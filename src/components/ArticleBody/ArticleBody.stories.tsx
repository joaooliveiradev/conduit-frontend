import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import { ArticleBody, type ArticleBodyProps } from './index'

const Wrapper = styled.div`
  padding: 32px 64px;
`
const stories: Meta<ArticleBodyProps> = {
  component: ArticleBody,
}

export const Default: Story<ArticleBodyProps> = ({ articleText }) => (
  <Wrapper>
    <ArticleBody articleText={articleText} />
  </Wrapper>
)

export default stories
