import styled, { css } from 'styled-components'
import rehypeSanitize from 'rehype-sanitize'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter'
import type { ReactNode } from 'react'

const SyntaxHighlighter = dynamic<SyntaxHighlighterProps>(
  () =>
    import('react-syntax-highlighter').then((module) => module.PrismAsyncLight),
  { ssr: false }
)

export type ArticleBodyProps = {
  articleText: string
}

type CodeProps = {
  children: ReactNode & ReactNode[]
} & Omit<SyntaxHighlighterProps, 'children'>

const Wrapper = styled.section`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
    ul,
    ol {
      list-style-position: inside;
      padding: 0px;
      margin: 1em;
    }

    p {
      margin-bottom: ${theme.spacings.xxsmall};
      line-height: ${theme.spacings.xxmedium};
      white-space: pre-wrap;
    }

    strong {
      color: ${theme.colors.black[100]};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${theme.colors.black[100]};
      margin-bottom: ${theme.spacings.xmedium};
    }

    h1 {
      font-size: ${theme.fonts.sizes.xhuge};
    }

    h2 {
      font-size: ${theme.fonts.sizes.huge};
    }

    h3 {
      font-size: ${theme.fonts.sizes.xxlarge};
    }

    h4 {
      font-size: ${theme.fonts.sizes.xlarge};
    }

    h5 {
      font-size: ${theme.fonts.sizes.large};
    }

    h6 {
      font-size: ${theme.fonts.sizes.xmedium};
      margin-bottom: ${theme.spacings.small};
    }
  `}
`

const CodeHighlighter = styled(SyntaxHighlighter)`
  border-radius: ${({ theme }) => theme.spacings.small};
`

const Code = ({ children }: CodeProps) => {
  const defaultLanguage = 'javascript'
  return (
    <CodeHighlighter
      style={nightOwl}
      language={defaultLanguage}
      showLineNumbers
      wrapLongLines
    >
      {String(children)}
    </CodeHighlighter>
  )
}

export const ArticleBody = ({ articleText, ...rest }: ArticleBodyProps) => {
  return (
    <Wrapper {...rest}>
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        components={{
          code: ({ children }) => <Code>{children}</Code>,
        }}
      >
        {articleText}
      </ReactMarkdown>
    </Wrapper>
  )
}
