import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  row-gap: 20px;
`

const Line = styled.div`
  ${({ theme }) => css`
    height: 0.1rem;
    background-color: ${transparentize(0.8, theme.colors.grey[100])};
  `}
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.large};
    color: ${transparentize(0.4, theme.colors.grey[100])};
  `}
`

const TextBold = styled.b`
  ${({ theme }) => css`
    color: ${theme.colors.black[100]};
    border-bottom: 2px solid ${theme.colors.black[100]};
  `}
`

export const Footer = () => {
  return (
    <Wrapper>
      <Line />
      <Content>
        <Text>
          Made with <TextBold>Typescript</TextBold> and <TextBold>Next.js</TextBold>.
        </Text>
        <Text>&copy; Copyright Spacy - All rights reserved</Text>
      </Content>
    </Wrapper>
  )
}
