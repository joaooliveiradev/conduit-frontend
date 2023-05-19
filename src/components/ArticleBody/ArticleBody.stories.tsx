import type { Meta, StoryObj } from '@storybook/react'
import { ArticleBody, type ArticleBodyProps } from './ArticleBody'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 32px 64px;
`

const meta: Meta<ArticleBodyProps> = {
  component: ArticleBody,
}

export default meta

const articleMarkdown = `
  ##  Batched Consistency

  Let's start with **React**. When you update state, it holds off committing those changes until the next render cycle. The benefit here is that React is always consistent. count and doubleCount and the DOM are always observed to be in sync.

  Consistency in frameworks is important. It builds trust. You know when you interact with the view what you see is what you get. If the user sees something but the state of the app is different, that can lead to obscure bugs because user-driven actions can cause unexpected results while appearing intentional. Sometimes to serious consequences (financial or otherwise).

  ## Reactive Consistency

  Even if "correct", batch consistency often leads to its confusion and bugs because of the expectation of values updating. So doing the opposite is what Solid does and by the next line, everything is updated.

  This is perfectly consistent and it fits expectations but as you can imagine there must be a tradeoff.

  ## So... ?

  So honestly, this all sucks. Enough that I feel the need to be aware of batching behavior. And with that awareness then I'm compelled to offer a consistent default as it feels like the sanest thing to do.

  ## 1. Choosing the Best Model

  This is the point of the article where I'm supposed to say the right answer is "it depends" and leave you all with some profound thoughts. But that's not where I'm at.

  ## 2. Natural Execution

  In the company of the others, Svelte's execution might not seem that desirable. It isn't consistent. And does not attempt to appear to be. It also is sort of perfect for Svelte.
`

const Template = (args: ArticleBodyProps) => (
  <Wrapper>
    <ArticleBody {...args} />
  </Wrapper>
)

export const Default: StoryObj<ArticleBodyProps> = {
  render: (args) => <Template {...args} />,
  args: {
    articleText: articleMarkdown,
  },
}
