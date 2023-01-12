import styled, { css } from 'styled-components'
import rehypeSanitize from 'rehype-sanitize'
import ReactMarkdown from 'react-markdown'

export type ArticleBodyProps = {
  articleText: string
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    word-break: break-all;
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
    & > ul {
      list-style-position: inside;
      padding: 0px;
    }
    p {
      margin: 0;
    }
  `}
`

export const ArticleBody = ({ articleText }: ArticleBodyProps) => {
  return (
    <Wrapper>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {articleText}
      </ReactMarkdown>
    </Wrapper>
  )
}
