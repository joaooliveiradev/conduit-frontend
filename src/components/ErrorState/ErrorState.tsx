import { Button, ErrorStateIcon } from '@/components'
import styled, { css } from 'styled-components'

type ButtonProps = {
  disabled?: boolean
  block?: boolean
  buttonLabel: string
  onButtonClick: () => void
  isButtonLoading?: boolean
}

export type ErrorStateProps = {
  message: string
  title: string
} & ButtonProps

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: ${theme.spacings.xmedium};
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

export const ErrorState = ({
  message,
  title,
  buttonLabel,
  disabled,
  block,
  onButtonClick,
  isButtonLoading,
}: ErrorStateProps) => {
  return (
    <Wrapper>
      <ErrorStateIcon />
      <TextWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </TextWrapper>
      <Button
        size="large"
        disabled={disabled}
        block={block}
        onClick={onButtonClick}
        isLoading={isButtonLoading}
      >
        {buttonLabel}
      </Button>
    </Wrapper>
  )
}
