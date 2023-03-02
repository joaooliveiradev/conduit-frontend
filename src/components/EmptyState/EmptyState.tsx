import { ReactComponent as EmptyIcon } from '@/assets/emptyIcon.svg'
import styled, { css } from 'styled-components'

export type EmptyStateProps = {
  message: string;
  title: string;
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${theme.spacings.large};
  `}
`

const TextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${theme.spacings.xsmall};
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxlarge};
  `}
`

const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xmedium};
    color: ${theme.colors.grey[300]};
    font-weight: 500;
  `}
`

export const EmptyState = ({ message, title }: EmptyStateProps) => {
  return (
    <Wrapper>
      <EmptyIcon />
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{message}</Description>
      </TextWrapper>
    </Wrapper>
  )
}
