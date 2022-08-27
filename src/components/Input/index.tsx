import { InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`

const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red[100]};
    font-size: ${theme.fonts.sizes.medium};
    font-weight: 500;
  `}
`

const InputWrapper = styled.input<InputProps>`
  ${({ theme, errorMessage }) => css`
    height: ${theme.spacings.xlarge};
    border-radius: 4px;
    background-color: ${transparentize(0.88, theme.colors.black[200])};
    padding-left: 16px;
    font-size: ${theme.fonts.sizes.xmedium};
    font-weight: 600;
    color: ${errorMessage ? theme.colors.red[100] : theme.colors.black[200]};
    ::placeholder {
      color: ${theme.colors.grey[100]};
    }
  `}
`

const Input = ({ errorMessage, ...rest }: InputProps) => {
  return (
    <Wrapper>
      <InputWrapper errorMessage={errorMessage} {...rest} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  )
}

export default Input
