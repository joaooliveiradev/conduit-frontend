import { ReactComponent as ErrorIcon } from '@assets/errorIcon.svg'
import Button from '@components/Button'
import styled, { css } from 'styled-components'

export type ErrorStateProps = {
  message: string
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    color: ${theme.colors.black};
    font-size: ${theme.fonts.sizes.xxlarge};
  `}
`

const Message = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grey[300]};
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 500;
  `}
`

export const ErrorState = ({ message }: ErrorStateProps) => {
  return (
    <Wrapper>
      <ErrorIcon />
      <TextWrapper>
        <Title>Something went wrong.</Title>
        <Message>{message}</Message>
      </TextWrapper>
      <Button size="large">Try again</Button>
    </Wrapper>
  )
}
