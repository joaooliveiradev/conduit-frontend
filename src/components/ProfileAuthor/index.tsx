import styled, { css } from 'styled-components'

export type ProfileAuthorProps = {
  author: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacings.small};
  `}
`

const TagName = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.grey[200]};
    font-size: ${theme.fonts.sizes.xmedium};
    line-height: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
  `}
`

const Name = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    font-size: ${theme.fonts.sizes.xxxlarge};
    line-height: 28px;
    font-weight: 700;
  `}
`

export const ProfileAuthor = ({ author }: ProfileAuthorProps) => {
  const toTagName = (str: string) => `@${str.toLowerCase().split(' ').join('')}`

  return (
    <Wrapper>
      <TagName>{toTagName(author)}</TagName>
      <Name>{author}</Name>
    </Wrapper>
  )
}
