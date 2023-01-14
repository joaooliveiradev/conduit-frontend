import styled, { css } from 'styled-components'
import rehypeSanitize from 'rehype-sanitize'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'

const SyntaxHighlighter = dynamic(() =>
  import('react-syntax-highlighter').then((module) => module.PrismAsyncLight)
)

export type ArticleBodyProps = {
  articleText: string
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.medium};
    & > h1 {
      font-size: ${theme.fonts.sizes.xhuge};
    }
    & > h2 {
      font-size: ${theme.fonts.sizes.huge};
    }
    & > h3 {
      font-size: ${theme.fonts.sizes.xxlarge};
    }
    & > h4 {
      font-size: ${theme.fonts.sizes.xlarge};
    }
    & > h5 {
      font-size: ${theme.fonts.sizes.large};
    }
    & > h6 {
      font-size: ${theme.fonts.sizes.xmedium};
    }
    & > ul,
    ol {
      list-style-position: inside;
      padding: 0px;
      margin: 1em;
    }
    p {
      margin: 0;
    }
  `}
`

export const ArticleBody = ({ articleText }: ArticleBodyProps) => {
  return (
    <Wrapper>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          code: ({ children }) => (
            <SyntaxHighlighter
              style={nightOwl}
              language="javascript"
              customStyle={{ borderRadius: '8px' }}
            >
              {children.join('')}
            </SyntaxHighlighter>
          ),
        }}
      >
        {articleText}
      </ReactMarkdown>
    </Wrapper>
  )
}
