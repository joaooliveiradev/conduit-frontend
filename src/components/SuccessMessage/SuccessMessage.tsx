import { transparentize } from 'polished'
import { CheckIcon } from '@/assets'
import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => css`
    max-width: 100%;
    height: ${theme.spacings.xxlarge};
    background-color: ${transparentize(0.9, theme.colors.black[100])};
    display: flex;
    align-items: center;
    gap: ${theme.spacings.xxsmall};
    border-radius: 4px;
  `}
`

const Divider = styled.span`
  width: 8px;
  height: 100%;
  background: ${({ theme }) => theme.colors.black[100]};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacings.xxsmall};
  `}
`

const Text = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[200]};
  `}
`

export type SuccessMessageProps = {
  children: ReactNode
}

export const SuccessMessage = ({ children }: SuccessMessageProps) => (
  <Wrapper>
    <Divider role="none" />
    <Content>
      <CheckIcon />
      {children}
    </Content>
  </Wrapper>
)

SuccessMessage.Message = Text
