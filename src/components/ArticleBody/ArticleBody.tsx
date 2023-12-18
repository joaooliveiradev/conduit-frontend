import rehypeSanitize, {
  defaultSchema,
  type Options as RehypeSanitizeOptions,
} from 'rehype-sanitize'
import { default as ReactMarkdown } from 'react-markdown'
import { default as rehypeHighlight } from 'rehype-highlight'
import styled, { css } from 'styled-components'
import 'highlight.js/styles/night-owl.css'

export type ArticleBodyProps = {
  articleText: string
}

const Wrapper = styled.section`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};

    *:last-child {
      margin-bottom: 0;
    }

    ul,
    ol {
      list-style-position: inside;
      padding: 0px;
      margin: 1em;
    }

    p {
      margin-bottom: ${theme.spacings.xxsmall};
      white-space: pre-wrap;
      word-break: break-word;
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

    .hljs {
      border-radius: ${theme.spacings.small};
    }
  `}
`

const rehypeSanitizeDefaultCodeSettings =
  (defaultSchema.attributes && defaultSchema.attributes.code) || []

const rehypeSanitizeAttributesSettings: RehypeSanitizeOptions['attributes'] = {
  ...defaultSchema.attributes,
  code: [
    ...rehypeSanitizeDefaultCodeSettings,
    ['className', 'language-js', 'hljs-js', 'language-md'],
  ],
}

const rehypeSanitizeSettings: RehypeSanitizeOptions = {
  ...defaultSchema,
  attributes: rehypeSanitizeAttributesSettings,
}

export const ArticleBody = ({ articleText, ...rest }: ArticleBodyProps) => (
  <Wrapper {...rest}>
    <ReactMarkdown
      rehypePlugins={[
        [rehypeSanitize, rehypeSanitizeSettings],
        [rehypeHighlight],
      ]}
    >
      {articleText}
    </ReactMarkdown>
  </Wrapper>
)
